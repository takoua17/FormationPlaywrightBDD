import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProduitPage extends BasePage {
  readonly productList: Locator;
  readonly productItems: Locator;
  readonly searchBox : Locator;
  readonly searchButton: Locator;
  readonly premierProduit: Locator;
  readonly nomProduit: Locator;
  readonly prixProduit: Locator;
  readonly descriptionProduit: Locator;

  constructor(page: Page) {
    super(page);
    this.productList = page.locator(".features_items");
    this.productItems = page.locator(".features_items .col-sm-4");
    this.searchBox= page.getByPlaceholder('Search Product');
    this.searchButton= page.locator('#submit_search');
    this.premierProduit= page.locator('.features_items .col-sm-4').first();
    this.nomProduit= page.locator('.product-information h2');
    this.prixProduit = page.locator('.product-information span span');
    this.descriptionProduit = page.locator('.product-information p').first();
  }
  async ouvrirUrl(): Promise<void> {
    await this.page.goto("/products");
  }

  async getNbrProduits(): Promise<number> {
    return await this.productItems.count();
  } 


async SaisirProduit(nameProduct: string): Promise <void> {
await this.searchBox.fill(nameProduct);
await this.searchButton.click();
}

async rechercheProduit (): Promise <string[]> {

  const nombre= await this.productItems.count();
  const produitRecherche : string []= [];
   for(let i=0; i<nombre; i++) {
      const text = await this.productItems.nth(i).locator('.productinfo p').textContent()?? '';
    await produitRecherche.push(text.toLowerCase().trim());
 }
 return await produitRecherche;
   }

 async cliquerPremierProduit():Promise <void> {
  await this.premierProduit.locator('a[href*="product_details"]').click();
 }

 async getNomProduit():Promise <string>{
 return await this.getTextContent(this.nomProduit);
 }

async getPrixProduit():Promise <string>{
 return await this.getTextContent(this.prixProduit);
 }


}





