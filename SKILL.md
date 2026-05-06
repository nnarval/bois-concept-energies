---
name: foyer-flamme-design
description: Use this skill to generate well-branded interfaces and assets for Foyer & Flamme, a French installer of poêles à granulés, poêles à bois et inserts — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Foyer & Flamme — design skill

Read `README.md` in this skill folder first — it covers the full visual + content system: tone of voice (French, vouvoiement, restrained), color palette (warm naturals + copper/ember accents, never pure white or black), typography (Marcellus display + Manrope body, both Google Fonts), spacing, radii, shadows, motion, iconography (Lucide), and photography direction.

Then explore:

- `colors_and_type.css` — every design token as a CSS variable, plus baseline element styles. Import this in any HTML artifact.
- `assets/logo/` — wordmark (light + dark) and monogram. **Placeholder** — flag if shipping.
- `ui_kits/website/` — JSX components for the marketing site (Header, Hero, Services, Equipment, About, Zone, Contact, Footer) plus an interactive `index.html` demo.
- `preview/` — design-system tab cards, useful as visual references for individual decisions.

## When making artifacts

- Copy `colors_and_type.css` and the assets you need into the output. Don't rely on relative paths to this skill.
- Static HTML artifacts: link the CSS, reference the SVG logos, follow the rules in `README.md` (no pure white/black, no emoji, no decorative gradients, max 2 accent uses per viewport).
- Production code: lift the tokens, type rules, and component patterns. The JSX in `ui_kits/website/` is intentionally lightweight — re-implement against your real component primitives.

## When invoked without other guidance

Ask the user:

1. What are they building? (page, slide, email, mock, full site)
2. What real assets do they have? (logo, photography, copy)
3. What's the audience? (homeowner, partner, internal)

Then act as an expert designer and output HTML artifacts or production-ready code as appropriate. Stay French, stay restrained, stay warm.
