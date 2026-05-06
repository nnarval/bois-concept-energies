# Données produits - Fondis / Cheminées contemporaines

Source principale : https://fondis.com/cheminees-contemporaines/
Date de normalisation : 2026-05-03
Nombre de fiches : 43
Langue du catalogue : français
Disponibilité BCE : tous les produits sont marqués vailabilityForBce: "propose".

## Utilisation prévue

Ces fichiers préparent l'intégration future de la page Nos produits du site BCE.
Le catalogue est conservé en catégorie cheminees-contemporaines, car il regroupe bois, hybride, gaz et électrique.

## Catégorisation BCE

- Modbox : combustible bois, compatible avec inserts-bois via categoryBceCompatible.
- Cheminée Hybride : bois + pompe à chaleur, pas de catégorie standard BCE actuelle.
- Trimline Gaz : gaz, pas de catégorie standard BCE actuelle.
- Solus Électrique : électrique, pas de catégorie standard BCE actuelle.

## Filtres prévus

- marque : Fondis
- catégorie : Cheminées contemporaines
- catégorie BCE compatible : Inserts bois, uniquement pour Modbox
- combustible : Bois, Bois + pompe à chaleur, Gaz, Électrique
- fabricant : Fondis, Thermocet, Trimline / Thermocet
- série : Modbox, Hybride, Trimline, Solus
- sous-gamme : Modbox Bois, Cheminée Hybride, Trimline Gaz, E Solus, iX Solus, Poêles Électriques
- options techniques : double face, angle, épi, mobile, accumulateur, nouveauté, refroidissement, multi-pièces, télécommande, Wifi

## Fichiers

- ondis-cheminees-contemporaines.json : base complète pour intégration frontend.
- ondis-cheminees-contemporaines.csv : version tableur pour vérification rapide.
- liste-produits.md : inventaire humain par combustible et série, avec liens source.

## Champs principaux

- rand, manufacturer, origin : marque, fabricant et origine.
- category, categoryLabel, categoryBceCompatible, combustible, combustibleLabel, series, subSeries : filtres de la future page produits.
- eatures : double face, angle, mobile, accumulateur, nouveauté, refroidissement, télécommande, Wifi, etc.
- 
ame, description, sourceUrl : contenu des cartes et fiches produits.
- specs : puissance, rendement, consommation électrique, dimensions de vitre et autres champs disponibles.
- 	echnologies, socles, ides, distinctions, exigences : informations spécifiques selon gamme.
- image.url, image.thumbnail, image.alt : visuels fabricant.
- documents.ficheTechnique : fiche PDF fabricant quand disponible.

## Note technique

Le total réel dans le JSON source est de 43 produits. Les métadonnées du zip annonçaient 44, mais les fiches présentes et exploitables sont au nombre de 43.

## Note visuels

Les images restent référencées via les URLs fabricant pour l'instant. Avant publication définitive, il faudra confirmer l'autorisation d'utilisation ou importer des assets locaux optimisés dans le projet.
