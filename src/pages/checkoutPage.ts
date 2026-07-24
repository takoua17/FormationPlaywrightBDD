import { Locator, Page } from "@playwright/test";
import { config } from "../config/configLoader";
import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {
  readonly btnCheckout: Locator;
  readonly messageAdressDetails: Locator;
  readonly addressLivraison: Locator;
  readonly BoxCommentaire: Locator;
  readonly prixUnitaire: Locator;
  readonly quantite: Locator;
  readonly prixTotal: Locator;
  readonly btnPlaceOrder: Locator;
  readonly msgPaiement: Locator;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expiration: Locator;
  readonly annee: Locator;
  readonly btnPay: Locator;
  readonly messageOrderConfirmation;

  constructor(page: Page) {
    super(page);
    this.btnCheckout = page.locator(".btn.btn-default.check_out");
    this.messageAdressDetails = page.locator("h2.heading");
    this.addressLivraison = page.locator('#address_delivery li.address_country_name');      
    this.BoxCommentaire = page.locator('textarea[name="message"]');
    this.prixUnitaire = page.locator("#cart_info tbody tr td.cart_price p");
    this.quantite = page.locator("#cart_info tbody tr td.cart_quantity button");
    this.prixTotal = page.locator(
      "#cart_info tbody tr:nth-child(2) td p.cart_total_price",
    );
    this.btnPlaceOrder = page.getByRole("link", { name: "Place Order" });
    this.msgPaiement = page.getByRole("heading", { name: "Payment" });
    this.nameOnCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]')
    this.cvc = page.getByPlaceholder('ex. 311');
    this.expiration = page.getByPlaceholder('MM')
    this.annee = page.getByPlaceholder('YYYY');
    this.btnPay = page.getByRole('button', { name: 'Pay and Confirm Order' })
    this.messageOrderConfirmation = page.getByText('Congratulations! Your order has been confirmed!');
  }

  async cliquerBtnCheckout(): Promise<void> {
    await this.btnCheckout.click();
  }

  async getAdressDetails(): Promise<string> {
    return await this.getTextContent(this.messageAdressDetails.first());
  }

  async getAdressLivraison(): Promise<string> {
    return await this.getTextContent(this.addressLivraison);
  }

  async saisirCommentaire(commentaire: string): Promise<void> {
    await this.BoxCommentaire.fill(commentaire);
  }

  async getQuantite(): Promise<string> {
    return await this.getTextContent(this.quantite);
  }

  async getPrixUnitaire(): Promise<string> {
    return await this.getTextContent(this.prixUnitaire);
  }

  async getPrixTotal(): Promise<string> {
    return await this.getTextContent(this.prixTotal);
  }

  async cliquerBtnPlaceOrder(): Promise<void> {
    await this.btnPlaceOrder.click();
  }

  async getMsgPaiement(): Promise<string> {
    return await this.getTextContent(this.msgPaiement);
  }

  async remplirInfoCarte(
    nom: string,
    numeroCarte: string,
    cvc: string,
    mois: string,
    annee: string,
  ): Promise<void> {
    //await this.nameOnCard.fill(nom);
   //await this.nameOnCard.fill(process.env.NAME_CARD || 'BEJAOUI');

    await this.nameOnCard.fill(config.payment.cardName);

  //  await this.cardNumber.fill(numeroCarte);
 // await this.cardNumber.fill(process.env.NUM_CARD || '123450980');

     await this.cardNumber.fill(config.payment.cardNumber);

   // await this.cvc.fill(cvc);
   //  await this.cvc.fill(process.env.CVC_CARD || '260');
       await this.cvc.fill(config.payment.cvc);


   // await this.expiration.fill(mois);
    // await this.expiration.fill(process.env.MOIS_CARD || '02');
     await this.expiration.fill(config.payment.MoisCard);



  //  await this.annee.fill(annee);
    // await this.annee.fill(process.env.ANNEE_CARD || '2090');
 await this.annee.fill(config.payment.AnneeCard);

  }






  async getMessagePaiement(): Promise<string> {
    return await this.getTextContent(this.messageOrderConfirmation);
  }


  async cliquerBtnPay(): Promise<void> {
    await this.btnPay.click();
  }

}
