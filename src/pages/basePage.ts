import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Accepte les popups qui apparaissent sur la page
   * Utilise le XPath standard du site d'automation exercise
   */
  async accepterPopup(): Promise<void> {
    try {
      const popup = this.page.locator('xpath=/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]/p');
      await popup.waitFor({ state: "visible", timeout: 500 });
      await popup.click();
    } catch (e) {
      // Pas de popup, continuer
    }
  }

  /**
   * Récupère le contenu textuel d'un locateur
   * @param locator - Le locateur cible
   * @returns Le texte trimé ou une chaîne vide
   */
  async getTextContent(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? "";
  }

  /**
   * Vérifie si un élément est visible
   * @param locator - Le locateur cible
   * @returns true si l'élément est visible, false sinon
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }
}
