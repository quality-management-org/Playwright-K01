import { Page, expect } from "@playwright/test";
import products from "../test-data/products.json";
import address from "../test-data/address.json";
type Product = {
  productName: string;
  quantity: number;
  unitPrice: number;
};
export class CardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async verifyCard(products: Product[]) {
    let totalPrice = 0;

    for (const product of products) {
      const productRow = this.page.locator("tr").filter({
        hasText: product.productName,
      });

      const productQuantity = productRow.locator(
        '[data-test="product-quantity"]',
      );

      await expect(productQuantity).toHaveValue(String(product.quantity));

      totalPrice += product.unitPrice * product.quantity;
    }

    const total = this.page.locator('[data-test="cart-total"]');

    await expect(total).toContainText(totalPrice.toFixed(2));
  }
  async loginCard() {
    await this.page
      .getByRole("button", { name: "Proceed to checkout" })
      .click();

    const profile = process.env.NAME!;

    const profileChekout = this.page.getByText(
      `Hello ${profile}, you are already logged in. You can proceed to checkout.`,
    );

    await expect(
      profileChekout,
      "Checkout message should display the logged-in user's name",
    ).toBeVisible();

    await this.page
      .getByRole("button", { name: "Proceed to checkout" })
      .click();
  }

  async billingAddress() {
    const billing = address.Address[0];

    await this.page
      .getByRole("combobox", { name: "Country" })
      .selectOption(billing.country);

    await this.page
      .getByRole("textbox", { name: "Postal code" })
      .fill(billing.postalCode);

    await this.page
      .getByRole("textbox", { name: "House number" })
      .fill(billing.houseNumber);

    await this.page
      .getByRole("textbox", { name: "Street" })
      .fill(billing.street);

    await this.page.getByRole("textbox", { name: "City" }).fill(billing.city);

    await this.page.getByRole("textbox", { name: "State" }).fill(billing.state);

    await this.page
      .getByRole("button", { name: "Proceed to checkout" })
      .click();
  }
}
