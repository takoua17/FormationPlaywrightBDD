import { Then, When } from "@cucumber/cucumber";
import { PanierPage } from "../../pages/panierPage";
import { pageFixture } from "../../support/pageFixture";
import { expectFailure } from "node:test";
import { expect } from "@playwright/test";
import { ProduitPage } from "../../pages/produitPage";

let panierPage: PanierPage;

When("je clique sur le produit", async function () {
  panierPage = new PanierPage(pageFixture.page);
  pageFixture.produitPage = new ProduitPage(pageFixture.page);
  await panierPage.cliquerLeProduit();
});

When("je survole le premier produit", async function () {
  await panierPage.survolerLePremierProduit();
});

When("je clique sur add to cart", async function () {
  await panierPage.cliquerSurAddToCart();
});

Then("une confirmaton d ajout devrait s afficher", async function () {
  await expect(panierPage.modaleConfirmation).toBeVisible();
  const modaltext = (await panierPage.modaleConfirmation.textContent()) ?? "";
  await expect(modaltext).toContain("Added!");
});

When("je clique sur le bouton view cart", async function () {
  await panierPage.cliquerViewCart();
});

Then(
  "le panier devrait contenir {int} produit",
  async function (nombre: number) {
    const count = await panierPage.recuprerNumProduitsPanier();
    await expect(count).toBe(nombre);
  },
);

Then("je devrais voir le produit dans le panier", async function () {
  await expect(panierPage.descriptionProduit).toBeVisible();
});

Then("le panier devrait contenir un prix valide", async function () {
  const prix = await panierPage.getprix();
  expect(prix).toContain("Rs");
});

Then("je clique sur le bouton Add to cart", async function () {
  await panierPage.cliquerbtnAddToCart();
});

When("je change la quantite {int}", async function (int: number) {
  await panierPage.ajouterquantite(int);
});

Then(
  "je verifie la quantite dans le panier devrait etre {int}",
  async function (qtepanier: number) {
    const qtePanier = await panierPage.getcartQte();
    expect(qtePanier).toBe(qtepanier);
  },
);

Then(
  "le prix total devrait etre au prix unitaire multiplier par {int}",
  async function (qteprod: number) {
const prixuniaireText= await panierPage.getprix();
const prixTotalText= await panierPage.getPrixTotal();

const extractPrix = (text: string):  number => {
   return parseInt(text.replace('Rs.', '').trim());
}
  
const prixunitaire = await extractPrix(prixuniaireText);
const prixTotal = await extractPrix(prixTotalText);
await expect (prixTotal).toBe(prixunitaire*qteprod);

  },
);

When("je clique sur le bouton supprimer le produit", async function () {
  panierPage = new PanierPage(pageFixture.page);
  const countBefore = await panierPage.recuprerNumProduitsPanier();
  pageFixture.countBefore = countBefore;
  await panierPage.cliquerBtnSupprimerProduit();
});

Then("le produit devrait etre supprime du panier", async function () {
  panierPage = new PanierPage(pageFixture.page);
  const countAfter = await panierPage.recuprerNumProduitsPanier();
  await expect(countAfter).toBe(pageFixture.countBefore - 1);
});

Then("le panier devrait etre vide", async function () {
  panierPage = new PanierPage(pageFixture.page);
  const isEmpty = await panierPage.estPanierVide();
  await expect(isEmpty).toBe(true);
});

Then("le produit supprime ne devrait plus figurer dans le panier", async function () {
  panierPage = new PanierPage(pageFixture.page);
  // Vérifier que le nombre de produits a diminué
  const countAfter = await panierPage.recuprerNumProduitsPanier();
  await expect(countAfter).toBe(pageFixture.countBefore - 1);
});
