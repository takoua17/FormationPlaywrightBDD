@logout
Feature: deconnexion de l application automation Exercise

  Background:
    Given je suis sur la page de connexion
    When je saisie mon login ""
    And je saisie mon mot de passe ""
    And je clique sur le bouton connexion
    Then je me rederige vers la page d'acceuil et "Logged in as" s affiche

  @logoutValide 
  Scenario: deconnexion d un utilisateur connecte
    When je clique sur le lien deconnexion
    Then je me rederige vers la page de connexion
    And le lien "Signup / Login" s affiche dans la navbar
    And le lien "Logout" n apparait plus dans la navbar