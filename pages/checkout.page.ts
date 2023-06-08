import { Page, Locator, expect } from "@playwright/test";
import { Message } from "../utils/enums.utils";

class CheckoutPage {
  private page: Page;
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtPostalCode: Locator;
  readonly btnContinue: Locator;
  readonly btnFinish: Locator;
  readonly icoSuccess: Locator;
  readonly lblCompleteHeader: Locator;
  readonly lblCompleteText: Locator;
  readonly btnBackHome: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtFirstName = page.locator("[data-test=firstName]");
    this.txtLastName = page.locator("[data-test=lastName]");
    this.txtPostalCode = page.locator("[data-test=postalCode]");
    this.btnContinue = page.locator("[data-test=continue]");
    this.btnFinish = page.locator("[data-test=finish]");
    this.icoSuccess = page.locator(".pony_express");
    this.lblCompleteHeader = page.locator(".complete-header");
    this.lblCompleteText = page.locator(".complete-text");
    this.btnBackHome = page.locator("[data-test=back-to-products]");
  }

  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.txtFirstName.fill(firstName);
    await this.txtLastName.fill(lastName);
    await this.txtPostalCode.fill(postalCode);
    await this.btnContinue.click();
    await this.btnFinish.click();
  }

  async verifyCheckoutSuccessfully() {
    await expect(this.icoSuccess).toBeVisible();
    await expect(this.lblCompleteHeader).toBeVisible();
    await expect(this.lblCompleteHeader).toHaveText(Message.ORDER_COMPLETE);
    await expect(this.lblCompleteText).toBeVisible();
    await expect(this.lblCompleteText).toHaveText(Message.ORDER_INFORMATION);
    await expect(this.btnBackHome).toBeVisible();
    await expect(this.btnBackHome).toBeEnabled();
  }
}

export default CheckoutPage;
