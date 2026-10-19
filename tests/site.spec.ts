import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

async function probe(page: Page) {
  await page.addInitScript(() => {
    const events = new Map<string, Set<EventListenerOrEventListenerObject>>();
    const add = window.addEventListener.bind(window),
      remove = window.removeEventListener.bind(window);
    window.addEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions,
    ) => {
      if (type.startsWith("pointer")) {
        if (!events.has(type)) events.set(type, new Set());
        events.get(type)?.add(listener);
      }
      add(type, listener, options);
    }) as typeof window.addEventListener;
    window.removeEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: EventListenerOptions,
    ) => {
      events.get(type)?.delete(listener);
      remove(type, listener, options);
    }) as typeof window.removeEventListener;
    const raf = window.requestAnimationFrame.bind(window),
      cancel = window.cancelAnimationFrame.bind(window);
    const pending = new Set<number>();
    window.requestAnimationFrame = (callback) => {
      const id = raf((time) => {
        pending.delete(id);
        callback(time);
      });
      pending.add(id);
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      pending.delete(id);
      cancel(id);
    };
    Object.assign(window, {
      motionProbe: {
        listeners: () => events.get("pointermove")?.size ?? 0,
        frames: () => pending.size,
      },
    });
  });
}
async function canvasAlpha(page: Page, x: number, y: number, radius = 8) {
  return page.locator(".scene-interaction").evaluate(
    (canvas, point) => {
      const c = canvas as HTMLCanvasElement,
        ratio = c.width / innerWidth;
      const context = c.getContext("2d");
      if (!context) throw new Error("Canvas 2D context is unavailable");
      const data = context.getImageData(
        Math.max(0, Math.floor((point.x - point.radius) * ratio)),
        Math.max(0, Math.floor((point.y - point.radius) * ratio)),
        Math.ceil(point.radius * 2 * ratio),
        Math.ceil(point.radius * 2 * ratio),
      ).data;
      let sum = 0;
      for (let i = 3; i < data.length; i += 4) sum += data[i];
      return sum;
    },
    { x, y, radius },
  );
}
async function start(page: Page) {
  await page.goto("/");
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "running",
  );
}

