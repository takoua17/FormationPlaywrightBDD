
import { CompteApi } from "../../api/compteApi";
import { Before, Given, Then, When } from "@cucumber/cucumber";
import { APIRequestContext, expect, request } from "@playwright/test";
import "dotenv/config";

let apiContext: APIRequestContext;
let compteApi: CompteApi;
let testEmail: string;
let testPassword: string;
let listeData: {
  name: string;
  email: string;
  password: string;
  title: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
};
let response: any;

Before({ tags: "@apiCompte" }, async function () {
  // créer un client http indépendant
  apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL,
  });
  // instancier la classe compte api
  compteApi = new CompteApi(apiContext);
});

Given("l'api automatisation exercice est disponible", async function () {
  const response = await apiContext.get(
    `${process.env.API_BASE_URL}/productsList`,
  );
  expect(response.status()).toBe(200);
  console.log("Api disponible");
});
Given("un mail unique doit être génere", async function () {
  testEmail = `uptotest_${Date.now()}@gmail.com`;
  testPassword = "testget";

  listeData = {
    name: "syrine",
    email: testEmail,
    password: testPassword,
    title: "Mr",
    firstname: "sirine",
    lastname: "korbi",
    company: "TestCompany",
    address1: "123 Test Street",
    address2: "",
    country: "France",
    zipcode: "75000",
    state: "Ile-de-France",
    city: "Paris",
    mobile_number: "0600000000",
  };
  console.log("email génere", testEmail);
});

When("je creer le compte avec les données génerees", async function () {
  response = await compteApi.creerCompte(listeData);
});

Then(
  "le code de reponse devrait être {int}",
  async function (codeAttendu: number) {
    const body = await compteApi.parseReponse(response);
    console.log(body);
    expect(body.code).toBe(codeAttendu);
  },
);
Then(
  "le message de reponse devrait être {string}",
  async function (messageAttendu: string) {
    const body = await compteApi.parseReponse(response);
    console.log(body);
    expect(body.message).toBe(messageAttendu);
  },
);

When("je récupere les détails du compte par emaiil", async function () {
  response = await compteApi.getUserEmail(testEmail, testPassword);
  console.log("retour read", response.status());
});

Then(
  "les détails devraient contenir le nom de l'utilisateur",
  async function () {
    const body = await compteApi.parseReponse(response);
    expect(body.user).toBeDefined();
    expect(body.user.name).toBeDefined();
    expect(body.user.email).toBe(testEmail);
    console.log(`user.name: ${body.user.name}`);
    console.log(`user.name: ${body.user.email}`);
  },
);

When(
  "je mets à jour le nom du compte avec {string}",
  async function (newName: string) {
    const updateData = {
      ...listeData,
      name: newName,
    };

    response = await compteApi.updateCompte(updateData);
    console.log(`put new name : ${newName}`);
    console.log("retour updated", response.status());
  },
);

When("je supprime le compte", async function () {
  response = await compteApi.deleteAccount(testEmail,testPassword);
  console.log(response.status());
});
