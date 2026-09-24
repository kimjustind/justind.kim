# justind.kim

Personal portfolio site for Justin D. Kim. Styled like a refined indie game
(think Hollow Knight or Celeste menus): a dusk title screen built from layered
paper silhouettes, a menu, chapters, and a Hollow Knight style text box. Static
site on GitHub Pages, custom domain via `CNAME`.

## Stack

- Three hand-written files, no build step, no framework, no package.json:
  - `index.html`: all content lives here, including the inline SVG paper layers
  - `index.css`: one stylesheet in one pass. Tokens, shared pieces, then each
    component once in page order, keyframes, and a single reduced-motion block at the end
  - `game.js`: one IIFE. Mote canvas, GSAP scroll reveals and paper parallax,
    title menu, sticky header, journey rail, dialogue engine
- CDN dependencies: GSAP + ScrollTrigger (cdnjs) and Google Fonts
  (Cinzel for names/labels/nav, Cormorant Garamond for titles and dialogue, Manrope for body)
- Icons: Phosphor SVGs inlined as a `<symbol>` sprite at the top of `<body>`,
  referenced with `<svg class="icon"><use href="#i-..."/></svg>`. No icon fonts.
  The same sprite holds the ornaments `#o-fleur` (filigree rule) and `#o-diamond`.

## Conventions

- Keep it three files. No bundlers, transpilers, or npm.
- All animation respects `prefers-reduced-motion` (the `REDUCED` const in game.js).
- Everything GSAP-dependent is gated on `HAS_GSAP` so the site works if the CDN fails.
  The intro fade is pure CSS (`animation-fill-mode: backwards` so it never fights GSAP).
- `.paper` is the shared panel (journey, toolkit, pastime tiles, link cards): grain and
  shadow on `::after`, a second sheet on `::before` that fans out on hover. Takes `--accent`.
- Paper parallax: put `data-depth` on a layer inside a `[data-parallax]` container.
  `data-parallax="away"` (hero) sinks layers as you scroll off, `"settle"` (footer)
  raises them into place, no value drifts them through the viewport.
- Paper silhouettes are hand-placed inline SVG paths (`viewBox` 1440 wide,
  `preserveAspectRatio="xMidYMax slice"`). The frontmost layer matches the color
  of the section it hands off to so the seam disappears.
- Color tokens: `--text` is body text, `--bright` is pure white, `--muted`/`--dim` for
  secondary text, hairlines are `--line` / `--line-strong`. Paper layers step
  `--layer-1..5` from indigo to plum. Accents are `--ember/--rose/--lilac/--teal/--gold`;
  components take an `--accent` override rather than introducing new colors.
- Journey cards: the `.tl-org` text is the dialogue speaker and `data-line` is
  what they say.
- The Age fact is computed from birthday 11/28/1996 at runtime. Don't hardcode an age.
- Fonts load from the single Google Fonts `<link>` in index.html. No CSS `@import`s.
- Site copy avoids em dashes. Use a period, comma, or colon instead.

## Deploy

Push to `main` and GitHub Pages publishes. Nothing else to run. To preview
locally, open index.html or serve the directory with any static server.
