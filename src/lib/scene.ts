/** A single viewport coordinate space shared by every section. No document offsets. */
type Point = { x: number; y: number; born: number };
type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
};
type Spark = Point & { vx: number; vy: number };

export function startScene(
  ambient: HTMLCanvasElement,
  interaction: HTMLCanvasElement,
) {
  const bg = ambient.getContext("2d");
  const fx = interaction.getContext("2d");
  if (!bg || !fx) return () => {};
  const a = bg;
  const f = fx;
  let width = 0,
    height = 0,
    frame = 0,
    previous = 0,
    time = 0;
  let color = "71, 76, 111";
  let particles: Particle[] = [];
  let trails: Point[] = [],
    ripples: Point[] = [],
    sparks: Spark[] = [];
  const pointer = { x: -1000, y: -1000, active: false, touch: false };
  const coarse = matchMedia("(pointer: coarse)").matches;
  const interval = coarse ? 1000 / 30 : 1000 / 60;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, coarse ? 1 : 1.5);
    for (const canvas of [ambient, interaction]) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    const count = Math.min(
      coarse ? 30 : 90,
      Math.round((width * height) / 16000),
    );
    particles = Array.from({ length: count }, (_, i) => {
      const x = ((i * 0.61803398875) % 1) * width;
      const y = ((i * 0.754877666) % 1) * height;
      return {
        x,
        y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        size: i % 5 === 0 ? 4 : 2,
      };
    });
    updateColor();
  }
  function updateColor() {
    color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--particle-rgb")
        .trim() || "71,76,111";
  }
  function clearEffects() {
    pointer.active = false;
    trails = [];
    ripples = [];
    sparks = [];
    f.clearRect(0, 0, width, height);
  }
  function move(event: PointerEvent) {
    if (event.pointerType === "touch") return; // Never intercept or trail a scrolling finger.
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    pointer.touch = false;
    const born = performance.now();
    const last = trails.at(-1);
    if (!last || Math.hypot(last.x - pointer.x, last.y - pointer.y) > 5) {
      trails.push({ x: pointer.x, y: pointer.y, born });
      if (trails.length > 28) trails.shift();
    }
  }
  function press(event: PointerEvent) {
    if (event.button !== 0) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    pointer.touch = event.pointerType === "touch";
    const born = performance.now();
    ripples.push({ x: pointer.x, y: pointer.y, born });
    if (ripples.length > 5) ripples.shift();
    const count = coarse ? 10 : 22;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      sparks.push({
        x: pointer.x,
        y: pointer.y,
        born,
        vx: Math.cos(angle) * (2 + (i % 4)),
        vy: Math.sin(angle) * (2 + (i % 4)),
      });
    }
    sparks = sparks.slice(-88);
    for (const p of particles) {
      const dx = p.x - pointer.x,
        dy = p.y - pointer.y,
        d = Math.hypot(dx, dy);
      if (d > 0 && d < 380) {
        const force = 24 * (1 - d / 380) ** 2;
        p.vx += (dx / d) * force;
        p.vy += (dy / d) * force;
      }
    }
  }
  function leave(event: PointerEvent) {
    if (event.relatedTarget === null) pointer.active = false;
  }
  function touchEnd(event: PointerEvent) {
    if (event.pointerType === "touch") pointer.active = false;
  }
  function draw(now: number) {
    frame = requestAnimationFrame(draw);
    if (previous && now - previous < interval - 1) return;
    const delta = Math.min((now - (previous || now - 16.67)) / 16.67, 2);
    previous = now;
    time += delta * 0.006;
    a.clearRect(0, 0, width, height);
    f.clearRect(0, 0, width, height);
    trails = trails.filter((p) => now - p.born < 650);
    ripples = ripples.filter((p) => now - p.born < 1100);
    sparks = sparks.filter((p) => now - p.born < 800);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = p.x - pointer.x,
        dy = p.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (pointer.active && distance > 1 && distance < 260) {
        const falloff = (1 - distance / 260) ** 2;
        // A repulsive core surrounded by a gentle tangential attraction.
        const force = distance < 85 ? 2.8 : -0.65;
        p.vx +=
          ((dx / distance) * force - (dy / distance) * 0.7) * falloff * delta;
        p.vy +=
          ((dy / distance) * force + (dx / distance) * 0.7) * falloff * delta;
      }
      p.vx += (p.homeX + Math.sin(time + i) * 15 - p.x) * 0.003 * delta;
      p.vy += (p.homeY + Math.cos(time * 0.7 + i) * 15 - p.y) * 0.003 * delta;
      p.vx *= 0.95 ** delta;
      p.vy *= 0.95 ** delta;
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      a.strokeStyle = `rgba(${color},0.28)`;
      a.lineWidth = 0.8;
      if (i % 4 === 0) {
        a.strokeRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
      } else {
        a.beginPath();
        a.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        a.stroke();
      }
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j],
          d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d > 145) continue;
        a.strokeStyle = `rgba(${color},${0.1 * (1 - d / 145)})`;
        a.beginPath();
        a.moveTo(p.x, p.y);
        a.lineTo(q.x, q.y);
        a.stroke();
      }
      if (pointer.active && distance < 260) {
        const alpha = (1 - distance / 260) * 0.55;
        f.strokeStyle = `rgba(${color},${alpha})`;
        f.lineWidth = 1;
        f.beginPath();
        f.arc(p.x, p.y, 3 + p.size, 0, Math.PI * 2);
        f.stroke();
        f.strokeStyle = `rgba(${color},${alpha * 0.3})`;
        f.beginPath();
        f.moveTo(pointer.x, pointer.y);
        f.lineTo(p.x, p.y);
        f.stroke();
      }
    }
    if (pointer.active && !pointer.touch) {
      const glow = f.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        235,
      );
      glow.addColorStop(0, `rgba(${color},0.115)`);
      glow.addColorStop(0.4, `rgba(${color},0.045)`);
      glow.addColorStop(1, `rgba(${color},0)`);
      f.fillStyle = glow;
      f.fillRect(pointer.x - 235, pointer.y - 235, 470, 470);
      f.strokeStyle = `rgba(${color},0.3)`;
      f.lineWidth = 1;
      f.beginPath();
      f.arc(pointer.x, pointer.y, 24 + Math.sin(time * 4) * 5, 0, Math.PI * 2);
      f.stroke();
    }
    for (let i = 1; i < trails.length; i++) {
      const p = trails[i],
        q = trails[i - 1],
        fade = 1 - (now - p.born) / 650;
      f.strokeStyle = `rgba(${color},${fade * 0.35})`;
      f.lineWidth = 2.5 * fade;
      f.beginPath();
      f.moveTo(q.x, q.y);
      f.lineTo(p.x, p.y);
      f.stroke();
    }
    for (const ripple of ripples) {
      const progress = (now - ripple.born) / 1100;
      const radius = 12 + (1 - (1 - progress) ** 2) * 350;
      for (let i = 0; i < 2; i++) {
        f.strokeStyle = `rgba(${color},${(1 - progress) ** 2 * (i ? 0.28 : 0.65)})`;
        f.lineWidth = (1 - progress) * 2;
        f.beginPath();
        f.arc(ripple.x, ripple.y, radius * (i ? 0.7 : 1), 0, Math.PI * 2);
        f.stroke();
      }
    }
    for (const spark of sparks) {
      spark.x += spark.vx * delta;
      spark.y += spark.vy * delta;
      spark.vx *= 0.96 ** delta;
      spark.vy *= 0.96 ** delta;
      const fade = 1 - (now - spark.born) / 800;
      f.fillStyle = `rgba(${color},${fade * 0.65})`;
      f.fillRect(spark.x, spark.y, fade * 3, fade * 3);
    }
  }
  function attach() {
    document.documentElement.dataset.sceneVisibility = "visible";
    resize();
    previous = 0;
    ambient.dataset.state = "running";
    interaction.dataset.state = "running";
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerup", touchEnd, { passive: true });
    window.addEventListener("pointercancel", clearEffects, { passive: true });
    window.addEventListener("blur", clearEffects);
    window.addEventListener("resize", resize, { passive: true });
    frame = requestAnimationFrame(draw);
  }
  function detach() {
    document.documentElement.dataset.sceneVisibility = "hidden";
    cancelAnimationFrame(frame);
    frame = 0;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerdown", press);
    window.removeEventListener("pointerout", leave);
    window.removeEventListener("pointerup", touchEnd);
    window.removeEventListener("pointercancel", clearEffects);
    window.removeEventListener("blur", clearEffects);
    window.removeEventListener("resize", resize);
    clearEffects();
    a.clearRect(0, 0, width, height);
    ambient.dataset.state = "paused";
    interaction.dataset.state = "paused";
  }
  function visibility() {
    if (document.hidden) detach();
    else attach();
  }
  const observer = new MutationObserver(updateColor);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const system = matchMedia("(prefers-color-scheme: dark)");
  system.addEventListener("change", updateColor);
  document.addEventListener("visibilitychange", visibility);
  if (!document.hidden) attach();
  return () => {
    detach();
    observer.disconnect();
    system.removeEventListener("change", updateColor);
    document.removeEventListener("visibilitychange", visibility);
    ambient.dataset.state = "off";
    interaction.dataset.state = "off";
  };
}
