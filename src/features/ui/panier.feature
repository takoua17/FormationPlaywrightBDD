@panier
Feature:gestion du panier

  Background:
    Given je suis sur la page de connexion
    When je saisie mon login ""
    And je saisie mon mot de passe ""
    And je clique sur le bouton connexion
    Then je me rederige vers la page d'acceuil et "Logged in as" s affiche

@ajouterPanier
Scenario: ajout produit
When je clique sur le produit 
And je survole le premier produit 
And je clique sur add to cart
Then une confirmaton d ajout devrait s afficher 
When je clique sur le bouton view cart 
Then le panier devrait contenir 1 produit
And je devrais voir le produit dans le panier
And le panier devrait contenir un prix valide 

@ajouterdepuisdetails
Scenario: ajout depuis details
When je clique sur le produit 
When je clique sur le premier produit 
Then je devrais voir le nom du produit 
And je clique sur le bouton Add to cart
Then une confirmaton d ajout devrait s afficher 
When je clique sur le bouton view cart 
Then le panier devrait contenir 1 produit
And je devrais voir le produit dans le panier
And le panier devrait contenir un prix valide 

@ajouteravecquantite
Scenario: ajouter plusieurs unites d un produit depuis la page detaille

When je clique sur le produit 
When je clique sur le premier produit 
Then je devrais voir le nom du produit 
When je change la quantite 3
And je clique sur le bouton Add to cart
Then une confirmaton d ajout devrait s afficher 
When je clique sur le bouton view cart 
Then je verifie la quantite dans le panier devrait etre 3
And le prix total devrait etre au prix unitaire multiplier par 3