# Recipes

Copy these shapes when adding to the site. Each follows the rules in `SKILL.md`.

## New section

HTML, placed in page order inside `<main>`:

```html
<!-- writing -->
<section id="writing">
  <div class="section-inner">
    <header class="section-head">
      <h2 class="section-title">Writing</h2>
    </header>

    <!-- content -->
  </div>
</section>
```

Then:

1. Add the link to `.hd-nav` (single word). The scroll spy in game.js picks it up from
   the `href`, so the section `id` must match. Check the nav still fits at 375px.
2. Add a `.menu-item` to the title menu only if it is a main destination; the menu holds
   four items and each has an `animation-delay` rule (`nth-child`, 80ms steps).
3. If it sits after the divider, it should share the `--layer-1` background: add its id
   to the `#toolkit, #pastimes, #links` rule.
4. Put its CSS under its own banner, between the components it sits between.

## Journey entry

```html
<div class="tl-item">
  <div class="tl-content paper" data-line="Justin did one concrete thing for us, said by the employer.">
    <h3>Job Title</h3>
    <div class="tl-org">Organization, Department</div>
    <p>Subjectless, factual summary of the role.</p>
  </div>
</div>
```

Newest first. Only the current role gets `<span class="tl-badge">Current</span>`
before the `h3` (it's the first child, so it also gets the `--ice` accent).

## Pastime tile

```html
<div class="tile paper">
  <svg class="cutout" aria-hidden="true"><use href="#i-name"/></svg>
  <h3>Name</h3>
  <p>One short first-person sentence.</p>
</div>
```

Add `t-wide` to span two columns. Keep the bento rows full at 4, 2, and 1 columns:
`t-gaming` takes 2x2, plain tiles 1x1, `t-wide` 2x1. Tiles don't lift on hover.

## Link card

```html
<a href="https://example.com" target="_blank" rel="noopener" class="link-card paper">
  <svg class="icon lc-icon" aria-hidden="true"><use href="#i-name-duo"/></svg>
  <h3>Name</h3>
  <p>What's there, in one sentence.</p>
  <span class="lc-go">example.com <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg></span>
</a>
```

## Adding an icon

1. Get the glyph from Phosphor (phosphoricons.com), fill weight, or duotone for brands.
2. Copy its paths into a `<symbol id="i-name" viewBox="0 0 256 256">` in the sprite.
   Duotone: the background path gets `opacity="0.2"`, no fill attributes otherwise.
3. Use it with `<use href="#i-name"/>` and `aria-hidden="true"`.

## Paper silhouette scene

```html
<div class="scene" aria-hidden="true">
  <svg class="layer x1" data-depth="0.5" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice"><path d="M0 320V..."/></svg>
  <svg class="layer x2" data-depth="0.25" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice"><path d="..."/></svg>
  <svg class="layer x3" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice"><path d="..."/></svg>
</div>
```

- The container (section, footer, or wrapper) carries `data-parallax` with `"away"`,
  `"settle"`, or no value. Deeper layers get a larger `data-depth`; the front layer
  usually has none so it stays put and hides the seam.
- Paths start and end at the bottom edge and span 0 to 1440. Draw with smooth curves
  (`C`/`S`) through uneven peaks; add `M` subpaths for detail like trees on one layer.
- Fill back to front from the ladder: `--layer-5`, `--layer-3`, `--layer-1`, then the
  next section's background.
- `.layer` already supplies the lit edge and upward shadow.

## Torn divider

Reuse `.divider` between chapters: three `preserveAspectRatio="none"` sheets
(`d1` `--layer-5` depth 0.6, `d2` `--layer-3` depth 0.3, `d3` the next section's color),
a grain overlay, and the following section's top padding shrinks automatically.

## Speaking through the dialogue box

`say(who, line)` is in scope inside the game.js IIFE. Hook new triggers there; follow
the journey pattern (`stopPropagation` on the click, Enter on keydown, `tabIndex` and
`role="button"` for non-links). Lines are one or two sentences, no em dashes.

## Reduced-motion line

For any new animation or transform transition, add to the final block in index.css:

```css
@media (prefers-reduced-motion: reduce) {
  /* ...existing... */
  .new-thing { animation: none; }
  .new-thing:hover { translate: none; }
}
```
