import { Page, Locator } from "@playwright/test";

class CartPage {
  private page: Page;
  readonly btnCheckout: Locator;
  readonly lblsItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnCheckout = page.locator("[data-test=checkout]");
    this.lblsItemName = page.locator(".inventory_item_name");
  }
}

export default CartPage;
