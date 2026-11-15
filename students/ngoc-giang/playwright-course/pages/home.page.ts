import { Page, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openHome() {
    await this.page.getByRole("link", { name: "Home" }).click();
  }

  async addProductToCart(productName: string) {

     await this.page.getByRole("link", { name: "Home" }).click();

    await this.page
      .locator('[data-test="product-name"]')
      .getByText(productName, { exact: true })
      .click();

    await this.page
      .getByRole("button", {
        name: "Add to cart",
      })
      .click();
    
    const toastMsg = this.page.getByRole("alert", {
      name: "Product added to shopping cart.",
    });
    await expect(toastMsg).toBeVisible();
  }
  async openCart(){
     await this.page.getByRole("link", { name: "cart" }).click();

  }
}
