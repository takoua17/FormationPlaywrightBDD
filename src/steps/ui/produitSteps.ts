import { Given, Then, When } from "@cucumber/cucumber";
import { ProduitPage } from "../../pages/produitPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";



Given("je suis sur la page des produit", async function () {
  pageFixture.produitPage = new ProduitPage(pageFixture.page);
  await pageFixture.produitPage.ouvrirUrl();
  await pageFixture.produitPage.accepterPopup();
});

Then("je devrais voir une liste produits", async function () {
  await expect(pageFixture.produitPage.productList).toBeVisible();
});

Then(
  "le nombre de produits affiche devrait etre superieur a {int}",
  async function (nombre: number) {
    const nb = await pageFixture.produitPage.getNbrProduits();
    expect(nb).toBeGreaterThan(nombre);
  },
);

When("je saisie le produit {string}", async function (name) {
  await pageFixture.produitPage.SaisirProduit(name);
});

Then("je devrais voir des resultats de recherche", async function () {});

Then(
  "je devrais consulter le mot cherche {string}",
  async function (nom: string) {
    const listObtenu = await pageFixture.produitPage.rechercheProduit();
    for (const text of listObtenu) {
      expect(text).toContain(nom.toLowerCase());
    }
  },
);

When("je clique sur le premier produit", async function () {
  await pageFixture.produitPage.cliquerPremierProduit();
});

Then("je devrais voir le nom du produit", async function () {
  const nomProduit = await pageFixture.produitPage.getNomProduit();
  await expect(nomProduit.length).toBeGreaterThan(0);
});

Then("je devrais voir le prix du produit", async function () {
  const prixProduit = await pageFixture.produitPage.getPrixProduit();
  await expect(prixProduit).toContain("Rs.");
});

Then("je devrais voir le detail du produit", async function () {
  await expect(pageFixture.produitPage.descriptionProduit).toBeVisible();
});
