import { Page, Locator } from "@playwright/test";

class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  node(dataTest: string): Locator {
    return this.page.locator(`[data-test=${dataTest}]`);
  }
}

export default BasePage;
