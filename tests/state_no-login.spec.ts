import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Account, Message, Password, Site, Url } from "../utils/enums.utils";
import { customTest } from "../fixtures/data.fixture";
import InventoryPage from "../pages/inventory.page";
import AxeBuilder from "@axe-core/playwright";
import CartPage from "../pages/cart.page";
import { faker } from "@faker-js/faker";
import CheckoutPage from "../pages/checkout.page";

test.describe("Test Cases With No Login State", () => {
  test.use({ storageState: "states/noLoginState.json" });

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    // Initialize login page
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test("NL-01. Validate that user cannot access to inventory page without authentication", async ({
    page,
  }) => {
    // Go to inventory page
    await page.goto("/inventory.html");

    // Validate error message
    await loginPage.verifyErrorMessage(Message.REQUIRE_LOGIN);
  });

  for (const url of Object.values(Url)) {
    test(`NL-02. Validate that user cannot access to ${url} without authentication`, async ({
      page,
    }) => {
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

  test("NL-04. Accessibility Testing", async ({ page }, testInfo) => {
    // Go to login page
    await loginPage.goto();

    // Analyze the page with axe
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Attached the violations to the test report
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults.violations, null, 2),
      contentType: "application/json",
    });

    // Violations are not empty
    expect(accessibilityScanResults.violations).not.toEqual([]);

    /* Console log the violations ()

      const violation = accessibilityScanResults.violations;
      violation.forEach(function (entry) {
        console.log(entry.impact + " " + entry.description);
      });

    */

    /* Expect violations to be empty (Currently commented because SauceDemo is not designed for accessibility test)

      expect(accessibilityScanResults.violations).toEqual([]);

    */
  });

  test("NL-05. Visual Testing", async ({ page }) => {
    // Test visual of login page
    await loginPage.goto();
    await expect(page).toHaveScreenshot({ fullPage: true });

    // Test visual of inventory page
    await loginPage.login(Account.STANDARD, Password.ALL);
    await expect(page).toHaveScreenshot({ fullPage: true });

    // Test visual of cart page
    await inventoryPage.lnkShoppingCart.click();
    await expect(page).toHaveScreenshot({ fullPage: true });

    // Test visual of checkout page
    await cartPage.btnCheckout.click();
    await expect(page).toHaveScreenshot({ fullPage: true });

    // Test visual of thank you page
    await checkoutPage.completeCheckout(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.zipCode()
    );
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
