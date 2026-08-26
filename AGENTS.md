# justind.kim

Personal portfolio site for Justin D. Kim, themed as a retro game (title screen,
character sheet, tech tree, dialogue box). Static site on GitHub Pages, custom
domain via `CNAME`.

## Stack

- Three hand-written files, no build step, no framework, no package.json:
  - `index.html` — all content lives here
  - `index.css` — one stylesheet; design tokens are CSS variables in `:root`
  - `game.js` — one IIFE: starfield canvas, GSAP scroll animations, title menu,
    dialogue engine, SVG tech tree, attribute bars
- CDN dependencies: GSAP + ScrollTrigger (cdnjs),
  Google Fonts (Press Start 2P, VT323, Newsreader, Nunito)
- Icons: Phosphor SVGs inlined as a `<symbol>` sprite at the top of `<body>`,
  referenced with `<svg class="icon"><use href="#i-..."/></svg>` — no icon fonts

## Conventions

- Keep it three files. No bundlers, transpilers, or npm.
- All animation respects `prefers-reduced-motion` (the `REDUCED` const in game.js).
- Everything GSAP-dependent is gated on `HAS_GSAP` so the site works if the CDN fails.
- The skills `<ul class="tree-fallback">` in index.html is the no-JS/crawler
  fallback for the SVG tech tree — keep it in sync with the `NODES` array in game.js.
- Accent colors come from `--blue/--purple/--green/--pink/--yellow/--orange`
  variables; components take `--accent`/`--glow` overrides rather than new colors.
- Character level is computed from birthday 11/28/1996 at runtime — don't hardcode an age.
- Fonts load from the single Google Fonts `<link>` in index.html — no CSS `@import`s.

## Deploy

Push to `main` → GitHub Pages publishes. Nothing else to run. To preview
locally, open index.html or serve the directory with any static server.
