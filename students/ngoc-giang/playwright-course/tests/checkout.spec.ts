import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import products from "../test-data/products.json";
import { HomePage } from "../pages/home.page";
import { CardPage } from "../pages/card.page";
import { PaymentPage } from "../pages/payment.page";
test("Checkout flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cardPage = new CardPage(page);
  const paymentPage = new PaymentPage(page);
  await test.step("Step 1: Navigate to Login page", async () => {
    await loginPage.navigateToLogin();
  });

  await test.step("Step 2: Enter email and password", async () => {
    await loginPage.login();
  });

  await test.step("Step 3: Validate Login successfully", async () => {
    await loginPage.verifyLoginSuccess();
  });
  await test.step("Step 4: Click Homepage", async () => {
    await homePage.openHome();
  });
  await test.step("Step 5: Add product to Card", async () => {
    for (const item of products.product) {
      await homePage.addProductToCart(item.productName);
    }
  });
  await test.step("Step 6: Open card to checkout", async () => {
    await homePage.openCart();
  });
  await test.step("Step 7: Validate Card", async () => {
    await cardPage.verifyCard(products.product);
  });

  await test.step("Step 8: VerifyLogin account", async () => {
    await cardPage.loginCard();
  });

  await test.step("Step 9: Input Billing", async () => {
    await cardPage.billingAddress();
  });
  await test.step("Step 10: Input Giftcard", async () => {
    await paymentPage.paymentGiftCard();
  });
});
