import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
});