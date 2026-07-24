@apiCompte
Feature: Gestion d'un compte utilisateurs via des apis


En tant que testeur je souhaite valide des opérations de gestion sur un compte
utilisateur via l'api afin de m'assurer que les endppoints fonctionnent correctement



Background:
Given l'api automatisation exercice est disponible
And un mail unique doit être génere
When  je creer le compte avec les données génerees
Then le code de reponse devrait être 201


@creationApi
Scenario:creer un compte utilisateur
Then le message de reponse devrait être "User created!"

@read
Scenario: Récupere les détails d'un compte existant
When je récupere les détails du compte par emaiil
Then le code de reponse devrait être 200
And les détails devraient contenir le nom de l'utilisateur

@update
Scenario:Mettre à jour les informations d'un compte
When je mets à jour le nom du compte avec "sirinee"
Then le code de reponse devrait être 200
Then le message de reponse devrait être "User updated!"

@delete
Scenario: Supprimer un compte existant
When je supprime le compte
Then le code de reponse devrait être 200
Then le message de reponse devrait être "Account deleted!"

@fluxCompletCrud
Scenario: fluxComplet Crud :créér ,lire ,mettre à jour et supprimer 
Then le message de reponse devrait être "User created!"

When je récupere les détails du compte par emaiil
Then le code de reponse devrait être 200
And les détails devraient contenir le nom de l'utilisateur

When je mets à jour le nom du compte avec "sirinee"
Then le code de reponse devrait être 200
Then le message de reponse devrait être "User updated!"

When je supprime le compte
Then le code de reponse devrait être 200
Then le message de reponse devrait être "Account deleted!"
