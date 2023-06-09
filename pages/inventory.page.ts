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

  async addItemToCart(itemIndex: number) {
    await this.btnsAddToCart.nth(itemIndex).click();
  }

  async getItemName(itemIndex: number) {
    return await this.lblsItemName.nth(itemIndex).textContent();
  }
}

export default InventoryPage;
