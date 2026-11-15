import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from '../home/home.page';

export class ProductDetailPage extends HomePage {
    readonly addToCartButton: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
        this.cartBadge = page.locator("//*[@data-test='cart-quantity']");
    }

    async goToHomePage() {
        await this.page.getByRole('link', { name: 'Home' }).click();
    }

    async addToCart(products: string[]) {
        for (const product of products) {

            // back to Homepage
            await this.goToHomePage();

            // Click product name to go to Product Detail Page
            await this.goToProductDetailPage(product);

            // Click Add to Cart button
            await this.addToCartButton.click();

            // Verify toast message is displayed
            const toastMsg = this.page.getByRole('alert', {name: 'Product added to shopping cart.'});
            await expect(toastMsg).toBeVisible();
        }
    }

    async getCartCount() {
        const countText = await this.cartBadge.textContent();
        return countText ? parseInt(countText) : 0;
    }
}