import { test, expect } from "@playwright/test";

test("Login with customer account", async ({ page }) => {

  await page.goto("https://practicesoftwaretesting.com");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator("#email").fill("customer@");
  await page.locator("#password").fill("welcome");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.getByText("Email format is invalid")).toBeVisible;
});