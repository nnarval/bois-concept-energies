# Bois Concept Énergies — Design System

> **Bois Concept Énergies** (BCE) — installateur de poêles à granulés, poêles à bois et inserts à **Nègrepelisse (82800)**, intervenant dans tout le **Tarn-et-Garonne** et alentours.

A digital "carte de visite" for a French installer. The site is a credibility surface, not a lead-generation funnel. Visitors should walk away thinking *"this is a serious, local, careful company I would trust in my home."*

### Brand pillars

1. **Sérieux artisan** — craft, expertise, technical competence
2. **Modernité du foyer** — clean, contemporary, dark-warm interiors (not rustic)
3. **Énergie naturelle** — the green leaf in the logo is the brand's heart: bois, écologie, énergie renouvelable
4. **Local & accessible** — Nègrepelisse, Tarn-et-Garonne

---

## Sources

| Source | Path | Status |
|---|---|---|
| Brief (FR) | conversation, 2 May 2026 | primary — defines tone, audience, restraint |
| `assets/logo/bce-logo.png` | uploads | **primary brand mark** — house silhouette + green leaf-flame + wordmark |
| `assets/photography/*.png` | uploads | 8 reference photos defining photography direction (dark-warm, contemporary interiors) |
| `uploads/evanlite.com_*.json` | — | unrelated, ignored |

---

## Index of files

```
/
├── README.md                 ← you are here
├── SKILL.md                  ← Agent Skill manifest
├── colors_and_type.css       ← all design tokens (CSS variables)
├── assets/
│   ├── logo/                 ← bce-logo.png + light/dark wordmark renderings
│   └── photography/          ← 8 reference photos defining direction
├── preview/                  ← Design System tab cards
└── ui_kits/
    └── website/              ← marketing website kit (interactive demo)
```

---

## Content fundamentals

### Language & voice

- **French**, *vouvoiement* (always "vous"). Audience: homeowners 35–70 in rural / peri-urban Tarn-et-Garonne.
- **First person plural** ("nous", "notre équipe"). Never "je".
- **No exclamation marks** in body copy. **No emoji.** Ever.

### Tone in one line

> *Un artisan local qui prend le temps de bien faire les choses, et qui sait l'expliquer simplement.*

### Casing

- Headings: **Sentence case** ("Notre savoir-faire", not "Notre Savoir-Faire").
- Buttons: **Sentence case**, no terminal punctuation.
- Eyebrows: **UPPERCASE**, letter-spaced 0.16em.

### Vocabulary — yes / no

| Use | Avoid |
|---|---|
| savoir-faire, accompagnement, conseil | offre exclusive, deal, promo |
| installation, pose, entretien, ramonage | service après-vente |
| confort thermique, chaleur, foyer | optimiser votre confort thermique |
| chantier, réalisation, intervention | projet client, ticket |
| nous intervenons, nous accompagnons | solutions innovantes |
| devis gratuit, sur rendez-vous | obtenez votre devis maintenant !! |
| poêle à granulés, poêle à bois, insert | "produit", "appareil", "système" |
| Tarn-et-Garonne, Nègrepelisse | "votre région" (be specific) |

### Examples — rewrites

**❌ Too commercial**
> *Découvrez dès maintenant nos offres exceptionnelles sur les poêles à granulés !*

**✅ On-brand**
> *Nous installons des poêles à granulés dans le Tarn-et-Garonne. Chaque pose est précédée d'une visite chez vous pour comprendre votre habitation et choisir l'appareil qui convient.*

**❌ Too vague**
> *Notre mission est de vous offrir des solutions de chauffage adaptées à votre style de vie.*

**✅ On-brand**
> *Nous vendons, posons et entretenons des poêles à bois, des poêles à granulés et des inserts. Rien d'autre. C'est notre métier.*

### Length

- Hero strapline: ≤ 9 words.
- Service descriptions: 2–3 short sentences.
- Body paragraphs: 3–5 lines max.

### CTAs

Primary: *Nous contacter*  •  *Demander un devis*
Secondary: *Voir nos réalisations*  •  *Découvrir nos services*  •  *Notre zone d'intervention*

---

## Visual foundations

### Mood

Inspect the photo gallery: **contemporary, dark-warm, refined interiors**. Black cast-iron stoves on black/charcoal/deep-green walls, oak floors, stone hearths, soft daylight, ember glow. **Not rustic** — modern. Restrained. Editorial.

### Color system

The logo establishes **green** (`#46821B`) as the brand accent — leaf/foliage, never neon. The interiors photography establishes **near-black + warm neutrals** as the workhorse. So the palette is built around: **rich black + warm cream + green leaf + ember orange (very sparing, for actual flame imagery)**.

| Role | Token | Hex | Usage |
|---|---|---|---|
| Cream (page bg) | `--bg` | `#F5F1EA` | default background |
| Ivory (raised) | `--surface` | `#FBF8F2` | cards, panels |
| Sand | `--sand` | `#E8E2D4` | dividers, hover surfaces |
| Stone | `--stone` | `#C9C2B3` | tertiary backgrounds, captions on light |
| Charbon (text) | `--ink` | `#141414` | body text "near-black" — matches logo |
| Anthracite | `--anthracite` | `#1F1F1F` | cast-iron surfaces, dark sections |
| Ash | `--ash` | `#5A5A5A` | secondary text on cream |
| Smoke | `--smoke` | `#8A8A85` | tertiary text, captions |
| **Vert BCE** | `--leaf` | `#46821B` | primary accent — links, CTAs, focus, leaf |
| Vert profond | `--leaf-2` | `#356416` | hover state |
| Vert clair | `--leaf-3` | `#7FB539` | rare highlight (not a UI color) |
| Ember | `--ember` | `#D9531E` | reserved exclusively for flame imagery / fire |

