import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Account, Password, User } from "../utils/enums.utils";
import InventoryPage from "../pages/inventory.page";
import CartPage from "../pages/cart.page";
import CheckoutPage from "../pages/checkout.page";

test.describe("Inventory Test Cases", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test("INVENTORY-01. Validate that standard user can buy all items", async ({
    page,
  }) => {
    // Generate login, inventory pages
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to login page
    await loginPage.goToLoginPage();

    // Login with standard account
    await loginPage.login(Account.STANDARD, Password.ALL);

    // Add to cart all items
    for (const btn of await inventoryPage.btnsAddToCart.elementHandles()) {
      await btn.click();
    }

    // Click on shopping cart icon
    await inventoryPage.lnkShoppingCart.click();

    // Click on Checkout button
    await cartPage.btnCheckout.click();

    // Complete checkout
    await checkoutPage.completeCheckout(
      User.FIRSTNAME,
      User.LASTNAME,
      User.POSTALCODE
    );

    // Verify checkout is completed successfully
    await checkoutPage.verifyCheckoutSuccessfully();
  });
});
