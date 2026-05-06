# cmg-inserts-granules

Données catalogue **CMG** (Caminetti Montegrappa) — catégorie **Inserts à granulés**

## Informations générales

| Champ | Valeur |
|---|---|
| **Marque** | CMG |
| **Catégorie (id)** | `inserts-granules` |
| **URL source** | https://www.cmg-fire.fr/categorie-produit/inserts-et-foyer/insert-a-granules/ |
| **Moteurs** | 2 (INSIDE M9, INSIDE M11 C) |
| **Entrées catalogue** | 6 (2 moteurs × 3 cadres) |
| **Couleur** | NOIR uniquement |
| **Disponibilité BCE** | `propose` |
| **Date de scraping** | 2025-05-03 |

## Contenu du dossier

| Fichier | Description |
|---|---|
| `products.json` | 2 moteurs + référentiel cadres |
| `products-control.csv` | CSV de contrôle |
| `catalogue-par-serie.md` | Vue Markdown avec specs et comparatif |
| `README.md` | Ce fichier |

## Architecture Moteur × Cadre

Même logique que `cmg-poeles-a-granules` : le **moteur** porte les specs techniques, le **cadre** porte le design d'encadrement. Ici la couleur est unique (NOIR), donc pas de sélecteur couleur supplémentaire — seul le cadre est à choisir.

```
Moteur         × Cadre     = Référence catalogue
INSIDE M9        KPV70P      inside-m9-kpv70p
INSIDE M9        KPV80C      inside-m9-kpv80c
INSIDE M9        KPV80P      inside-m9-kpv80p
INSIDE M11 C     KPV70P      inside-m11-c-kpv70p
INSIDE M11 C     KPV80C      inside-m11-c-kpv80c
INSIDE M11 C     KPV80P      inside-m11-c-kpv80p
```

## Différences clés M9 vs M11 C

| | M9 | M11 C |
|---|---|---|
| kW | 8,5 | 10,2 |
| Ventilation | Forcée | **Canalisable** |
| Surface | 97 m² | 117 m² |
| Rendement saisonnier | 80% | **86%** |
| Entrée air | min. 400 cm² | min. **630 cm²** |
| Poids | 102 kg | 117 kg |

## Cadres disponibles (référentiel `cadresReference`)

| Cadre | Largeur | Type | Note |
|---|---|---|---|
| `kpv70p` | 70 cm | Plat | Format standard |
| `kpv80c` | 80 cm | Courbe | Design arrondi, effet profondeur |
| `kpv80p` | 80 cm | Plat | Grand format plat |

## Implémentation sélecteur cadre

1. Afficher les `cadresDisponibles[]` du moteur choisi
2. Chercher chaque slug dans `cadresReference.cadres`
3. Afficher `couleurs[0].imageUrl` (couleur unique NOIR)
4. Au clic sur un cadre → mettre à jour l'image principale
5. Couleur unique → pas de sélecteur couleur supplémentaire

## Note sur les specs

La fiche technique PDF est **commune** aux deux moteurs :  
`https://www.cmg-fire.fr/wp-content/uploads/sites/4/2025/07/INSIDE-M9-M11CFRv02_01-25p.pdf`

Les specs complètes (CO, PM, IEE, tirage…) sont toutes renseignées dans le JSON — c'est la grande différence avec les autres gammes CMG où certaines fiches n'exposaient pas encore tous les chiffres.
