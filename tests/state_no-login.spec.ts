import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Message, Site, Url } from "../utils/enums.utils";
import { customTest } from "../fixtures/data.fixture";
import InventoryPage from "../pages/inventory.page";

test.describe("Test Cases With No Login State", () => {
  test.use({ storageState: "states/noLoginState.json" });

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test("NL-01. Validate that user cannot access to inventory page without authentication", async ({
    page,
  }) => {
    // Initialize login page
    loginPage = new LoginPage(page);

    // Go to inventory page
    await page.goto("/inventory.html");

    // Validate error message
    await loginPage.verifyErrorMessage(Message.REQUIRE_LOGIN);
  });

  for (const url of Object.values(Url)) {
    test(`NL-02. Validate that user cannot access to ${url} without authentication`, async ({
      page,
    }) => {
      // Initialize login page
      loginPage = new LoginPage(page);

      // Go to inventory page
      await page.goto(url);

      // Validate error message
      await loginPage.verifyErrorMessage(
        Message.REQUIRE_LOGIN_FIRST + url + Message.REQUIRE_LOGIN_LAST
      );
    });
  }

  customTest(
    "NL-03. Validate that standard user can logout",
    async ({ page, standard_user }) => {
      // Initialize login page
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);

      // Go to login page
      await loginPage.goto();

      // Login with standard user
      await loginPage.login(standard_user.username, standard_user.password);

      // Logout
      await inventoryPage.logout();

      // Validate that user logout successfully
      await expect(page).toHaveURL(Site.SAUCE_DEMO);
    }
  );
});
