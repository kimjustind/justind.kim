---
name: site-style
description: Style guide for justind.kim, the moonlit papercraft portfolio. Use before any change to index.html, index.css, or game.js, including new sections, components, copy edits, colors, fonts, icons, paper silhouettes, animation, or the dialogue box, and when reviewing such a change. Covers the visual language, tokens, typography, motion rules, the copy voice, code conventions, and the mistakes this site has already made once.
---

# justind.kim style guide

The site is a portfolio dressed as the menu of a refined indie game (Hollow Knight,
Celeste): a moonlit title screen made of layered paper silhouettes, a menu, chapters,
and a Hollow Knight style text box. It should feel **handmade, quiet, and cool**.
Every rule below exists to protect that feeling.

Read `AGENTS.md` too. This skill expands on it; where they differ, `AGENTS.md` wins.
For copy-paste recipes (new section, card, tile, silhouette, divider), see
[references/recipes.md](references/recipes.md).

## 1. The idea in one paragraph

Night sky, paper cut-outs, one cool blue light. Things are made of **sheets of paper**
stacked at different depths: the hero mountains, the torn divider, the footer ground,
the photo stack, every panel. Distance is shown by color (farther is lighter and bluer)
and by parallax (farther moves more). Ornament is rare and meaningful: the filigree only
frames the title and the text box. Motion is reserved for moments that mean something.
Everything else simply sits there, well set.

## 2. Design principles

1. **Less chrome.** No tracked-out caps kickers, section numerals, status badges,
   corner brackets, tag pills, or middle-dot strings. If a label needs to exist, make it
   serif italic (see `.tl-badge`) or plain text.
2. **One accent.** Blue (`--blue`) is the only color that stands out. `--ice` is a paler
   blue used once, for the current journey entry. No second hue, ever.
3. **Not everything is a card.** Cards (`.paper`) are for things that are objects: jobs,
   pastimes, links. Lists of facts are typography (see the Toolkit `<dl>`).
4. **Only things you can act on lift.** Hover lifts and fanning sheets go on links and
   journey cards. Static tiles stay still.
5. **Motion with intent.** The title screen animates. The journey and pastimes sequences
   reveal. Nothing else fades in on scroll.
6. **It must work without the extras.** No GSAP, no JS, reduced motion: the page is still
   complete and readable.
7. **Three files.** `index.html`, `index.css`, `game.js`. No build, no npm, no new files
   for the site (the favicon is a data URI for this reason).

## 3. Color

All colors are tokens on `:root` in `index.css`. Never introduce a raw hex in a
component; derive it with `color-mix()` from a token if you need a step between.

| Token | Value | Use |
| --- | --- | --- |
| `--void` | `#05070b` | Deepest black: hero sky top, footer front layer, text on blue |
| `--bg` | `#0a0e15` | Page background, hero front layer (hands off to About) |
| `--layer-1` | `#0f141d` | Nearest paper: chapter background after the divider |
| `--layer-2` | `#151c28` | Second sheet base, portrait placeholder |
| `--layer-3` | `#1d2738` | Middle distance |
| `--layer-4` | `#263349` | Far |
| `--layer-5` | `#34465f` | Farthest, lightest paper |
| `--paper` | `#111723` | Panel fill |
| `--text` | `#e6ebf2` | Body text |
| `--bright` | `#fff` | Titles, headings, the lede, dialogue text |
| `--muted` | `#98a3b5` | Paragraphs in cards, nav at rest, secondary copy |
| `--dim` | `#5b6779` | Quietest: default ornament color |
| `--blue` | `#8fb3e6` | The accent: focus rings, active states, icons, progress |
| `--ice` | `#d6e2f2` | Pale accent: first journey item, dialogue ornament, moonlight |
| `--line` | text at 12% | Hairline dividers |
| `--line-strong` | text at 26% | Journey rail |

Rules:

