import { Page, Locator, expect } from "@playwright/test";
import { Sort, Txt } from "../utils/enums.utils";

class InventoryPage {
  private page: Page;
  readonly btnsAddToCart: Locator;
  readonly lnkShoppingCart: Locator;
  readonly lblsItemName: Locator;
  readonly lblLogo: Locator;
  readonly lblActiveOption: Locator;
  readonly ctnInventory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnsAddToCart = page.locator(".btn_inventory");
    this.lnkShoppingCart = page.locator(".shopping_cart_link");
    this.lblsItemName = page.locator(".inventory_item_name");
    this.lblLogo = page.locator(".app_logo");
    this.lblActiveOption = page.locator(".active_option");
    this.ctnInventory = page.locator(".inventory_list");
  }

  async addItemToCart(itemIndex: number) {
    await this.btnsAddToCart.nth(itemIndex).click();
  }

  async getItemName(itemIndex: number) {
    return await this.lblsItemName.nth(itemIndex).textContent();
  }

  async validateUI() {
    await expect(this.lblLogo).toHaveText(Txt.LOGO);
    await expect(this.lblActiveOption).toHaveText(Sort.NAME_ASC);
    await expect(this.ctnInventory).toBeVisible();
  }
}

export default InventoryPage;
