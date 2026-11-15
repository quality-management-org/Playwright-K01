import { test, expect } from "@playwright/test";
import { baseUrl } from "../test-data/account";
type sortvalue =
  | "Name (A - Z)"
  | "Name (Z - A)"
  | "Price (High - Low)"
  | "Price (Low - High)"
  | "CO₂ Rating (A - E)"
  | "CO₂ Rating (E - A)";
const sortValue = {
  asc: "Price (Low - High)",
  desc: "Price (High - Low)",
};
test("Sort Price low to high", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  const sortField = page.getByRole("combobox", { name: "sort" });
  await sortField.selectOption(sortValue.asc);
  const products = page.locator("a.card");
  const productPrice = await products
    .locator('[data-test="product-price"]')
    .allTextContents();
  const priceNumbers = productPrice.map((productPrice) =>
    Number(productPrice.replace("$", "").trim()),
  );
  priceNumbers.forEach((price, index) => {
    if (index > 0) {
      expect(priceNumbers[index - 1]).toBeLessThanOrEqual(price);
    }
  });
});

test("Sort Price high to low", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  const sortField = page.getByRole("combobox", { name: "sort" });
  await sortField.selectOption(sortValue.desc);
  const products = page.locator("a.card");
  const productPrice = await products
    .locator('[data-test="product-price"]')
    .allTextContents();
  const priceNumbers = productPrice.map((productPrice) =>
    Number(productPrice.replace("$", "").trim()),
  );
  priceNumbers.forEach((price, index) => {
    if (index > 0) {
      expect(priceNumbers[index - 1]).toBeGreaterThanOrEqual(price);
    }
  });
});