- **Black, white, blue only.** No warm hues anywhere: no orange, plum, gold, or rainbow
  sets of accents. The site was once a dusk sunset with five accents and it read as
  generated. Do not go back.
- **Gradients stay low-contrast and cool.** The sky runs `--void` to navy `#22324a`, with a
  faint `rgba(170, 195, 230, .14 to .18)` horizon glow. Never a bright sweep.
- **Depth ladder.** Farther paper is lighter: `--layer-5` at the back, down to `--bg` or
  `--void` at the front.
- **Seams disappear.** The frontmost layer of any paper scene is filled with the
  background color of whatever comes next (hero `.l5` is `--bg` for About, divider `.d3`
  is `--layer-1` for Toolkit, footer `.f4` is `--void`).
- **Components take `--accent`.** `.tl-item`, `.tile`, and `.link-card` set
  `--accent: var(--blue)`; children read `var(--accent)`. To vary a component, override
  `--accent` with an existing token. Do not add a new color.
- **Glows are blue and soft.** `box-shadow: 0 0 8px to 16px` of `--blue`, or a
  `rgba(143, 179, 230, .5)` text-shadow. Moon and motes use the ice and blue rgba values
  already in the file.
- Selection is blue on void. Focus is a 1px blue outline offset 4px (6px on `.paper`).

## 4. Typography

Three families, loaded from the single Google Fonts `<link>` in `index.html`
(no `@import`). Each has a job; don't swap them.

| Token | Family | Job |
| --- | --- | --- |
| `--display` | Cinzel 400/500/600 | Names, menu, nav, small engraved labels. Always uppercase and tracked |
| `--serif` | Cormorant Garamond 400/500/600, italic 400/500 | Section titles, card headings, the lede, toolkit lines, dialogue, the "fin" |
| `--sans` | Manrope 400 to 700 | Body copy, small metadata |

Where each is allowed:

- **Cinzel** appears in exactly these places: `.ts-title`, `.hd-mark`, `.hd-nav a`,
  `.menu-item`, `.dlg-name`, `.to-title`. Letter-spacing 0.08em (the big title) to
  0.2 to 0.3em (labels). Do not add Cinzel kickers or eyebrows above headings.
- When a centered label is tracked, pull back the trailing gap:
  `.menu-item span { margin-right: -0.3em; }`.
- **Cormorant** weights: 500 for big titles and the lede, 600 for card `h3`s and `dt`s.
  Italic is for soft labels (`.tl-badge` "Current") and the closing line.
- **Manrope** body is `1rem / 1.7`. Inside cards drop to `0.85rem` to `0.93rem` in
  `--muted`. Metadata like `.tl-org` and `.lc-go` is `0.82rem` to `0.85rem`, weight 600,
  in `var(--accent)`.

