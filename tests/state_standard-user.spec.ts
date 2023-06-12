import { test, expect } from "@playwright/test";
import { Site } from "../utils/enums.utils";
import InventoryPage from "../pages/inventory.page";

test.describe("Test Cases With Standard Login State", () => {
  let inventoryPage: InventoryPage;

  test("SL-01. Validate that standard user can preview inventory item", async ({
    page,
  }) => {
    // Initialzie inventory page
    inventoryPage = new InventoryPage(page);

    // Navigate to inventory page
    await page.goto(Site.INVENTORY);

    // Preview first item in inventory
    const item = inventoryPage.lblsItemName.first();
    const itemName = await item.innerText();
    await item.click();

    // Validate that standard user can preview inventory item
    await expect(page.locator(".inventory_details_name")).toHaveText(itemName);
  });
});
