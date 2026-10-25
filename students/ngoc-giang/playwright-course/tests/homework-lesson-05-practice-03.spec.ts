import { test, expect } from "@playwright/test";
test("Checkout flow", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.getByRole("link", { name: "Sign in" }).click({ timeout: 1000 });
  const defaultPassword = "welcome01";
  const emailTrue = "customer@practicesoftwaretesting.com";
  await page.getByRole("textbox", { name: "Email address *" }).fill(emailTrue);
  await page.getByRole("textbox", { name: "Password *" }).fill(defaultPassword);
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Home" }).click({ timeout: 3000 });
  const product = page.locator('[data-test="product-name"]');
  await product.getByText("Bolt Cutters", { exact: true }).click();
  const addToCard= page.getByRole("button",{name:"Add to cart"});
  await addToCard.click();
  expect(page.getByText("Product added to shopping cart.")).toBeVisible();
  await page.getByRole("link", { name: "Home" }).click({ timeout: 3000 });
  await product.getByText("Pliers", { exact: true }).click();
  await addToCard.click();
  expect(page.getByText("Product added to shopping cart.")).toBeVisible();
  await page.getByRole("link",{name:"cart"}).click();
  const total= page.getByRole("strong",{name:"Total"});
  

    
});