Scale in use (match it, don't invent new steps):

| Element | Size |
| --- | --- |
| Hero title | `clamp(2.6rem, 9vw, 6.2rem)` |
| Section title | `clamp(2.6rem, 7vw, 4.5rem)`, line-height 1, -0.01em |
| Lede | `clamp(1.8rem, 4vw, 2.5rem)`, line-height 1.15 |
| Dialogue text | `clamp(1.3rem, 3vw, 1.6rem)`, line-height 1.4 |
| Card `h3` | 1.5rem to 1.7rem, line-height 1.1 to 1.15 |
| Toolkit tools | 1.35rem serif |
| Body | 1rem |
| Card body | 0.9rem to 0.93rem |
| Nav and labels | 0.62rem to 0.78rem Cinzel |

Long copy is capped at `65ch`; the About column at `600px`.

## 5. Layout and spacing

- Sections are `<section id="...">` with a `.section-inner` (max-width 1040px,
  padding `clamp(5rem, 10vw, 8rem) clamp(1rem, 4vw, 2rem)`) and a centered
  `.section-head` holding one `.section-title`. That is the whole section chrome.
- Content columns narrow inside it: journey 760px, toolkit 820px, about 260px + 1fr.
- Spacing uses `clamp()` for anything that should breathe with the viewport, plain rem
  inside components. Card padding is 1.6rem to 1.9rem; grid gaps 1.5rem.
- Breakpoints are per component, written right after the rule they change, at the
  width that component breaks (520, 560, 600, 640, 780, 860px are in use). There is no
  global breakpoint system.
- Phones matter: the header drops the "JK" mark and the nav takes the full bar under
  560px, the moon moves under 600px, grids collapse to one column. No horizontal scroll.
- Use `100svh` after a `100vh` fallback for full-height screens.
- Radius is small and papery: 3px on panels, 2px on the outline button. Nothing pill
  shaped except the feathered dialogue pane.

## 6. Paper: the core material

**Panels.** `.paper` is the only panel. The fill and grain live on `::after`, a second
sheet tinted by `--accent` peeks out from `::before` (offset 4px 5px, rotated 0.7deg).
On hover (links and `.tl-content` only) the panel lifts 4px and the back sheet fans to
9px 11px, 1.8deg. Do not add borders, gradients, or glows to panels; the stack is the
decoration.

**Grain.** `var(--grain)` is an inline SVG fractal noise tile at `background-size: 180px`.
Put it on paper surfaces and as an `overlay` blend over whole scenes (opacity 0.45 to 0.5).

**Shadow.** `var(--lift)`: an inset 1px highlight, a tight contact shadow, and a soft
falloff. It's one sheet resting on another. Silhouettes instead use `filter: drop-shadow`
upward (`0 -10px 14px`) plus a 1px lit edge, because each sheet shadows the one behind it.

**Silhouettes.** Landscapes are hand-placed inline SVG paths in a 1440-wide `viewBox`
with `preserveAspectRatio="xMidYMax slice"` (the torn divider uses `none` so it
stretches). Ridgelines are smooth curves through uneven summits and saddles, not even
zigzags or symmetric waves. Layer classes set `fill` from the depth ladder.

**Physical touches.** Things are slightly rotated, as if placed by hand: the portrait
-2deg in an 8px white border over two colored sheets at 7deg and -9deg; pastime icons are
cut-outs at -6deg with a darker offset copy underneath. Keep rotations small (under 10deg)
and use the individual `rotate`/`translate` properties.

## 7. Icons and ornaments

- Icons are **Phosphor**, inlined as `<symbol>`s in the sprite at the top of `<body>`
  (`viewBox="0 0 256 256"`), used as `<svg class="icon"><use href="#i-name"/></svg>`.
  No icon fonts, no external SVG files, no other icon sets.
- Use Phosphor **fill** weight for solid glyphs and **duotone** (the `-duo` suffix:
  a 0.2 opacity back path plus the line path) for link brands.
- Custom glyphs must match Phosphor's grid: 256 units, 16-unit rounding, cut-outs via
  `fill-rule="evenodd"` (see `#i-clawd`).
- `.icon` is `1em` square and `currentColor`, so size it with `font-size` or width.
- Ornaments: `#o-fleur` (the filigree rule) and `#o-diamond`. The fleur appears only
  under the hero title and above and below the dialogue text. The diamond is the site's
  bullet: menu selection markers, the nav current marker (a CSS rotated square), the
  journey rail nodes. Do not add fleurs under section titles.
- Every decorative SVG gets `aria-hidden="true"`.

## 8. Motion

Global feel: things **surface**, they don't bounce. Ease is `var(--ease)`
(`cubic-bezier(.2, .7, .2, 1)`) in CSS and `power3.out` in GSAP. Hover color changes
0.2 to 0.25s; transforms 0.3 to 0.4s; reveals 0.8s.

**Where motion lives:**

- *Title screen intro* (pure CSS, `animation-fill-mode: backwards`): sky fades in,
  paper layers `rise` in staggered 0.1s apart, the title `unblur`s from wide tracking,
  the fleur fades, menu items `rise-soft` 80ms apart starting at 1.15s.
- *Hero scroll-away*: layers sink by depth (`data-parallax="away"`), title fades out by
  60% of the hero.
- *Footer settle*: layers rise into place as the page bottoms out.
- *Journey*: cards slide in from x -30; rail diamonds light as their card crosses the
  middle and stay lit; hovering one card dims the others to 0.4.
- *Pastimes*: tiles reveal as one `ScrollTrigger.batch` in reading order.
- *Idle loops*: motes drifting up, the selected menu diamond and the finished dialogue's
  lower fleur pulse opacity (`orn-pulse`). Nothing else loops.
- Everything else (About, Toolkit, Links) has **no** scroll reveal.

**Hard rules (each one fixed a real bug):**

- No CSS `scroll-behavior: smooth`. In-page `#` links glide through the click handler
  in game.js, which also updates the hash.
- Scrubbed tweens use `gsap.fromTo()` with explicit starts, never `.to()`.
- CSS keyframes animate `translate`/`opacity`/`filter`, while GSAP owns `transform`, so
  the two never fight. Keep it that way.
- `gsap.from` reveals must `clearProps` only what they set; a leftover inline transform
  kills the CSS hover lift.
- Everything GSAP touches is gated on `ANIMATE` (`HAS_GSAP && !REDUCED`).
- Every new animation, transition on transform, or hover movement gets a line in the
  single `prefers-reduced-motion` block at the end of `index.css`. JS checks `REDUCED`:
  the canvas draws one static frame, the dialogue appears fully lit.
- Canvas work caps DPR at 2 and stops its rAF loop when off screen.

## 9. Interaction patterns

- **Title menu**: hover, focus, or arrow keys move a single `is-active` selection with
  diamond markers. Arrow keys release once the hero scrolls away.
- **Header**: hidden until 60% of the hero is gone, then drops in with a blurred void
  background, a lit diamond under the current section, and a 1px blue progress line.
- **Dialogue box** (`say(who, line)`): a feathered dark pane (no frame), Cinzel speaker
  name in blue, fleur, then the line surfaces character by character (blur to sharp,
  18ms apart, words kept whole). Click or Enter finishes; click again, click outside, or
  Escape closes; it closes itself after 8s. The full line is in an `.sr-only` span and
  the box is `role="status" aria-live="polite"`.
- Journey cards are the dialogue's triggers: `.tl-org` is the speaker, `data-line` is
  what they say. JS gives them `tabIndex=0` and `role="button"`.
- External links open in a new tab with `rel="noopener"`. Icon-only links get
  `aria-label`.

## 10. Voice and copy

The site speaks plainly, with one or two dry jokes. It is a person, not a brand.

- **No em dashes** in site copy. Use a period, comma, or colon.
- **About** is told by a dry narrator in third person, present tense, Stanley Parable
  style: "Justin opens Godot to work on a game of his own. And Justin opens Steam and
  plays someone else's game instead." One beat of what he meant to do versus what he did.
  No winking asides ("and yet here we are"), no filler adjectives.
- The lede: "Justin (he/him) is a N year old guy on the computer." The age is computed in
  game.js from 11/28/1996; the fallback text is "twenty-something". Never hardcode it.
- **Journey** card body: subjectless and factual ("Supports the servers, applications,
  and integrations used by the utilities department."). `data-line` is the employer
  speaking about Justin in first person plural ("Justin started out on our help desk...").
- **Toolkit, pastimes, links**: first person, one short sentence, concrete ("Mostly
  sourdough and cookies. Still figuring out croissants."). A game reference or joke is
  welcome in a tile, at most one per section.
- Organization names are written plainly: "City of Henderson, Utilities", not
  "City of Henderson · Utilities".
- Section and nav names are single words in title case (About, Journey, Toolkit,
  Pastimes, Links). Game framing is light: "Return to title", "Thanks for playing."
- No marketing voice: no "passionate", "innovative", "leveraging", taglines, or
  stylized subtitles.

## 11. Code conventions

**HTML**
- A short `<!-- comment -->` above each region saying what it is.
- Classes use a short per-component prefix: `hd-` header, `ts-` title screen, `mi-` menu
  item, `tl-` timeline, `kit-` toolkit, `t-` tile variant, `lc-` link card, `dlg-`
  dialogue, `f1..4`/`l1..5`/`d1..3` paper layers. State classes are `is-*` (`is-active`,
  `is-current`, `is-lit`, `is-done`) or `show`.
- Semantic elements first: `section`, `header`, `nav` with `aria-label`, `dl` for
  term/value lists, `figure` for the portrait.
- Images: explicit `width`/`height`, `loading="lazy"` below the fold, real `alt`.

**CSS**
- One pass, in order: tokens/reset/base, shared pieces, each component once in page
  order under a `/* ==== NAME ==== */` banner, keyframes, reduced motion. Add a new
  component where it appears on the page, not at the bottom.
- Short rules on one line; longer rules one property per line. Media queries sit
  directly after the rules they modify.
- Comments are lowercase and explain *why* or *what it looks like*, not what the
  property does ("the strip already separates the chapters, so the next one starts
  closer").
- Modern CSS is fine and preferred: `color-mix()`, `:is()`, `:has()`, `clamp()`,
  `inset`, `aspect-ratio`, individual transform properties, `mask-image` with the
  `-webkit-` prefix alongside.
- Hide-and-show uses `visibility` + `opacity` + `translate` with a delayed `visibility`
  transition so hidden things aren't focusable.

**JS**
- One `'use strict'` IIFE. Each feature is its own inner IIFE under a
  `/* ---------- name ---------- */` banner. Constants that gate behavior are
  `SCREAMING_CASE` at the top.
- Prefer `IntersectionObserver` over scroll listeners; when a scroll listener is needed,
  make it passive and rAF-throttled.
- Comments explain the reason, especially for anything that fixed a bug.
- No dependencies beyond GSAP + ScrollTrigger from cdnjs (pinned 3.12.5).

**Commits**
- Imperative, sentence-case subject that names the visible change ("Reveal the journey
  card, not the rail diamond"). Body explains why, with bullets for multi-part changes.
- If you change a convention, update `AGENTS.md` (and this skill) in the same commit.

## 12. Things this site has tried and dropped

Don't reintroduce these without being asked:

- Dusk sunset palette, orange/plum gradients, multiple accent colors.
- RPG UI: tech trees, attribute bars, stat counters, an age count-up.
- Growing corner brackets on cards, card treatment on the hero menu.
- Tracked caps kickers, section numerals, "Complete"/"Education" badges, link tags.
- Filigree under every section title.
- A card for every list (Toolkit was five cards; now it's a typographic list).
- Scroll reveals on every section.
- Stylized taglines and fancy dialogue lines; winking narrator asides.
- CSS smooth scrolling.

## 13. Before you finish a change

- [ ] Only tokens used; no new hues; any variation goes through `--accent`.
- [ ] Fonts used only in their allowed roles; no new Cinzel labels.
- [ ] New panels use `.paper`; only actionable ones lift.
- [ ] New paper scene: front layer matches the next section's background.
- [ ] Animation is justified, gated on `ANIMATE`/`REDUCED`, uses `fromTo` if scrubbed,
      and has a reduced-motion line in CSS.
- [ ] Works with JS off and with the GSAP CDN blocked.
- [ ] Phone width (375px) checked: no horizontal scroll, grids collapse, header fits.
- [ ] Keyboard: focus is visible, interactive non-links have `role` and `tabIndex`.
- [ ] Decorative SVGs `aria-hidden`; icon-only links labeled.
- [ ] Copy has no em dashes and matches the voice for its section.
- [ ] Still three files; `AGENTS.md` updated if a convention changed.
