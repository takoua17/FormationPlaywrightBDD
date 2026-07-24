@connexion
Feature: connexion a l application automation Excerice

  @connexionValide
  Scenario: connexion avec des coordonnes valides
    Given je suis sur la page de connexion
    When je saisie mon login ""
    And je saisie mon mot de passe ""
    And je clique sur le bouton connexion
    Then je me rederige vers la page d'acceuil et "Logged in as" s affiche

  @connexionInvalide
  Scenario Outline: connexion avec des coordonnes invalides
    Given je suis sur la page de connexion
    When je saisie mon login "<email>"
    And je saisie mon mot de passe "<pass>"
    And je clique sur le bouton connexion
    Then un message d erreur s affiche "<msg erreur >"

    Examples:
      | email                    | pass      | msg erreur                           |
      | bejaowitakoua2gmail.com  | Takoua123 | Your email or password is incorrect! |
      | bejaouitakoua2@gmail.com | Takoua    | Your email or password is incorrect! |
      |                          |           | Veuillez renseigner ce champ.        |
