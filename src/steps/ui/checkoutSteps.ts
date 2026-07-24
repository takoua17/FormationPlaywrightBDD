import { Then, When } from "@cucumber/cucumber";
import { CheckoutPage } from "../../pages/checkoutPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let checkoutPage: CheckoutPage;
When("je clique sur le bouton proceed to checkout", async function () {
  checkoutPage = new CheckoutPage(pageFixture.page);
  await checkoutPage.cliquerBtnCheckout();
});

Then(
  "je me rederige vers la page ou {string} s affiche",
  async function (string) {
    const texte = await checkoutPage.getAdressDetails();
    await expect(texte).toContain(string);
  },
);

Then(
  "je devrais voir mon adress de livraison {string}",
  async function (string) {
    const text= await checkoutPage.getAdressLivraison();
    await expect(text).toContain(string);
  },
);

When("je saisie un commentaire {string}", async function (string) {
  await checkoutPage.saisirCommentaire(string);
});

When("je verifie le prix total", async function () {
  const prixunittext = await checkoutPage.getPrixUnitaire();
  const qtetext = await checkoutPage.getQuantite();
  const prixTotaltext = await checkoutPage.getPrixTotal();

  const extractPrix = (text: string): number => {
    return parseInt(text.replace("Rs.", "").trim());
  };

  const prixUnitaire = await extractPrix(prixunittext);
  const quantite = await parseInt(qtetext);
  const prixTotal = await extractPrix(prixTotaltext);

  expect(prixTotal).toBe(prixUnitaire * quantite);
});

When("je clique sur le bouton {string}", async function (string) {
  await checkoutPage.cliquerBtnPlaceOrder();
});

Then(
  "je me rederige vers la page de paiement ou {string} s affiche",
  async function (string) {
    const messagePaiement = await checkoutPage.getMsgPaiement();
    expect(messagePaiement).toContain(string);
  },
);

Then(
  "je saisie les informations de la carte {string} {string} {string} {string} {string}",
  async function (nom, numcarte, cvc, mois, annee) {
    await checkoutPage.remplirInfoCarte(nom, numcarte, cvc, mois, annee);
  },
);

Then("je clique sur le bouton Pay and Confirm Order", async function () {
  await checkoutPage.cliquerBtnPay();
});

Then(
  "je me rederige vers la page de confirmation ou {string} s affiche",
  async function (string) {
  const msg= await checkoutPage.getMessagePaiement();
  expect(msg).toContain(string);
  },
);
