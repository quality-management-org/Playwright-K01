

import { test, expect } from "@playwright/test";
import { TIMEOUT } from "node:dns";

test("verify toast mess", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");
await page.locator('[data-test="nav-sign-in"]').click();

  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await page.locator('[data-test="nav-home"]').click();
  await page.getByText("Combination Pliers").click();
  await page.getByRole('button', {name: "Add to cart"}).click();
  const toastMess=page.getByRole('alert')
  await expect(toastMess).toBeVisible();
  await expect(toastMess).toBeHidden({timeout:7000});


  
});