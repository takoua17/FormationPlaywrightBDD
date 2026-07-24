import { Locator, Page } from "@playwright/test";
import 'dotenv/config';
import { config } from "../config/configLoader";
import { BasePage } from "./basePage";

export class ConnexionPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly btnLogin: Locator;
  readonly logged: Locator;
  readonly messagederreurincorrect :Locator;
  
  

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.btnLogin = page.locator ('[data-qa="login-button"]');
    this.logged = page.locator('li').filter({hasText:'Logged in as'});
    this.messagederreurincorrect =page.getByText('Your email or password is incorrect!');
  }

 // navigation
 async navigate ():Promise <void> {
    await this.page.goto('/login');
 }

 async saisirEmail (email : string) : Promise <void> {
    await this.emailInput.fill(email);
 }
 
 async saisirPassword (pass : string) : Promise <void> {
    await this.passwordInput.fill (pass);
 }

 async cliquerLogin () : Promise <void> {
    await this.btnLogin.click();
 }

 async getLoggedUsername() : Promise <string> {
    return await this.getTextContent(this.logged);
 } 

// Lire avec les crendetials depuis .env
async saisirEmailWithEnv() : Promise <void> {
   //await this.emailInput.fill(process.env.USER_EMAIL || 'bejaouitakoua2@gmail.com');
   await this.emailInput.fill(config.user.admin.login);
}

async saisirPassWithEnv() : Promise <void> {
  // await this.passwordInput.fill(process.env.USER_PASSWORD || 'Takoua123');
     await this.passwordInput.fill(config.user.admin.password);

}

async getMessageIncorrect() : Promise <string> {
    return await this.getTextContent(this.messagederreurincorrect);
 }

async getEmailVide(): Promise <string> {
 return await this.emailInput.evaluate((elm) => {
      return (elm as HTMLInputElement).validationMessage;
 }
 );
}

}

