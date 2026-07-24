import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class DeconnexionPage extends BasePage {
  readonly logoutLink: Locator;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.locator("a:has-text('Logout')");
    this.signupLoginLink = page.locator("a:has-text('Signup / Login')");
  }

  async cliquerLogout(): Promise<void> {
    await this.logoutLink.click();
  }



  getLienNavbar(lienTexte: string): Locator {
    return this.page.locator(`a:has-text('${lienTexte}')`);
  }
}
