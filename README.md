# Mammoth Engine website

The English product site and field guide for [Mammoth Engine](https://github.com/MammothEngine/mammoth).

- Website repository: https://github.com/MammothEngine/mammoth-site
- Production domain: https://mammothengine.com
- Hosting: GitHub Pages, deployed by `.github/workflows/pages.yml`.

## Develop

Use Node **26.12.0** (see `.node-version`) and npm **12.2.0**. Dependency versions were checked against the official npm registry on 19 October 2026. All direct dependencies are pinned; `package-lock.json` is tracked.

```sh
npm install --global npm@12.2.0
npm ci
npm run dev
```

Next.js 16.4.2, React 19.3.1 and TypeScript 7.0.2. The site uses App Router and static export; no application server or database is needed in production. Fonts are bundled locally from Fontsource, without runtime font service requests.

## Verify and export

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
npm run preview
```

The static preview is served at http://127.0.0.1:4173. `npm test` starts it automatically when needed. `out/` contains the complete deployable site, including CNAME, `.nojekyll`, a custom 404, robots and sitemap. Docs use directory routes (`/docs/architecture/index.html`) so direct access and refresh work on Pages.

Playwright covers motion lifecycle and cleanup, listener/RAF counts, canvas pixels over content and section boundaries, click-wave expiry, scroll coordinates, reduced motion, storage failures, cross-tab preferences, theme/keyboard/mobile controls, clipboard and selectable code, route refreshes, assets, metadata, links and both themes at 375, 768, 1024, 1440, 1920, 2560 and 3840 px. Axe checks the homepage and theme menu in both themes. Screenshots are written to the ignored `.preview/` directory.

## The shared visual layers

The two canvas elements are direct children of `body`. Both are `position: fixed; inset: 0; pointer-events: none`, inert and hidden from assistive technology.

- Ambient scene: z-index 0, behind the main content and footer at z-index 1.
- Interactive scene: z-index 20, above content surfaces at controlled alpha.
- Header and menus: z-index 50.

No section owns an effect canvas, mask or clipping box. A `window` pointer listener uses `clientX/clientY`, matching the fixed canvas coordinate space even during scrolling. Smooth radial falloff, damped spring forces, finite trails and finite click waves avoid rectangular cutoffs. Pointer events remain passive; links, selection and touch scrolling work normally. Touch devices use fewer particles, a lower DPR and 30 fps, with tap effects rather than finger trails.

The mouse control next to the theme picker stores `mammoth-motion` (`on`/`off`) in localStorage. Its Turkish accessible labels match the requested “Animasyonları aç/kapat”. On first use, reduced-motion preference decides the default. An explicit preference takes precedence for canvas interactions; OS reduced motion always suppresses the additional SVG/CSS decoration. Storage failures fall back to session memory. Tabs synchronize using the storage event.

Disabling motion clears both canvases and drops the scene's RAF, pointer, blur, resize, visibility and theme observers/listeners. Preference subscribers remain so the control can respond to user and OS changes. Hidden tabs cancel the scene loop and pointer listeners; resuming reinitializes its time base. IntersectionObserver gates hero, architecture and Oxog animation; offscreen decorative SVGs have no animation. Motion changes do not alter the interactive tabs, navigation, disclosure controls or copy feedback.

## Content and identity

Guides link to the inspected upstream snapshot (`6b186803b0a17b4ef03914dc6cbd3602d6ede66c`). See [the research notes](docs/research.md) for evidence and conflicting upstream claims. This site does not claim stable production readiness or reproduce benchmarks without measurement context. Database examples are illustrative, not executed in the visitor’s browser.

The supplied Mammoth artwork is the authoritative brand reference: a faceted navy mammoth and a cream/gold tusk forming a gear. `public/mammoth-mark.svg` is a transparent vector trace; `public/mammoth-original.jpeg` preserves the original user-supplied image. The mark stays navy and cream in both themes, with a cream backing on dark surfaces. Light/dark wordmarks, favicon, Apple icon and PNG/SVG social cards are in `public/`. To regenerate raster exports from the editable vector source, run `node scripts/assets.mjs` (Sharp is supplied by Next.js). Brand colors are centralized in globals.css: navy #1C2241, cream #FAF6EE and gold #E8D2A9. The Oxog geometry and color/motion references come from the existing CobaltDB site.

## Publish

Push to `main` to trigger the workflow. It runs lint, typecheck, export and browser tests before uploading `out/` and deploying Pages. Actions are pinned to the commit of the latest stable release inspected during implementation. In GitHub repository Settings → Pages, select GitHub Actions and set the custom domain to `mammothengine.com`. Enable HTTPS after certificate provisioning.

The apex A records should point to GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`). Preserve unrelated DNS records. No DNS credentials or secrets are required by this site or committed here.
