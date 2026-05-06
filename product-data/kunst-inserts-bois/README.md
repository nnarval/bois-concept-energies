# Données produits - Kunst / Inserts bois

Source principale : https://kunststoves.com/fr/poeles-a-bois/
Date de normalisation : 2026-05-03
Nombre de fiches : 7
Langue du catalogue : français
Disponibilité BCE : tous les produits sont marqués vailabilityForBce: "propose".

## Utilisation prévue

Ces fichiers préparent l'intégration future de la page Nos produits du site BCE.
Le format a été normalisé pour rester compatible avec les données TermaTech et Kunst poêles à bois déjà préparées.

Filtres prévus :

- marque : Kunst
- catégorie : Inserts bois
- série : Ebano, Ficus, Quercus, Sequoia, Vista, Wengue, Willow

## Fichiers

- kunst-inserts-bois.json : base complète pour intégration frontend.
- kunst-inserts-bois.csv : version tableur pour vérification rapide.
- liste-produits.md : inventaire humain par série, avec liens source.

## Champs principaux

- rand, category, categoryLabel, series : filtres de la future page produits.
- 
ame, description, sourceUrl : contenu des cartes et fiches produits.
- specs : puissance, rendement, volume chauffé, poids, sortie fumées, dimensions, Ecodesign.
- image.url, image.thumbnail, image.alt : visuels fabricant.
- documents.ficheTechnique, documents.manuel : documents fabricant quand disponibles.

## Note catalogue

Les inserts Kunst sont référencés par le fabricant dans la section poêles à bois. Ils sont néanmoins normalisés ici avec la catégorie BCE inserts-bois pour permettre le filtrage correct sur la future page produits.

## Note visuels

Les images restent référencées via les URLs fabricant pour l'instant. Avant publication définitive, il faudra confirmer l'autorisation d'utilisation ou importer des assets locaux optimisés dans le projet.