test("hero tells the document story in order and cancels its animations when disabled or offscreen", async ({
  page,
}) => {
  await start(page);
  const hero = page.locator(".engine-art");
  await expect(hero).toHaveAttribute("data-visible", "true");
  await expect
    .poll(() => hero.evaluate((e) => e.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0);
  const stageAt = (time: number) =>
    hero.evaluate((element, at) => {
      for (const animation of element.getAnimations({ subtree: true })) {
        animation.pause();
        animation.currentTime = at;
      }
      const opacity = (selector: string) =>
        Number(
          getComputedStyle(element.querySelector(selector) as Element).opacity,
        );
      return {
        input: opacity(".hero-packet-request"),
        core: opacity(".hero-core-glow"),
        wal: opacity(".hero-store-wal"),
        disk: opacity(".hero-store-disk"),
        response: opacity(".hero-response-highlight"),
      };
    }, time);
  const input = await stageAt(800);
  expect(input.input).toBeGreaterThan(0.8);
  expect(input.core).toBe(0);
  expect(input.response).toBe(0);
  const processing = await stageAt(2200);
  expect(processing.input).toBe(0);
  expect(processing.core).toBeGreaterThan(0.1);
  expect(processing.wal).toBe(0);
  const log = await stageAt(4200);
  expect(log.wal).toBeGreaterThan(0.5);
  expect(log.disk).toBe(0);
  expect(log.response).toBe(0);
  expect((await stageAt(5200)).disk).toBeGreaterThan(0.4);
  expect((await stageAt(6200)).response).toBeGreaterThan(0.4);
  await page.getByRole("button", { name: "Animasyonları kapat" }).click();
  await expect
    .poll(() => hero.evaluate((e) => e.getAnimations({ subtree: true }).length))
    .toBe(0);
  expect(
    await page
      .locator(".hero-packet-request")
      .evaluate((e) => getComputedStyle(e).opacity),
  ).toBe("0");
  await expect(hero).toContainText("MAMMOTH ENGINE");
  await page.getByRole("button", { name: "Animasyonları aç" }).click();
  await expect
    .poll(() => hero.evaluate((e) => e.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0);
  await page.locator("#architecture").scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-visible", "false");
  await expect
    .poll(() => hero.evaluate((e) => e.getAnimations({ subtree: true }).length))
    .toBe(0);
  await hero.scrollIntoViewIfNeeded();
  await expect
    .poll(() => hero.evaluate((e) => e.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0);
});

test("motion preference clears effects, removes input listeners and cancels RAF; keyboard restarts it", async ({
  page,
}) => {
  await probe(page);
  await start(page);
  await page.mouse.move(350, 350);
  await page.mouse.click(350, 350);
  await expect.poll(() => canvasAlpha(page, 350, 350, 70)).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Animasyonları kapat" }).click();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "off",
  );
  expect(await canvasAlpha(page, 350, 350, 70)).toBe(0);
  const stats = () =>
    page.evaluate(() => {
      const p = (
        window as unknown as {
          motionProbe: { listeners: () => number; frames: () => number };
        }
      ).motionProbe;
      return { listeners: p.listeners(), frames: p.frames() };
    });
  await expect.poll(stats).toEqual({ listeners: 0, frames: 0 });
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Animasyonları aç" }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect.poll(stats).toEqual({ listeners: 0, frames: 0 });
  await page.getByRole("button", { name: "Animasyonları aç" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "running",
  );
  expect((await stats()).listeners).toBe(1);
  expect(
    await page.evaluate(() => localStorage.getItem("mammoth-motion")),
  ).toBe("on");
});

test("coordinates follow text, cards and section boundaries before and after scroll", async ({
  page,
}) => {
  await start(page);
  for (const selector of [
    "h1",
    ".feature-grid",
    "#architecture",
    ".lab-editor",
  ]) {
    const element = page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    const box = await element.boundingBox();
    if (!box) throw new Error(`Missing bounds for ${selector}`);
    const x = box.x + Math.min(box.width / 2, 200),
      y = Math.min(750, Math.max(140, box.y + 40));
    await page.mouse.move(x, y);
    await expect.poll(() => canvasAlpha(page, x, y)).toBeGreaterThan(100);
    const layers = await page
      .locator(".scene-interaction")
      .evaluate((canvas) => ({
        top: canvas.getBoundingClientRect().top,
        height: canvas.getBoundingClientRect().height,
        position: getComputedStyle(canvas).position,
        pointerEvents: getComputedStyle(canvas).pointerEvents,
        z: getComputedStyle(canvas).zIndex,
        parent: canvas.parentElement?.tagName,
      }));
    expect(layers).toMatchObject({
      top: 0,
      height: 1000,
      position: "fixed",
      pointerEvents: "none",
      z: "20",
      parent: "BODY",
    });
  }
  await page.evaluate(() => scrollBy(0, 250));
  await page.mouse.move(400, 380);
  await expect.poll(() => canvasAlpha(page, 400, 380)).toBeGreaterThan(100);
  // The same viewport location remains correct when scrolling without another mouse event.
  await page.evaluate(() => scrollBy(0, 200));
  await expect.poll(() => canvasAlpha(page, 400, 380)).toBeGreaterThan(100);
});

test("click waves cross a section boundary and expire", async ({ page }) => {
  await start(page);
  await page.evaluate(() => {
    const element = document.querySelector("#features");
    if (!element) throw new Error("Missing features section");
    const bottom = element.getBoundingClientRect().bottom;
    scrollTo({ top: scrollY + bottom - 450, behavior: "instant" });
  });
  const box = await page.locator("#features").boundingBox();
  if (!box) throw new Error("Missing features section bounds");
  const x = 600,
    y = box.y + box.height - 15;
  await page.mouse.click(x, y);
  // A wave reaches well outside the cursor glow and the originating box.
  await expect
    .poll(() => canvasAlpha(page, x, y + 285, 25), {
      timeout: 1800,
      intervals: [30, 30, 30],
    })
    .toBeGreaterThan(0);
  await page.mouse.move(1, 1);
  await expect.poll(() => canvasAlpha(page, x, y + 285, 25)).toBe(0);
});

test("hidden tabs suspend the scene and return without duplicate listeners", async ({
  page,
}) => {
  await probe(page);
  await start(page);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".scene-ambient")).toHaveAttribute(
    "data-state",
    "paused",
  );
  expect(
    await page
      .locator(".engine-art")
      .evaluate((e) => e.getAnimations({ subtree: true }).length),
  ).toBe(0);
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { motionProbe: { listeners: () => number } }
      ).motionProbe.listeners(),
    ),
  ).toBe(0);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".scene-ambient")).toHaveAttribute(
    "data-state",
    "running",
  );
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { motionProbe: { listeners: () => number } }
      ).motionProbe.listeners(),
    ),
  ).toBe(1);
});

