import { test, expect } from "@playwright/test";

test.describe("Login Test Cases", () => {});

test("01. Validate that user cannot login without username and password", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator("[data-test=error]")).toBeVisible();
  await expect(page.locator("[data-test=error]")).toHaveText(
    "Epic sadface: Username is required"
  );
});

test("02. Validate that user cannot login without username", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator("[data-test=error]")).toBeVisible();
  await expect(page.locator("[data-test=error]")).toHaveText(
    "Epic sadface: Username is required"
  );
});
