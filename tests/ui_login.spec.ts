import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Account, Message, Password, Url } from "../utils/enums.utils";
import InventoryPage from "../pages/inventory.page";
import data from "../data/successLogin.json";

test.describe("Login Test Cases", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    // Initialize login page
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Navigate to login page
    await loginPage.goto();
  });

  test("LOGIN-01. Validate that user cannot login without username and password", async ({
    page,
  }) => {
    // Click on login button
    await page.locator('[data-test="login-button"]').click();

    // Validate that error message is displayed
    await expect(page.locator("[data-test=error]")).toBeVisible();

    // Validate that error message is correct
    await expect(page.locator("[data-test=error]")).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("LOGIN-02. Validate that user cannot login without username", async ({
    page,
  }) => {
    // Fill password
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // Click on login button
    await page.locator('[data-test="login-button"]').click();

    // Validate that error message is displayed
    await expect(page.locator("[data-test=error]")).toBeVisible();

    // Validate that error message is correct
    await expect(page.locator("[data-test=error]")).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("LOGIN-03. Validate that user cannot login without password", async () => {
    // Login without password
    await loginPage.login("standard_user", "");

    // Validate that error message is displayed correctly
    await loginPage.verifyErrorMessage("Epic sadface: Password is required");
  });

  test("LOGIN-04. Validate that user cannot login with invalid user and valid password", async () => {
    // Login with invalid user and valid password
    await loginPage.login(Account.INVALID, Password.ALL);

    // Validate that error message is displayed correctly
    await loginPage.verifyErrorMessage(Message.LOGIN_FAIL);
  });

  test("LOGIN-05. Validate that user cannot login with valid user and invalid password", async () => {
    // Login with valid user and invalid password
    await loginPage.login(Account.STANDARD, Password.INVALID);

    // Validate that error message is displayed correctly
    await loginPage.verifyErrorMessage(Message.LOGIN_FAIL);
  });

  test("LOGIN-06. Validate that user cannot login with invalid user and invalid password", async () => {
    // Login with invalid user and invalid password
    await loginPage.login(Account.INVALID, Password.INVALID);

    // Validate that error message is displayed correctly
    await loginPage.verifyErrorMessage(Message.LOGIN_FAIL);
  });

  test("LOGIN-07. Validate that locked out user cannot login to the system", async () => {
    // Login with invalid user and invalid password
    await loginPage.login(Account.LOCKED_OUT, Password.ALL);

    // Validate that error message is displayed correctly
    await loginPage.verifyErrorMessage(Message.LOCKED_OUT_LOGIN);
  });

  const successLoginData = JSON.parse(JSON.stringify(data));

  for (const data of successLoginData) {
    test(`LOGIN-08. Validate that ${data.username} can login to the system`, async ({
      page,
    }) => {
      // Login with invalid user and invalid password
      await loginPage.login(data.username, data.password);

      // Validate that user login successfully
      await expect(page).toHaveURL(Url.INVENTORY);
      await inventoryPage.validateUI();
    });
  }
});
