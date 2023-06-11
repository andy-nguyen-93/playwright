import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./base.page";

class LoginPage extends BasePage {
  protected page: Page;
  readonly txtLogin: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;
  readonly msgError: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.txtLogin = this.node("username");
    this.txtPassword = this.node("password");
    this.btnLogin = this.node("login-button");
    this.msgError = this.node("error");
  }

  async goto() {
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
