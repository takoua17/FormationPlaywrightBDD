import { Page } from "@playwright/test";
import { ProduitPage } from "../pages/produitPage";

export const pageFixture = {
  //@ts-ignore
  page: undefined as Page,
  //@ts-ignore
  produitPage: undefined as ProduitPage,
  //@ts-ignore
  countBefore: undefined as number,
};
