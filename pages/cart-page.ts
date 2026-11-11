import { Locator, Page } from "@playwright/test";

export class CartPage {
    page: Page;
    cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator(".cart_item");
    }

    async removeProduct(productName: string) {
        await this.cartItems
            .filter({ hasText: productName })
            .getByRole("button", { name: "Remove" })
            .click();
    }
}