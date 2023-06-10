import { chromium } from "@playwright/test";
import { Account, Password } from "./enums.utils";

async function globalSetup() {
  // Initialize context
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Save guest state to 'noLoginState.json'
  await page.context().storageState({ path: "states/noLoginState.json" });

  // Log in with standard_user
  await page.goto("https://www.saucedemo.com");
  await page.locator("[data-test=username]").fill(Account.STANDARD);
  await page.locator("[data-test=password]").fill(Password.ALL);
  await page.locator("[data-test=login-button]").click();

  // Save standard_user state to 'standardUserState.json'
  await page.context().storageState({ path: "states/standardUserState.json" });

  // Close context
  await browser.close();
}
export default globalSetup;
