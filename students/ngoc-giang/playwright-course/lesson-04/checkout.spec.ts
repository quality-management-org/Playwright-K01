import { test, expect } from "@playwright/test";

test("Check out", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();

  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");

  await page.locator('[data-test="password"]').fill("welcome01");

  await page.locator('[data-test="login-submit"]').click();

  await page.locator('[data-test="nav-home"]').click();
  await page.waitForLoadState("networkidle");
  await page.getByText("Combination Pliers").click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="increase-quantity"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('[data-test="proceed-1"]').click();
  await page.locator('[data-test="proceed-2"]').click();
  await page.locator('[data-test="country"]').selectOption("AT");

  await page.locator('[data-test="postal_code"]').fill("12344");

  await page.locator('[data-test="house_number"]').fill("1234325");

  await page.locator('[data-test="postal_code"]').fill("1234");
  await page.locator('[data-test="proceed-3"]').click();

  await page
    .locator("div")
    .filter({ hasText: "PaymentPayment MethodChoose" })
    .nth(3)
    .click();
  await page.locator('[data-test="payment-method"]').selectOption("gift-card");

  await page.locator('[data-test="gift_card_number"]').fill("1234567890123456");

  await page.locator('[data-test="validation_code"]').fill("1A2B");
  await page.locator('[data-test="finish"]').click();
});
