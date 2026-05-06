# Données produits - Fondis / Inserts bois

Source principale : https://fondis.com/cheminees-fondis/
Date de normalisation : 2026-05-03
Nombre de fiches : 33
Langue du catalogue : français
Disponibilité BCE : tous les produits sont marqués vailabilityForBce: "propose".

## Utilisation prévue

Ces fichiers préparent l'intégration future de la page Nos produits du site BCE.
Le format a été normalisé pour rester compatible avec les autres catalogues déjà préparés.

## Catégorisation BCE

Ce catalogue regroupe trois types d'appareils :

- foyers fermés : Stella et Ulys
- inserts de rénovation : séries F, T, V et Eclipse
- insert sur mesure : dimensions personnalisées

Tous sont classés dans la catégorie BCE inserts-bois, car le référentiel actuel ne prévoit pas de catégorie séparée oyers-bois.

## Filtres prévus

- marque : Fondis
- catégorie : Inserts bois
- type d'appareil : Foyer fermé, Insert de rénovation, Insert sur mesure
- série : Stella, Ulys, Inserts, Inserts sur mesure
- sous-gamme : Stella 3, Stella 4 Pure, Ulys, Série F, Série T, Série V, Eclipse, Sur mesure
- options techniques : double face, angle, sur mesure, ventilateur en option, compatible RE2020

## Fichiers

- ondis-inserts-bois.json : base complète pour intégration frontend.
- ondis-inserts-bois.csv : version tableur pour vérification rapide.
- liste-produits.md : inventaire humain par type et série, avec liens source.

## Champs principaux

- rand, manufacturer, origin : marque, fabricant et origine.
- category, categoryLabel, 	ypeAppareil, 	ypeAppareilLabel, series, subSeries : filtres de la future page produits.
- eatures : double face, angle, sur mesure, ventilateur en option, compatibilité RE2020.
- 
ame, description, sourceUrl : contenu des cartes et fiches produits.
- specs : puissance, rendement, volume, dimensions de vitre, intérieur, format et autres champs disponibles.
- 	echnologies : technologies ou arguments techniques associés.
- image.url, image.thumbnail, image.alt : visuels fabricant.
- documents.ficheTechnique : fiche PDF fabricant quand disponible.

## Note technique

Fondis ne publie pas toujours les puissances, poids, dimensions complètes ou rendements sur les pages web. Les fiches PDF liées sont conservées pour vérification technique avant publication définitive.

## Note visuels

Les images restent référencées via les URLs fabricant pour l'instant. Avant publication définitive, il faudra confirmer l'autorisation d'utilisation ou importer des assets locaux optimisés dans le projet.
