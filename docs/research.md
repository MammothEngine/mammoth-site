# Source and design research

Reviewed 19 October 2026. Product snapshot: [6b186803](https://github.com/MammothEngine/mammoth/tree/6b186803b0a17b4ef03914dc6cbd3602d6ede66c).

## Authoritative product evidence

| Topic | Evidence and site decision |
| --- | --- |
| Purpose | README, docs/ARCHITECTURE.md, pkg/engine and pkg/wire: Go document engine, MongoDB-compatible protocol, LSM storage. |
| Entry points | cmd/mammoth/server_cmd.go and embed/mammoth.go: standalone server and embedded API. |
| CLI | main.go requires `serve`; server_cmd.go defines `--bind`, `--port`, `--data-dir`, `--auth`, `--config`, management ports and TLS flags. Do not repeat the README's subcommand-free command. |
| Config | pkg/config/config.go and config.example.toml define nested server/engine tables and MAMMOTH environment overrides. CLI defaults are applied after file load; docs instruct explicit critical flags. |
| License | LICENSE is Apache-2.0. README's MIT statement is inconsistent and is not used. |
| Version | Published v0.1.0-beta and v0.0.1 are both prereleases. VERSION and main.go remain 0.0.1. Site names the beta and makes this mismatch explicit. |
| Distribution | Release assets exist for Linux/macOS amd64+arm64 and Windows amd64. No unverified public Docker image command is recommended. |
| Operations | Server wiring uses wire 27017, health 8080, admin 8081, metrics 9100 by default. Do not conflate the health and admin listeners. |
| Scope | Transactions, change streams, replication, sharding and indexing are documented and have packages. Site describes the source surface and requires workload validation, rather than certifying deployments. |
| Roadmap | Full aggregation operator coverage, optimizer improvements and a Kubernetes operator are listed as future work. |
| Performance | README lacks sufficient hardware/measurement context for its headline figures. No numeric speed or efficiency claims are reproduced. |
| Requirements | go.mod requires Go 1.23. Writable persistent storage is needed. No unsupported minimum RAM/CPU numbers are invented. |
| Contribution | Link to actual source/issues. Do not link to the README's missing CONTRIBUTING.md. |

## Existing site and animation diagnosis

The requested local directory was empty and the specified website repository did not exist. The product repository contains an older Vite site. That older site was inspected as source evidence; no existing mouse animation from a live Mammoth page could be reproduced.

Its `website/src/pages/landing.tsx` places hero decorations inside a section with `overflow-hidden`; the performance section also has `overflow-hidden` and its own opaque gradient. The overall site wrapper uses an opaque background and content uses separate z-index levels. A section-owned decorative plane cannot escape these clipping and paint boundaries. Its existing brand presentation uses a database icon. The unrelated bolt-like favicon is not consistent with that header mark.

The new site resolves that structural failure mode with two document-owned fixed canvas layers, a common coordinate space and window-level pointer listeners. Active effects have no section masks, blend-mode dependencies, filter wrappers or clipping ancestors. Low-alpha overlay pixels remain visible on cards and text. The browser suite samples rendered canvas alpha over text/cards and on the other side of a section boundary, tests scroll coordinates, and instruments the real scene's RAF and listener lifecycle.

## Design references

- CobaltDB: inspected the live content and local source for the three-option theme menu, wide containers, typographic hierarchy, SVG diagrams, source-grounded content and Oxog footer. Original Oxog SVG path geometry and pink/purple colors retained.
- UWAS and GuardianWAF: live content inspected for product-first hierarchy, distinct section compositions, code walkthroughs and operational detail.
- DockRouter, NothingDNS, Anubis, CacheStorm and OpenLoadBalancer: web retrieval was attempted but unavailable through the web tool. Their local sibling checkouts are available as design context; none of their product claims or identities are copied into Mammoth.

The user subsequently supplied an authoritative standalone Mammoth logo (`1586067_Image0.jpeg`) and a product infographic (`1599525_Image0.jpeg`). The standalone navy mammoth and cream/gold gear take precedence over the older site's generic database icon and blue palette. A transparent SVG trace preserves the faceted silhouette; the original JPEG is retained as a downloadable source. The infographic is a visual reference, not an instruction to copy its unverified performance, license or compatibility claims.

The SVG was traced from the original JPEG with VTracer 0.6.4, color/stacked/polygon mode, filter_speckle=4, color_precision=6, gradient_step=4 and path_precision=1. Only the outer white background rectangle was removed; the viewBox trims empty margins to `350 95 710 575`. The original download is byte-identical to the supplied file (SHA-256 `396cac337e63ce11dc4624b5a8168b26982e3028a1b6c2f4fe57e5444996af20`). The trace contains vector paths, without an embedded raster image or runtime vectorizer dependency.

Mammoth uses an independently composed editorial layout, locally served Space Grotesk and Manrope, warm cream and deep navy surfaces, navy/gold storage artwork, fine rules and mint status accents. Main container reaches 1720 px at large widths; paragraphs retain separate readable measures.

## Verification boundaries

The website tests validate website behavior. They do not run or certify the Mammoth database, its driver compatibility, distributed behavior, durability, backup recovery or throughput. Go was not installed in the workstation during source research. Published engine commands were cross-checked with source, not executed as a database integration test.
