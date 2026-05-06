# cmg-poeles-a-granules

Données catalogue **CMG** (Caminetti Montegrappa) — catégorie **Poêles à granulés**

## Informations générales

| Champ | Valeur |
|---|---|
| **Marque** | CMG |
| **Nom complet** | Caminetti Montegrappa |
| **Site** | https://www.cmg-fire.fr |
| **Origine** | Italie |
| **URL catalogue** | https://www.cmg-fire.fr/categorie-produit/poeles-a-granules/ |
| **Catégorie (id)** | `poeles-a-granules` |
| **Nombre de moteurs** | 9 |
| **Entrées catalogue (moteur×habillage)** | ~131 |
| **Disponibilité BCE** | `propose` (tous) |
| **Date de scraping** | 2025-05-03 |

## Contenu du dossier

| Fichier | Description |
|---|---|
| `products.json` | Catalogue JSON — 9 moteurs + référentiel habillages complet |
| `products-control.csv` | CSV de contrôle par moteur |
| `catalogue-par-serie.md` | Vue Markdown avec guide développeur sélecteur |
| `README.md` | Ce fichier |

## Architecture unique CMG : Moteur × Habillage

CMG organise son catalogue en deux dimensions séparées :

### 1. Moteur (corps technique)
Détermine : puissance, technologie de ventilation, étanchéité, certifications, specs techniques.

### 2. Habillage (design)
Détermine : apparence, matière, couleur(s). Un même habillage peut être disponible sur plusieurs moteurs.

**Pourquoi cette architecture dans le JSON ?**
- Le catalogue CMG contient ~131 entrées (combinaisons moteur×habillage), mais il n'y a que 9 moteurs distincts et ~20 habillages distincts.
- Stocker les 131 entrées séparément serait redondant et difficile à maintenir.
- La structure choisie (9 moteurs + référentiel habillages) permet un sélecteur dynamique côté client sans duplication de données.

## Vue d'ensemble des moteurs

| Moteur | kW | Ventilation | Étanche | DTA CSTB | Habillages | Particularité |
|---|---|---|---|---|---|---|
| **AVALON 2N** | 6 / 9 | Smart | ✅ | ✅ | 13 classiques | — |
| **NVI** | 6 / 9 | Smart | — | — | 13 classiques | — |
| **ALIAS 2N** | 8 | Smart | — | — | 13 classiques | — |
| **BOREA** | 6 / 8 | Smart | ✅ | ✅ | 13 classiques | — |
| **MVI ED** | 12 | Smart | ✅ | — | 4 ED | — |
| **TCi** | 9 | Smart + Canalisable | ✅ | ✅ | 13 classiques | 3 zones + 2 thermostats |
| **ATLANTIS ED** | 9/12/14 | Canalisable | ✅ | ✅ | 4 ED | Haute puissance |
| **ACE** | 6 / 9 | Smart + Canalisable | ✅ | ✅ | 4 Slim | **Slim 33 cm**, conduit concentrique |
| **AXE** | 12 | Canalisable | ✅ | — | 3 Extra-plat | **Extra-plat** |

## Familles d'habillages

| Famille | Nb designs | Compatible avec | Matières |
|---|---|---|---|
| **Classiques** | 13 | AVALON 2N, NVI, ALIAS 2N, BOREA, TCi | Verre, Acier, Stéatite, Céramique |
| **ED** | 4 | MVI ED, ATLANTIS ED | Verre, Acier |
| **ACE Slim** | 4 | ACE | Céramique, Stéatite |
| **AXE Extra-plat** | 3 | AXE | Céramique, Stéatite |

### Habillages classiques avec plusieurs couleurs
- **STARLET** → 3 couleurs : Bronze, Gris métallisé, Noir ← sélecteur couleur niveau 2 nécessaire
- **DRUM-2** → 2 couleurs : Blanc opaque, Gris

## Structure JSON type

```json
{
  "id": "cmg-[moteur-slug]",
  "marque": "CMG",
  "categorie": "poeles-a-granules",
  "sousCategorie": "ventilation-air-smart | ventilation-air-canalisable",
  "nom": "[NOM MOTEUR]",
  "habillageParDefaut": "[slug-habillage]",
  "habillagesDisponibles": ["slug1", "slug2", "..."],
  "puissancesDisponibleskW": [6, 9],
  "specifications": {
    "puissanceNominalekW": 9.1,
    "modulationPuissancekW": "3,1 – 9,1",
    "surfaceChauffeeM2": 104,
    "classeEnergetique": "A+",
    "rendementPct": "89,5 – 94,4",
    "rendementSaisonnierPct": 85,
    "capaciteReservoirKg": 16.5,
    "autonomieH": "7,5 – 23,5",
    "dimensionsCm": "56 × 49 × 109",
    "poidsKg": 129,
    "chambreEtanche": true,
    "ficheTechniqueUrl": "https://..."
  },
  "equipements": ["..."],
  "etanche": true,
  "dtaCSTB": true,
  "ventilationType": "smart | canalisable",
  "canalisable": false,
  "wifiBeefire": true,
  "ecodesign": true,
  "flammeVerte": "7*",
  "availabilityForBce": "propose"
}
```

## Implémentation sélecteur Moteur × Habillage

### Niveau 1 — Choix du moteur
Présenter les moteurs avec leurs specs clés (kW, étanche, canalisable).

### Niveau 2 — Choix de l'habillage
Récupérer `habillagesDisponibles[]` du moteur sélectionné → chercher chaque slug dans `habillagesReference` → afficher les images.

### Niveau 3 — Choix de la couleur (si multi-couleurs)
Si `habillage.couleurs.length > 1` → afficher pastilles de couleurs avec `hex` → mettre à jour `imageUrl` en temps réel.

### Génération de l'URL produit finale
Format CMG : `https://www.cmg-fire.fr/produit/[moteur-slug]-[puissance]kw-[habillage-slug]/`  
Exemple : `tci-9kw-starlet` → `https://www.cmg-fire.fr/produit/tci-9kw-starlet/`

## Champs pour filtres futurs

- `marque` → `"CMG"`
- `categorie` → `"poeles-a-granules"`
- `sousCategorie` → `"ventilation-air-smart"` ou `"ventilation-air-canalisable"`
- `etanche` → `true/false`
- `dtaCSTB` → `true/false`
- `canalisable` → `true/false`
- `puissancesDisponibleskW` → filtre kW
- `flammeVerte` → `"7*"`
- `availabilityForBce` → `"propose"`
