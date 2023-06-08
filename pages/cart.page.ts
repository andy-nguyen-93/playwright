import { Page, Locator } from "@playwright/test";

class CartPage {
  private page: Page;
  readonly btnCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnCheckout = page.locator("[data-test=checkout]");
  }
}

export default CartPage;
