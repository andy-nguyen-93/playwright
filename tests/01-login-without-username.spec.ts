import { test, expect } from "@playwright/test";

test("01. Login without username", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator("[data-test=error]")).toBeVisible();
  await expect(page.locator("[data-test=error]")).toHaveText(
    "Epic sadface: Username is required"
  );
});
