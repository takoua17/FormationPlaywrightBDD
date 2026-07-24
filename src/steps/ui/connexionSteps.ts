import { Given, Then, When } from "@cucumber/cucumber";
import { ConnexionPage } from "../../pages/connexionPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let loginPage: ConnexionPage;

Given("je suis sur la page de connexion", async function () {
  loginPage = new ConnexionPage(pageFixture.page);
  await loginPage.navigate();
});

When("je saisie mon login {string}", async function (email) {
  await loginPage.accepterPopup();
  //await loginPage.saisirEmail(email);
  await loginPage.saisirEmailWithEnv()
});

When("je saisie mon mot de passe {string}", async function (pass) {
  await loginPage.accepterPopup();
  //await loginPage.saisirPassword(pass);
  await loginPage.saisirPassWithEnv();
});

When("je clique sur le bouton connexion", async function () {
  await loginPage.accepterPopup();
  await loginPage.cliquerLogin();
});

Then(
  "je me rederige vers la page d'acceuil et {string} s affiche",
  async function (resultatAttendu) {
    await loginPage.accepterPopup();
    const textObtenu = await loginPage.getLoggedUsername();
    await expect(textObtenu).toContain(resultatAttendu);
  },
);

Then("un message d erreur s affiche {string}", async function (erreurAtten) {
  if (erreurAtten == "Your email or password is incorrect!") {
    await expect(loginPage.messagederreurincorrect).toBeVisible();
    await expect(loginPage.getMessageIncorrect()).toContain(erreurAtten);
  } else {
    await expect(loginPage.getEmailVide).toContain(
      erreurAtten,
    );
  }
});

