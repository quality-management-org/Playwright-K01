import {test, expect} from  "@playwright/test";
import { account, baseUrl } from "../test-data/account";


test("Login", async ({ page }) => {
  await page.goto(`${baseUrl}`);
  await page.getByRole("link", { name: "Sign in" }).click();
  
  await page.getByRole("textbox", { name: "Email address *" }).fill(account.email);
  await page.getByRole("textbox", { name: "Password *" }).fill(account.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "My account" })).toBeVisible();
});