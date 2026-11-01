import { test, expect } from "@playwright/test";
import { products } from "../test-data/products";
import { address } from "../test-data/address";
import { giftCard, PaymentMethod } from "../test-data/checkout";
import { baseUrl, account } from "../test-data/account";

test("Checkout flow", async ({ page }) => {
  await page.goto(`${baseUrl}`);
  await page.getByRole("link", { name: "Sign in" }).click();

  await page
    .getByRole("textbox", { name: "Email address *" })
    .fill(account.email);
  await page
    .getByRole("textbox", { name: "Password *" })
    .fill(account.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByRole("heading", { name: "My account" }),
    "Login should succeed and display My account heading",
  ).toBeVisible();
  await page.getByRole("link", { name: "Home" }).click();

  for (const product of products) {
    await page.getByRole("link", { name: "Home" }).click();
    await page.waitForLoadState("domcontentloaded");
    await page
      .locator('[data-test="product-name"]')
      .getByText(product.name, { exact: true })
      .click();

    await page.getByRole("button", { name: "Add to cart" }).click();
    const toastMsg = page.getByRole("alert", {
      name: "Product added to shopping cart.",
    });
    await expect(toastMsg).toBeVisible();
  }

  await page.getByRole("link", { name: "cart" }).click();

  let totalPrice = 0;
  for (const product of products) {
    const productRow = page.getByRole("row").filter({
      has: page.getByText(product.name, { exact: true }),
    });
    const productQuantity = productRow.locator(
      '[data-test="product-quantity"]',
    );
    await expect(productQuantity).toHaveValue(String(product.quantity));

    totalPrice += product.unitPrice * product.quantity;
  }
  const total = page.locator('[data-test="cart-total"]');

  await expect(total).toContainText(totalPrice.toFixed(2));
  await page.getByRole("button", { name: "Proceed to checkout" }).click();
  const profile = (
    await page.locator('[data-test= "nav-menu"]').innerText()
  ).trim();
  const profileChekout = page.getByText(
    `Hello ${profile}, you are already logged in. You can proceed to checkout.`,
  );
  await expect(
    profileChekout,
    "Checkout message should display the logged-in user's name",
  ).toBeVisible();
  await page.getByRole("button", { name: "Proceed to checkout" }).click();
  await page
    .getByRole("combobox", { name: "Country" })
    .selectOption(address.country);
  await page
    .getByRole("textbox", { name: "Postal code" })
    .fill(address.postalCode);
  await page
    .getByRole("textbox", { name: "House number" })
    .fill(address.houseNumber);
  await page.getByRole("textbox", { name: "Street" }).fill(address.street);
  await page.getByRole("textbox", { name: "City" }).fill(address.city);
  await page.getByRole("textbox", { name: "State" }).fill(address.state);
  await page.getByRole("button", { name: "Proceed to checkout" }).click();
  const payment: PaymentMethod = "Gift Card";
  await page.getByRole("combobox").selectOption(payment);
  await page
    .getByRole("textbox", { name: "Gift Card Number" })
    .fill(giftCard.giftCardNumber);
  await page
    .getByRole("textbox", { name: "Validation Code" })
    .fill(giftCard.validationCode);
  await page.getByRole("button", { name: "Check payment" }).click();
  await expect(
    page.getByText("Payment was successful"),
    "Payment was failed after checking the gift card",
  ).toBeVisible();
  await page.getByRole("button", { name: "Confirm" }).click();
  const orderConfirmation = page.locator("#order-confirmation");
  await expect(
    orderConfirmation,
    "Cant not create an order after clicking Confirm",
  ).toBeVisible();
});
