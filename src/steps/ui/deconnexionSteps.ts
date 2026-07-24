import { Then, When } from "@cucumber/cucumber";
import { DeconnexionPage } from "../../pages/deconnexionPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let deconnexionPage: DeconnexionPage;

When("je clique sur le lien deconnexion", async function () {
  deconnexionPage = new DeconnexionPage(pageFixture.page);
  await deconnexionPage.accepterPopup();
  await deconnexionPage.cliquerLogout();
});

Then("je me rederige vers la page de connexion", async function () {
  await deconnexionPage.accepterPopup();
  const urlActuelle = pageFixture.page.url();
  await expect(urlActuelle).toContain("login");
});

Then("le lien {string} s affiche dans la navbar", async function (lienTexte) {
  deconnexionPage = new DeconnexionPage(pageFixture.page);
  await deconnexionPage.accepterPopup();
  const lien = deconnexionPage.getLienNavbar(lienTexte);
  await expect(lien).toBeVisible();
});

Then("le lien {string} n apparait plus dans la navbar", async function (lienTexte) {
  deconnexionPage = new DeconnexionPage(pageFixture.page);
  await deconnexionPage.accepterPopup();
  const lien = deconnexionPage.getLienNavbar(lienTexte);
  await expect(lien).not.toBeVisible();
});
