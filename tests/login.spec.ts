import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Account, Message, Password } from "../utils/enums.utils";

test.describe("Login Test Cases", () => {
  let loginPage: LoginPage;

  test("01. Validate that user cannot login without username and password", async ({
    page,
  }) => {
    // Navigate to saucedemo page
    await page.goto("https://www.saucedemo.com/");

    // Click on login button
    await page.locator('[data-test="login-button"]').click();

    // Validate that error message is displayed
    await expect(page.locator("[data-test=error]")).toBeVisible();

    // Validate that error message is correct
    await expect(page.locator("[data-test=error]")).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("02. Validate that user cannot login without username", async ({
    page,
  }) => {
    // Navigate to saucedemo page
    await page.goto("/");

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

  test("03. Validate that user cannot login without password", async ({
    page,
  }) => {
    // Generate login page
    loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goToLoginPage();

    // Login without password
    await loginPage.login("standard_user", "");

    // Validate that error message is displayed correctly
    await loginPage.verifyErrorMessage("Epic sadface: Password is required");
  });

  test("04. Validate that user cannot login with invalid user and valid password", async ({
    page,
  }) => {
    // Generate login page
    loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goToLoginPage();

    // Login with invalid user and valid password
    await loginPage.login(Account.INVALID, Password.ALL);

    // Validate that error message is displayed correctly
    await loginPage.verifyErrorMessage(Message.LOGIN_FAIL);
  });
});
