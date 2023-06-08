import { Page, Locator, expect } from "@playwright/test";

class LoginPage {
  private page: Page;
  readonly txtLogin: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;
  readonly msgError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtLogin = page.locator("[data-test=username]");
    this.txtPassword = page.locator("[data-test=password]");
    this.btnLogin = page.locator("[data-test=login-button]");
    this.msgError = page.locator("[data-test=error]");
  }

  async goToLoginPage() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.txtLogin.fill(username);
    await this.txtPassword.fill(password);
    await this.btnLogin.click();
  }

  async verifyErrorMessage(message: string) {
    await expect(this.msgError).toBeVisible();
    await expect(this.msgError).toHaveText(message);
  }
}

export default LoginPage;
