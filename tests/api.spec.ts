import { test, expect } from "@playwright/test";
import { Site } from "../utils/enums.utils";

test.describe("API Test Cases", () => {
  test("API-01. Validate that About link is working", async ({ request }) => {
    // Navigate to Sauce Lab
    const response = await request.get(Site.SAUCE_LAB);

    // Validate that About link is working
    expect(response.ok()).toBeTruthy();
  });
});
