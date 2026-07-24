import { Locator, Page } from "@playwright/test";
import { StringDecoder } from "node:string_decoder";
import { BasePage } from "./basePage";

export class PanierPage extends BasePage {
  readonly btnProduits: Locator;
  readonly premierProduit: Locator;
  readonly btnAddCart: Locator;
  readonly modaleConfirmation: Locator;
  readonly messageConfirmation: Locator;
  readonly viewCart: Locator;
  readonly produitPanier: Locator;
  readonly descriptionProduit: Locator;
  readonly prixProduitPanier: Locator;
  readonly btnAddToCart: Locator;
  readonly quantite: Locator;
  readonly quantitePanier: Locator;
  readonly cartPrixTotal: Locator;
  readonly btnSupprimerProduit: Locator;
  readonly messageCartVide: Locator;

  constructor(page: Page) {
    super(page);
    this.btnProduits = page.getByRole("link", { name: "Products" });
    this.premierProduit = page.locator(".features_items .col-sm-4").first();
    this.btnAddCart = page
      .locator("a")
      .filter({ hasText: "Add to cart" })
      .first();
    this.modaleConfirmation = page.locator('#cartModal .modal-content');
    this.messageConfirmation = page.getByText(
      "Added!",
    );
    this.viewCart = page.getByText('View Cart');
    this.produitPanier= page.locator('#cart_info_table tbody tr');
    this.descriptionProduit= page.locator('.cart_description h4 a');
    this.prixProduitPanier= page.locator ('#cart_info_table tbody tr td.cart_price p')
    this.btnAddToCart=page.getByRole('button', ({name: 'Add to cart'}));
    this.quantite= page.locator('#quantity');
    this.quantitePanier=page.locator('#cart_info_table tbody tr td.cart_quantity button');
    this.cartPrixTotal=page.locator('#cart_info_table tbody tr td.cart_total p.cart_total_price');
    this.btnSupprimerProduit = page.locator('#cart_info_table tbody tr td.cart_delete a');
    this.messageCartVide = page.locator('p:has-text("Cart is empty")');
  }
  async cliquerLeProduit(): Promise<void> {
    await this.btnProduits.click();
  }

  async survolerLePremierProduit(): Promise<void> {
    await this.premierProduit.hover();
  }

  async cliquerSurAddToCart(): Promise<void> {
    await this.btnAddCart.click();
  }

  async getMessageConfirmation(): Promise<string> {
    return await this.getTextContent(this.modaleConfirmation);
  }

  async cliquerViewCart():Promise <void> {
   await this.viewCart.click();

  }
  async recuprerNumProduitsPanier():Promise <number> {
   return await this.produitPanier.count();
  }

  async recuprerNomproduitPanier():Promise <string> {

   return await this.produitPanier.textContent()?? '';
  }

  async getNomProduitPanier():Promise <string> {
    return await this.getTextContent(this.descriptionProduit);
  }


  async getprix(): Promise <string> {
  return await this.getTextContent(this.prixProduitPanier.first());
}
 async cliquerbtnAddToCart(): Promise <void> {
 await this.btnAddToCart.click();
 }

async ajouterquantite(qte : number ):Promise <void> {
  await this.quantite.clear();
  await this.quantite.fill(String(qte));
}

async getcartQte(): Promise <number> {
  const qte = await this.quantitePanier.first().textContent() ?? '0';
  return parseInt(qte.trim());
}

async getPrixTotal(): Promise <string> {
  return await this.getTextContent(this.cartPrixTotal.first());
}

async cliquerBtnSupprimerProduit(): Promise<void> {
  await this.btnSupprimerProduit.first().click();
}

async estPanierVide(): Promise<boolean> {
  try {
    return await this.messageCartVide.isVisible({ timeout: 1000 });
  } catch {
    return false;
  }
}

async getNomProduitParIndex(index: number): Promise<string> {
  const produit = this.produitPanier.nth(index).locator('.cart_description h4 a');
  return await this.getTextContent(produit);
}


}
