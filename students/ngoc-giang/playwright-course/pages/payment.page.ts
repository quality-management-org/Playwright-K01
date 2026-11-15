import { Page, expect } from "@playwright/test";
import paymentmethod from "../test-data/payment-method.json";

export class PaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async paymentGiftCard() {
    const giftCard = paymentmethod.PaymentMethod.find(
    item => item.paymentType === "Gift Card");
 if (!giftCard) {
        throw new Error("Gift Card not found");
    }

  await this.page.getByRole("combobox").selectOption(giftCard.paymentType);
  await this.page
    .getByRole("textbox", { name: "Gift Card Number" })
    .fill(giftCard.giftCardNumber!);
  await this.page
    .getByRole("textbox", { name: "Validation Code" })
    .fill(giftCard.validationCode!);
  await this.page.getByRole("button", { name: "Check payment" }).click();
  await expect(
    this.page.getByText("Payment was successful"),
    "Payment was failed after checking the gift card",
  ).toBeVisible();
  await this.page.getByRole("button", { name: "Confirm" }).click();
  const orderConfirmation = this.page.locator("#order-confirmation");
  await expect(
    orderConfirmation,
    "Cant not create an order after clicking Confirm",
  ).toBeVisible();
  }
}