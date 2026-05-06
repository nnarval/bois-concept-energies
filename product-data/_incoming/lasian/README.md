# lasian-poeles-a-granules

Données catalogue **Lasian** — catégorie **Poêles à granulés**

## Informations générales

| Champ | Valeur |
|---|---|
| **Marque** | Lasian |
| **Fabricant** | Lasian Tecnología del Calor S.L. |
| **Origine** | Espagne — Pol. Ind. Las Norias, Muel (Zaragoza) |
| **Site** | https://lasian.es |
| **URL catalogue** | https://lasian.es/fr/poeles-a-granules/ |
| **Catégorie (id)** | `poeles-a-granules` |
| **Nombre de modèles** | 5 |
| **Disponibilité BCE** | `propose` (tous les modèles) |
| **Date de scraping** | 2025-05-03 |

## Contenu du dossier

| Fichier | Description |
|---|---|
| `products.json` | Catalogue complet JSON — 5 modèles avec structure couleurs |
| `products-control.csv` | CSV de contrôle avec colonnes clés |
| `catalogue-par-serie.md` | Vue Markdown avec guide développeur sélecteur couleur |
| `README.md` | Ce fichier |

## Vue d'ensemble des modèles

| Modèle | Type | kW | Coloris | Wifi | Étanche | Hydro |
|---|---|---|---|---|---|---|
| **Eriste** | Air | 8/10/12/14 | 2 (blanc, noir) | ✅ Série | — | — |
| **Aspe** | Air | 8/10/12/14 | 3 (blanc, rouille, noir) | ✅ Série | — | — |
| **Ara** | Air | 8/10/12 | 3 (blanc, rouille, noir) | ✅ Série | — | — |
| **Audax** | Air étanche | 6/8/10 | 3 (blanc, bordeaux, noir) | Option | ✅ | — |
| **Sigma** | Hydro | 15/18/24 | 4 (blanc, rouille, noir, groseille) | Option | — | ✅ |

## 🎨 Structure couleurs — pour sélecteur client interactif

### Philosophie
Lasian propose plusieurs finitions de couleur pour chaque modèle. Plutôt que de créer un produit par couleur (approche lourde), la structure JSON choisie regroupe toutes les couleurs dans un tableau `couleurs[]` au niveau du produit. Cette approche permet un **sélecteur dynamique** côté frontend qui met à jour l'image sans rechargement.

### Structure du tableau couleurs
```json
"couleurParDefaut": "blanc-opaque",
"couleurs": [
  {
    "slug": "blanc-opaque",     // clé unique, URL-safe
    "label": "Blanc opaque",    // texte affiché
    "labelEs": "Blanco opaco",  // texte original fabricant
    "hex": "#F5F5F5",           // couleur CSS pour pastille/cercle
    "imageUrl": "https://...",  // image principale dans cette couleur
    "imageUrlBg": "https://...",// image fond transparent (variante)
    "disponible": true          // false = pastille grisée + non cliquable
  }
]
```

### Implémentation frontend recommandée
1. Afficher `couleurs[]` comme pastilles/cercles colorées (`background: hex`)
2. Au clic : remplacer l'image principale par `couleurs[selected].imageUrl`
3. Afficher le `label` de la couleur sélectionnée sous l'image
4. Si `disponible: false` : griser la pastille + `cursor: not-allowed`
5. Initialiser sur `couleurParDefaut`

### Coloris disponibles par modèle

| Slug | Label | Hex | Modèles |
|---|---|---|---|
| `blanc-opaque` | Blanc opaque | `#F5F5F5` | Eriste, Aspe, Ara, Audax, Sigma |
| `effet-rouille` | Effet rouille | `#8B4513` | Aspe, Ara, Sigma |
| `noir` | Noir | `#1A1A1A` | Eriste, Aspe, Ara, Audax, Sigma |
| `bordeaux` | Bordeaux | `#7B1D3C` | Audax uniquement |
| `groseille-rouge` | Groseille rouge | `#C0392B` | Sigma uniquement |

## Structure JSON complète d'un produit

```json
{
  "id": "lasian-[slug]",
  "marque": "Lasian",
  "fabricant": "Lasian",
  "origine": "Espagne",
  "categorie": "poeles-a-granules",
  "typeAppareil": "poele-a-granules-air | poele-a-granules-air-etanche | poele-a-granules-hydro",
  "serie": "[Poêles à air | Audax | Sigma]",
  "nom": "[Nom modèle]",
  "couleurParDefaut": "[slug]",
  "couleurs": [{ "slug", "label", "labelEs", "hex", "imageUrl", "imageUrlBg", "disponible" }],
  "puissancesDisponibleskW": [8, 10, 12, 14],
  "specifications": {
    "puissanceskW": [],
    "technologieCombustion": "EfiPLUS"
  },
  "equipementSerie": [],
  "options": [],
  "canalisable": true,
  "wifiSerie": true,
  "wifiOption": false,
  "etanche": false,
  "typeHydro": false,
  "ecodesign": true,
  "availabilityForBce": "propose",
  "documents": { ... PDFs par puissance ... }
}
```

## Spécifications techniques

Les specs techniques détaillées (dimensions, poids, débit air, tirage minimal) **ne sont pas sur le site web** — elles figurent dans les fiches techniques PDF par modèle et puissance. Chaque produit inclut un objet `documents` avec les URLs PDF directes de toutes les fiches techniques, manuels, étiquettes énergie et déclarations de performance.

## Particularités notables

- **Eriste et Ara** ont des versions **SH** (Sortie Haute) pour certaines puissances
- **Audax** est le seul modèle **étanche** (indépendant de l'air ambiant) — compatible BBC/RE2020 sans modification
- **Sigma** est le seul modèle **hydro** — s'intègre dans un circuit de chauffage central
- **Wifi série** sur Eriste/Aspe/Ara. **Wifi option** sur Audax/Sigma
- Tous supportent **Alexa & Google Home** sur les modèles avec Wifi intégré
