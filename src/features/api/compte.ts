import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

Given(`l'api automatisation exercice est disponible`, () => {
    // [Given] Sets up the initial state of the system.
});

Given(`un mail unique doit être génere`, () => {
    // [Given] Sets up the initial state of the system.
});

When(`je creer le compte avec les données génerees`, () => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`le code de reponse devrait être {int}`, (arg0: number) => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`le message de reponse devrait être {string}`, (arg0: string) => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`je récupere les détails du compte par emaiil`, () => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`les détails devraient contenir le nom de l'utilisateur`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`je mets à jour le nom du compte avec {string}`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});

When(`je supprime le compte`, () => {
    // [When] Describes the action or event that triggers the scenario.
});