test("reduced motion is the default until an explicit preference; system changes are observed", async ({
  page,
}) => {
  await probe(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Animasyonları aç" }),
  ).toHaveAttribute("aria-pressed", "false");
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { motionProbe: { listeners: () => number } }
      ).motionProbe.listeners(),
    ),
  ).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "running",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "off",
  );
  await page.getByRole("button", { name: "Animasyonları aç" }).click();
  await page.reload();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "running",
  );
  expect(
    await page
      .locator(".document-float")
      .first()
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".engine-art")
      .evaluate((e) => e.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test("storage failure preserves working controls within the session", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
  });
  await start(page);
  await page.getByRole("button", { name: "Animasyonları kapat" }).click();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "off",
  );
  await page.getByRole("button", { name: /Color theme/ }).click();
  await page.getByRole("radio", { name: "Dark", exact: true }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("theme selection is keyboard accessible, persistent and follows the system", async ({
  page,
}) => {
  await start(page);
  const trigger = page.getByRole("button", { name: /Color theme/ });
  await trigger.click();
  await page.getByRole("radio", { name: "Dark", exact: true }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await trigger.click();
  await page.getByRole("radio", { name: "System", exact: true }).check();
  await page.keyboard.press("Escape");
  await page.emulateMedia({ colorScheme: "light" });
  const light = await page
    .locator("body")
    .evaluate((e) => getComputedStyle(e).backgroundColor);
  await page.emulateMedia({ colorScheme: "dark" });
  expect(
    await page
      .locator("body")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).not.toBe(light);
});

test("functional tabs, navigation, selectable code and clipboard remain usable", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await start(page);
  const tab = page.getByRole("tab", { name: /Indexes/ });
  await tab.click();
  await expect(page.getByRole("tabpanel")).toContainText("expireAfterSeconds");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Aggregation/ })).toBeFocused();
  await page.getByRole("button", { name: "Copy pipeline.js" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "$group",
  );
  const selected = await page.locator(".lab-editor code").evaluate((e) => {
    const range = document.createRange();
    range.selectNodeContents(e);
    getSelection()?.removeAllRanges();
    getSelection()?.addRange(range);
    return getSelection()?.toString();
  });
  expect(selected).toContain("$group");
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Documentation" })
    .click();
  await expect(page).toHaveURL(/\/docs\/$/);
  await expect(page.locator("h1")).toHaveText("Your first document.");
  await page.getByRole("link", { name: "Mammoth home" }).first().click();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "running",
  );
  await expect(page.locator(".engine-art")).toHaveAttribute(
    "data-visible",
    "true",
  );
});

test("mobile taps allow scrolling, menus and the motion toggle", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await start(page);
  await expect
    .poll(() =>
      page
        .locator(".hero-packet-request")
        .evaluate((e) => e.getAnimations().length),
    )
    .toBe(1);
  expect(
    await page
      .locator(".hero-core-orbit")
      .evaluate((e) => e.getAnimations().length),
  ).toBe(0);
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Why Mammoth" })
    .tap();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await page.getByRole("button", { name: "Animasyonları kapat" }).tap();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "off",
  );
  await page.getByRole("button", { name: "Animasyonları aç" }).tap();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "running",
  );
  const bounds = await page
    .getByRole("button", { name: "Animasyonları kapat" })
    .boundingBox();
  if (!bounds) throw new Error("Missing motion button");
  expect(bounds.height).toBeGreaterThanOrEqual(44);
  await context.close();
});

