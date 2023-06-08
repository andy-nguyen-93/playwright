import { Page, Locator } from "@playwright/test";

class InventoryPage {
  private page: Page;
  readonly btnsAddToCart: Locator;
  readonly lnkShoppingCart: Locator;
  readonly lblsItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnsAddToCart = page.locator(".btn_inventory");
    this.lnkShoppingCart = page.locator(".shopping_cart_link");
    this.lblsItemName = page.locator(".inventory_item_name");
  }
}

export default InventoryPage;
