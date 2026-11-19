import test, { expect } from "@playwright/test";
import products from "../test-data/product.json";
import { LoginPage } from "@pages/login/login.page";
import AccountPage from "@pages/account/account.page";
import { ProductDetailPage } from "@pages/product/product.detail.page";
import { CheckoutPage } from "@pages/checkout/checkout.page";

test('Verify checkout flow', async({page}) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step("Step 1: Open login page", async () => {
        await loginPage.goto();
        await loginPage.goToSignin();
        await expect(loginPage.heading).toBeVisible();
    });

    await test.step("Step 2: Login to dashboard", async () => {  
        await loginPage.login({
            email: process.env.EMAIL || '',
            password: process.env.PASSWORD || ''
        });
        await expect(page).toHaveURL(/account/);
        await expect(accountPage.heading).toBeVisible();
        await productDetailPage.goToHome();
    });

    await test.step("Step 3: Add product to cart", async () => {
        const productNames = products.product.map((product: { name: any; }) => product.name);
        await productDetailPage.addToCart(productNames);
        const cartCount = await productDetailPage.getCartCount();
        await expect(cartCount).toBe(2);
    });

    await test.step("Step 4: Go to checkout page and remove 1 product", async () => {
        await checkoutPage.openCart();
        await checkoutPage.removeProduct(products.product[0].name);
    });

    await test.step("Step 5: Checkout proceed", async () => {
        await checkoutPage.proceedToCheckout();
    });

    await test.step("Step 6: Payment procedure", async () => {
        await checkoutPage.payment();
    });

});