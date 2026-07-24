@produit
Feature: Gestion des produits

Background: 
Given je suis sur la page des produit

@afficherListe
Scenario: affiche de la liste des produits
Then je devrais voir une liste produits
Then le nombre de produits affiche devrait etre superieur a 0

@rechercheProduit
Scenario: Recherche d un produit par mot clé
When je saisie le produit "shirt"
Then je devrais voir une liste produits
Then je devrais consulter le mot cherche "shirt"

@AffichageProduit
Scenario: Affichage des details d'un produit
When je clique sur le premier produit 
Then je devrais voir le nom du produit 
And je devrais voir le prix du produit
And je devrais voir le detail du produit 