for (const theme of ["light", "dark"])
  for (const width of [375, 768, 1024, 1440, 1920, 2560, 3840]) {
    test(`${theme} layout at ${width}px fits the viewport and renders without errors`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.addInitScript((t) => {
        localStorage.setItem("mammoth-theme", t);
        localStorage.setItem("mammoth-motion", "off");
      }, theme);
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const violations = await page.locator("main *").evaluateAll((elements) =>
        elements
          .filter((e) => {
            // Code intentionally scrolls inside its pre; it does not overflow the document.
            if (e.closest("pre")) return false;
            const rect = e.getBoundingClientRect();
            return (
              rect.width > 0 &&
              (rect.right > innerWidth + 1 || rect.left < -1) &&
              getComputedStyle(e).position !== "absolute"
            );
          })
          .map((e) => `${e.tagName}.${e.className}`),
      );
      expect(violations).toEqual([]);
      const box = await page.locator(".hero").boundingBox();
      if (!box) throw new Error("Missing hero section");
      if (width >= 1920) {
        expect(box.width).toBeGreaterThanOrEqual(1680);
        expect(box.width).toBeLessThanOrEqual(1750);
      }
      await page.screenshot({
        path: `.preview/home-${width}-${theme}.png`,
        fullPage: width === 1440 || width === 375,
      });
      expect(errors).toEqual([]);
    });
  }

for (const route of [
  "/docs/",
  "/docs/architecture/",
  "/docs/queries/",
  "/docs/embedded/",
  "/docs/capabilities/",
  "/docs/operations/",
  "/brand/",
]) {
  test(`static route ${route} supports direct access and refresh`, async ({
    page,
  }) => {
    for (const theme of ["light", "dark"]) {
      await page.addInitScript(
        (t) => localStorage.setItem("mammoth-theme", t),
        theme,
      );
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.reload();
      await expect(page.locator("h1")).toBeVisible();
      for (const width of [375, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    }
  });
}

test("static assets, metadata, links and the custom 404 are complete", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const links = await page
    .locator("a[href]")
    .evaluateAll((elements) =>
      elements
        .map((e) => e.getAttribute("href") ?? "")
        .filter((h) => h.startsWith("/")),
    );
  for (const href of new Set(links)) {
    const [path, hash] = href.split("#");
    expect((await request.get(path || "/")).status(), href).toBe(200);
    if (hash) expect(await page.locator(`#${hash}`).count()).toBe(1);
  }
  for (const path of [
    "/favicon.svg",
    "/mammoth-logo.svg",
    "/mammoth-logo-dark.svg",
    "/mammoth-mark.svg",
    "/mammoth-original.jpeg",
    "/og.png",
    "/social.png",
    "/apple-touch-icon.png",
    "/sitemap.xml",
    "/robots.txt",
    "/CNAME",
    "/.nojekyll",
  ])
    expect((await request.get(path)).status(), path).toBe(200);
  await expect((await request.get("/CNAME")).text()).resolves.toBe(
    "mammothengine.com\n",
  );
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(
    "https://mammothengine.com/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://mammothengine.com/og.png",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://mammothengine.com/og.png",
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(
    page.locator('meta[property="og:image:height"]'),
  ).toHaveAttribute("content", "630");
  expect((await page.goto("/there-is-no-such-page/"))?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Off the trail.");
});

for (const theme of ["light", "dark"]) {
  test(`accessible homepage and theme menu in ${theme} mode`, async ({
    page,
  }) => {
    await page.addInitScript((t) => {
      localStorage.setItem("mammoth-theme", t);
      localStorage.setItem("mammoth-motion", "off");
    }, theme);
    await page.goto("/");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page.getByRole("button", { name: /Color theme/ }).click();
    const menu = await new AxeBuilder({ page })
      .include(".site-header")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(menu.violations).toEqual([]);
  });
}

test("motion preference synchronizes across tabs without leaking listeners", async ({
  page,
  context,
}) => {
  await probe(page);
  await start(page);
  const other = await context.newPage();
  await start(other);
  await other.getByRole("button", { name: "Animasyonları kapat" }).click();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "off",
  );
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { motionProbe: { listeners: () => number } }
      ).motionProbe.listeners(),
    ),
  ).toBe(0);
  await other.getByRole("button", { name: "Animasyonları aç" }).click();
  await expect(page.locator(".scene-interaction")).toHaveAttribute(
    "data-state",
    "running",
  );
  await other.close();
});
