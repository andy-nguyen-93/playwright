import { test } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Message } from "../utils/enums.utils";

test.describe("Test Cases With No Login State", () => {
  test.use({ storageState: "states/noLoginState.json" });

  let loginPage: LoginPage;

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
});
