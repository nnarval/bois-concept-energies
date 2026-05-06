# Données produits - Fondis / Poêles à bois

Source principale : https://fondis.com/poeles-a-bois/
Date de normalisation : 2026-05-03
Nombre de fiches : 28
Langue du catalogue : français
Disponibilité BCE : tous les produits sont marqués vailabilityForBce: "propose".

## Utilisation prévue

Ces fichiers préparent l'intégration future de la page Nos produits du site BCE.
Le format a été normalisé pour rester compatible avec les catalogues déjà préparés.

Fondis est un distributeur multi-marques. Le filtre principal reste :

- marque : Fondis
- catégorie : Poêles à bois

Des filtres complémentaires sont aussi prévus :

- fabricant : Fondis, Agni, Thermocet, Wodtke
- série/gamme : Orion, Eclipse, Agni, Woody, Wodtke
- sous-gamme : quand disponible, notamment pour Wodtke
- technologies : accumulation, catalyse, Water+, HiClean, etc.

## Fichiers

- ondis-poeles-bois.json : base complète pour intégration frontend.
- ondis-poeles-bois.csv : version tableur pour vérification rapide.
- liste-produits.md : inventaire humain par gamme, avec liens source.

## Champs principaux

- rand, manufacturer, origin : marque distributeur, fabricant réel et origine.
- category, categoryLabel, series, subSeries : filtres de la future page produits.
- 
ame, description, sourceUrl : contenu des cartes et fiches produits.
- specs : puissance, rendement, volume chauffé, poids, sortie fumées, dimensions et dimensions de vitre quand disponibles.
- 	echnologies : technologies ou arguments techniques associés.
- image.url, image.thumbnail, image.alt : visuels fabricant.
- documents.ficheTechnique : fiche PDF fabricant quand disponible.

## Note technique

Certaines valeurs sont indiquées comme 
on publiée car le site Fondis ne donne pas toujours les puissances, poids, dimensions ou rendements directement dans les pages produit. Les fiches PDF liées sont conservées pour vérification technique avant publication définitive.

## Note visuels

Les images restent référencées via les URLs fabricant pour l'instant. Avant publication définitive, il faudra confirmer l'autorisation d'utilisation ou importer des assets locaux optimisés dans le projet.
