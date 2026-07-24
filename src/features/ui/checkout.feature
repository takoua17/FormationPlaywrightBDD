@checkout
Feature: checkout
en tant que client je souhaite finaliser la commande 

  Background:
    Given je suis sur la page de connexion
    When je saisie mon login ""
    And je saisie mon mot de passe ""
    And je clique sur le bouton connexion
    Then je me rederige vers la page d'acceuil et "Logged in as" s affiche
    When je clique sur le produit
    When je clique sur le premier produit
    Then je devrais voir le nom du produit
    And je clique sur le bouton Add to cart
    Then une confirmaton d ajout devrait s afficher
    When je clique sur le bouton view cart
    Then je verifie la quantite dans le panier devrait etre 1

  @checkout
  Scenario: paiement commande
 When je clique sur le bouton proceed to checkout
 Then je me rederige vers la page ou "Address Details" s affiche 
 Then je devrais voir mon adress de livraison "Canada"
 When je saisie un commentaire "paiement"
 And  je verifie le prix total
 And je clique sur le bouton "Place Order"
 Then je me rederige vers la page de paiement ou "Payment" s affiche 
 And je saisie les informations de la carte "" "" "" "" ""
 And je clique sur le bouton Pay and Confirm Order
 Then je me rederige vers la page de confirmation ou "Congratulations! Your order has been confirmed!" s affiche 