**Rules.**
- **No pure white, no pure black.** Always cream + `#141414`.
- **Green is the only link / button accent** on light surfaces. Use it deliberately.
- **Ember is for actual flame depictions only** (gradient overlays on hero photos, fire icon fills). Never a button color.
- Maximum two accent uses per viewport.
- Black + cream is the signature pairing. Green is the punctuation.

### Typography

The logo uses a geometric humanist sans (close to **Montserrat / Poppins**). Brief asks for a clean, modern, professional look. Pairing:

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display / H1, H2 | **Fraunces** ❌ avoided | — | (would be slop per guidelines) |
| Display / H1, H2 | **Marcellus** | 400 | Refined classical serif. Single weight. (Editorial counterpoint to logo's sans.) |
| Body / UI / Wordmark match | **Manrope** | 400 / 500 / 600 / 700 | Modern, neutral. Pairs with the logo wordmark's geometric humanist feel. |
| Eyebrow / labels | **Manrope** | 600 | UPPERCASE, 0.16em tracking, 12px. |

Both via Google Fonts. Marcellus single-weight by design.

> If the user prefers a sans-only system to match the logo more tightly, swap H1/H2 to **Manrope 700** at 1.05 line-height with `letter-spacing: -0.02em`. Both options are documented in `colors_and_type.css`.

### Spacing

4-pt base. `--space-1` … `--space-10` (4 → 128px). Sections breathe at 96–128px desktop.

### Radii

Restrained. `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 14px`. No pill buttons.

### Borders

Hairlines, warm. `1px solid var(--sand)` on cards. `1px solid rgba(20,20,20,0.15)` on inputs.

### Shadows

Soft, warm-tinted, low.

```css
--shadow-1: 0 1px 2px rgba(20, 20, 20, 0.06);
--shadow-2: 0 8px 24px -12px rgba(20, 20, 20, 0.18);
--shadow-3: 0 24px 48px -24px rgba(20, 20, 20, 0.22);
```

### Backgrounds & textures

- Default: solid `--bg` cream.
- **Photographic full-bleed** for hero and gallery — dark-warm interiors with ember-glow, drawn from the supplied gallery.
- **No decorative gradients.** Only legitimate use: a dark anchor gradient at the bottom of full-bleed hero photos for legible white text.

### Animation

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)`. 220–320ms.
- **Allowed:** fade + 8px translate-up on scroll-into-view; fade-cross between gallery photos; underline grow.
- **Banned:** bouncing, springy, parallax, anything > 400ms, anything that auto-replays.

### Hover & press

- **Links:** color stays, underline animates from left edge. Or green → deeper green.
- **Primary button (filled black):** lift to ink+ slightly via shadow on hover, scale 0.98 on press.
- **Cards:** `--shadow-1` → `--shadow-2`, no transform.

### Layout

- Container max width **1200px** (content), **1440px** (full-bleed photo).
- 12-column grid, 32px gutters desktop / 16px mobile.
- Asymmetric editorial layouts encouraged.
- **Header:** sticky, transparent on hero, cream-with-blur after scroll.

### Cards

- Background: `--surface`.
- Border: `1px solid var(--sand)`.
- Radius: `--radius-md` (8px).
- Shadow: `--shadow-1` at rest, `--shadow-2` on hover.
- No colored left-border accents. No gradient overlays.

### Imagery direction

Drawn from the supplied gallery. The brand's photographic vocabulary:

- **Black cast-iron stoves** as hero objects, photographed against **dark walls** (deep green, charcoal, near-black) or warm **stone/concrete**.
- **Ember glow** through stove glass — always real fire, not graphics.
- Settings are **modern, refined, minimalist** — no doilies, no rustic clutter.
- **Wood elements**: oak floors, exposed beams, log baskets — texture, not theme.
- **People**: hands-and-tools shots (installer measuring, fitting), candid, never posed. See `installateur-mesure.png`.
- Avoid: ultra-saturated marketing photography, stock smiling families, drone shots.

---

## Iconography

**[Lucide](https://lucide.dev)** (open-source SVG, MIT) — referenced inline. Why:

- 1.6px stroke matches the logo's clean geometry.
- Generous, modern proportions.

### Rules

- 20px in body, 24px in cards, 32px max.
- `--ink` or `--ash` by default. Never green unless paired with green text.
- One icon per service / feature card maximum.
- **No emoji. No unicode glyphs.** Use Lucide `arrow-right`, not `→`.
- The **leaf-flame** in the logo is a brand mark, not an icon. Don't use leaf icons throughout the UI — it dilutes the device.

Whitelist: `flame`, `hammer`, `wrench`, `phone`, `mail`, `map-pin`, `clock`, `arrow-right`, `chevron-down`, `check`, `home`, `award`, `quote`.

---

## Caveats — please review

1. **Marcellus + Manrope** is the proposed type pairing. The logo is geometric sans (Manrope-adjacent); Marcellus is the editorial serif counterpoint. Confirm — or say "sans-only" and I'll swap headings to Manrope 700.
2. **Photography** is the supplied gallery — used as references, integrated into the hero and section blocks. They are AI-generated (visible in filenames) which is fine for a placeholder website but **for production, real installation photos from your team will significantly raise credibility**.
3. Phone, email, address, SIRET on the site are placeholders. Need real values.
4. RGE Qualibois badge is shown — confirm the certification (and exact name) before publish.
5. The earlier "Foyer & Flamme" placeholder content has been replaced everywhere with **Bois Concept Énergies**.
