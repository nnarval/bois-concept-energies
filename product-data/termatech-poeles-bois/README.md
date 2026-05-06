# Donnees produits - TermaTech / Poeles a bois

Source principale : https://termatech.com/fr/poele-a-bois/
Date de recuperation : 2026-05-03
Nombre de fiches : 49

## Utilisation prevue

Ces fichiers preparent l'integration future de la page Nos produits du site BCE.
Chaque produit est marque comme propose par BCE et contient les champs necessaires pour filtrer par :

- marque : TermaTech
- categorie : Poeles a bois
- serie : TT20, TT21, TT22, TT23, TT30, TT44, TT55, TT80, TT23RG A-Flame

## Fichiers

- 	ermatech-poeles-bois.json : base complete pour integration frontend.
- 	ermatech-poeles-bois.csv : version lisible/tableur pour verification rapide.
- liste-produits.md : inventaire humain par serie, avec liens source.

## Champs principaux

- rand, category, series : pour les filtres.
- 
ame, description, sourceUrl : pour les cartes et fiches produits.
- specs : puissance, rendement, surface chauffee, poids, raccordements, garantie.
- image.url : visuel source fabricant.

## Notes

Les images sont stockees sous forme d'URL source TermaTech pour l'instant. Avant la mise en ligne definitive, il faudra soit confirmer l'autorisation d'utilisation des visuels fabricant, soit remplacer les URLs par des assets locaux optimises.
