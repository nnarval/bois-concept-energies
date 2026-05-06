# Website UI Kit — Foyer & Flamme

A pixel-leaning recreation of the marketing website. Single-page scrolling layout with sticky header, full-bleed photo hero, three service cards, three equipment families, an about strip on walnut, a zone-d'intervention chip cluster, a contact form, and a footer.

## Files

- `index.html` — interactive demo. Open this.
- `Icon.jsx` — Lucide-style icon set (inline SVG, stroke 1.6).
- `Header.jsx` — sticky top nav, transparent → cream-with-blur on scroll.
- `Hero.jsx` — full-bleed warm-tone placeholder + headline + dual CTA + RGE callout.
- `Services.jsx` — 3-col service cards, hover-elevation only.
- `Equipment.jsx` — three editorial 50/50 splits, one per stove family.
- `About.jsx` — walnut section with stats + customer quote.
- `Sections.jsx` — `Zone`, `Contact`, `Footer`.

## What it demonstrates

- The full visual system applied end-to-end (color, type, spacing, motion).
- Component patterns: card, button, badge, input, eyebrow, quote.
- Editorial layout rules: asymmetric splits, generous vertical rhythm (96–128px between sections).
- Photographic placeholder treatment — gradient-only, with a label saying "Photo réelle ici" so it's clear what's missing.

## Caveats

- All photographs are gradient placeholders. Drop in real photography before treating this as a comp.
- The header logo is a placeholder wordmark.
- Mobile breakpoint is functional but not polished — desktop is the primary canvas.
