@suppression
Feature: suppression d un produit du panier

  Background:
    Given je suis sur la page de connexion
    When je saisie mon login ""
    And je saisie mon mot de passe ""
    And je clique sur le bouton connexion
    Then je me rederige vers la page d'acceuil et "Logged in as" s affiche

  @suppressionValide @smoke
  Scenario: suppression d un produit du panier
    When je clique sur le produit
    And je survole le premier produit
    And je clique sur add to cart
    Then une confirmaton d ajout devrait s afficher
    When je clique sur le bouton view cart
    Then le panier devrait contenir 1 produit
    And je devrais voir le produit dans le panier
    When je clique sur le bouton supprimer le produit
    Then le produit devrait etre supprime du panier
    And le panier devrait etre vide

  @suppressionMultiples
  Scenario: suppression d un seul produit parmi plusieurs
    When je clique sur le produit
    And je survole le premier produit
    And je clique sur add to cart
    Then une confirmaton d ajout devrait s afficher
    When je clique sur le bouton view cart
    Then le panier devrait contenir 1 produit
    When je clique sur le produit
    And je survole le premier produit
    And je clique sur add to cart
    Then une confirmaton d ajout devrait s afficher
    When je clique sur le bouton view cart
    Then le panier devrait contenir 2 produit
    When je clique sur le bouton supprimer le produit
    Then le panier devrait contenir 1 produit
    And le produit supprime ne devrait plus figurer dans le panier