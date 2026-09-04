# justind.kim

Personal portfolio site for Justin D. Kim, themed as a retro game (title screen,
character sheet, tech tree, dialogue box). Static site on GitHub Pages, custom
domain via `CNAME`.

## Stack

- Three hand-written files, no build step, no framework, no package.json:
  - `index.html`: all content lives here
  - `index.css`: one stylesheet in one pass. Tokens, shared pieces, then each
    component once in page order, and a single reduced-motion block at the end
  - `game.js`: one IIFE. Starfield canvas, GSAP scroll animations, title menu,
    dialogue engine, SVG tech tree, attribute bars
- CDN dependencies: GSAP + ScrollTrigger (cdnjs) and Google Fonts
  (Newsreader for headings, Nunito for body, VT323 for all game UI)
- Icons: Phosphor SVGs inlined as a `<symbol>` sprite at the top of `<body>`,
  referenced with `<svg class="icon"><use href="#i-..."/></svg>`. No icon fonts.

## Conventions

- Keep it three files. No bundlers, transpilers, or npm.
- All animation respects `prefers-reduced-motion` (the `REDUCED` const in game.js).
- Everything GSAP-dependent is gated on `HAS_GSAP` so the site works if the CDN fails.
- `.card` is the shared bracket card (hero menu items, journey cards, project
  cards, restart button). Its brackets close to `--accent`, falling back to `--bright`.
- Color tokens: `--text` is body text, `--bright` is pure white for highlights,
  hairlines are `--line` / `--line-strong`. Accents are
  `--blue/--purple/--green/--pink/--yellow`; components take an `--accent`
  override rather than introducing new colors.
- Journey cards: the `.tl-org` text is the dialogue speaker and `data-line` is
  what they say.
- The skills `<ul class="tree-fallback">` in index.html is the no-JS/crawler
  fallback for the SVG tech tree. Keep it in sync with the `NODES` array in game.js.
- Character level is computed from birthday 11/28/1996 at runtime. Don't hardcode an age.
- Fonts load from the single Google Fonts `<link>` in index.html. No CSS `@import`s.
- Site copy avoids em dashes. Use a period, comma, or colon instead.

## Deploy

Push to `main` and GitHub Pages publishes. Nothing else to run. To preview
locally, open index.html or serve the directory with any static server.
