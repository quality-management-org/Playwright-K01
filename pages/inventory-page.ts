import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async openCart() {
    await this.page.locator(".shopping_cart_link").click();
  }

  async getCartCount() {
    const countText = await this.cartBadge.textContent();
    return countText ? parseInt(countText) : 0;
  }
}