import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { CartPage } from "../pages/cart-page";

test("add product to cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await test.step("Step 1: Login to the application", async () => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
  });

  await test.step("Step 2: Add products to cart and verify cart count", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");
    const cartCount = await inventoryPage.getCartCount();
    await expect(cartCount).toBe(2);
    console.log(`added product number is ${cartCount}`)
  });

  await test.step("Step 3: Remove product from cart and verify cart count", async () => {
    await inventoryPage.openCart();
    await cartPage.removeProduct("Sauce Labs Backpack");
    const cartCountAfterRemove = await inventoryPage.getCartCount();
    await expect(cartCountAfterRemove).toBe(1);
    console.log(`product number after removal is ${cartCountAfterRemove}`)
  });
  
});