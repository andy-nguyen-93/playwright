import { test, expect, Page } from "@playwright/test";
import LoginPage from "../pages/login.page";
import { Account, Message, Password, Url } from "../utils/enums.utils";
import InventoryPage from "../pages/inventory.page";
import CartPage from "../pages/cart.page";
import CheckoutPage from "../pages/checkout.page";
import { faker } from "@faker-js/faker";

test.describe.serial("Test Cases Which Run Sequentially", () => {
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeAll(async ({ browser }) => {
    // Initialize context
    page = await browser.newPage();

    // Initialize login page
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to login page
    await loginPage.goToLoginPage();
  });

  test("SERIAL-01. Validate that problem user can login to the system", async () => {
    // Login with problem account
    loginPage.login(Account.PROBLEM, Password.ALL);

    // Validate that problem user login successfully
    await expect(page).toHaveURL(Url.INVENTORY);
  });

  test("SERIAL-02. Validate that problem user can add first item to cart", async () => {
    // Define index of first item
    const firstIndex = 0;

    // Add first item to cart
    await inventoryPage.addItemToCart(firstIndex);

    // Get the name of selected item
    const itemName = await inventoryPage.getItemName(firstIndex);

    // Click on shopping cart icon
    await inventoryPage.lnkShoppingCart.click();

    // Verify that the list of all item name in inventory page is same as in cart page
    expect.soft(await cartPage.lblsItemName.textContent()).toEqual(itemName);
  });

  test("SERIAL-03. Validate that problem user can proceed to checkout page", async () => {
    // Click on Checkout button
    await cartPage.btnCheckout.click();

    // Validate that problem user can proceed to checkout page
    await checkoutPage.validateCheckoutForm();
  });

  test("SERIAL-04. Validate that problem user cannot complete checkout", async () => {
    // Complete checkout
    await checkoutPage.fillCheckoutForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.zipCode()
    );

    // Click on Continue button
    await checkoutPage.btnContinue.click();

    // Problem user cannot complete checkout
    await expect(checkoutPage.msgError).toHaveText(Message.REQUIRE_LASTNAME);
  });
});
