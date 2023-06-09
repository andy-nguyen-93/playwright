import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Account, Password, User } from "../utils/enums.utils";
import InventoryPage from "../pages/inventory.page";
import CartPage from "../pages/cart.page";
import CheckoutPage from "../pages/checkout.page";
import { faker } from "@faker-js/faker";

test.describe("Inventory Test Cases For Standard Account", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    // Initialize pages
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to login page
    await loginPage.goToLoginPage();

    // Login with standard account
    await loginPage.login(Account.STANDARD, Password.ALL);
  });

  test("INVENTORY-01. Validate that standard user can buy all items", async () => {
    // Get the list of all item name in inventory page
    const listInventoryItemName = inventoryPage.lblsItemName;

    // Add to cart all items
    for (const btn of await inventoryPage.btnsAddToCart.elementHandles()) {
      await btn.click();
    }

    // Click on shopping cart icon
    await inventoryPage.lnkShoppingCart.click();

    // Verify that the list of all item name in inventory page is same as in cart page
    expect
      .soft(await listInventoryItemName.allTextContents())
      .toEqual(await cartPage.lblsItemName.allTextContents());

    // Click on Checkout button
    await cartPage.btnCheckout.click();

    // Complete checkout
    await checkoutPage.completeCheckout(
      User.FIRSTNAME,
      User.LASTNAME,
      User.POSTALCODE
    );

    // Verify checkout is completed successfully
    await checkoutPage.validateCheckoutSuccessfully();
  });

  test("INVENTORY-02. Validate that standard user can buy a single item", async () => {
    // Generate random item index
    const itemIndex = faker.number.int(5);

    // Get the name of selected item
    const itemName = await inventoryPage.lblsItemName
      .nth(itemIndex)
      .textContent();

    // Add to cart the selected item
    await inventoryPage.btnsAddToCart.nth(itemIndex).click();

    // Click on shopping cart icon
    await inventoryPage.lnkShoppingCart.click();

    // Verify that the list of all item name in inventory page is same as in cart page
    expect.soft(await cartPage.lblsItemName.textContent()).toEqual(itemName);

    // Click on Checkout button
    await cartPage.btnCheckout.click();

    // Complete checkout
    await checkoutPage.completeCheckout(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.zipCode()
    );

    // Verify checkout is completed successfully
    await checkoutPage.validateCheckoutSuccessfully();
  });
});

test.describe("Inventory Test Cases For Valid Accounts", () => {
  const validAccounts = [Account.STANDARD, Account.PERFORMANCE_GLITCH];

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    // Initialize pages
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to login page
    await loginPage.goToLoginPage();
  });

  for (const account of validAccounts) {
    test(`INVENTORY-03. Validate that ${account} can buy a single item`, async () => {
      // Login
      await loginPage.login(account, Password.ALL);

      // Generate random item index
      const itemIndex = faker.number.int(5);

      // Get the name of selected item
      const itemName = await inventoryPage.lblsItemName
        .nth(itemIndex)
        .textContent();

      // Add to cart the selected item
      await inventoryPage.btnsAddToCart.nth(itemIndex).click();

      // Click on shopping cart icon
      await inventoryPage.lnkShoppingCart.click();

      // Verify that the list of all item name in inventory page is same as in cart page
      expect.soft(await cartPage.lblsItemName.textContent()).toEqual(itemName);

      // Click on Checkout button
      await cartPage.btnCheckout.click();

      // Complete checkout
      await checkoutPage.completeCheckout(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.location.zipCode()
      );

      // Verify checkout is completed successfully
      await checkoutPage.validateCheckoutSuccessfully();
    });
  }
});
