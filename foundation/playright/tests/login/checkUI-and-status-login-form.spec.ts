import { test, expect } from "@playwright/test";
import { log } from "node:console";

test("Check UI for Login form", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");

  await page.getByRole("link", {name:"Sign in"}).click({timeout: 5000});

  await expect(page.getByRole("heading",{name: "Login"})).toBeVisible() ;

  await expect(page.getByPlaceholder("Your email")).toBeVisible();

  await expect(page.getByPlaceholder("Your password")).toBeVisible();

  await expect(page.getByRole("button", {name: "Login"})).toBeVisible();

  await expect(page.getByRole("link", { name: "Register your account" })).toBeVisible();

  await expect(page.getByRole("link", { name: "Forgot your Password?" })).toBeVisible();
});

test("Check in case email/password empty", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");
  await page.getByRole("link", {name:"Sign in"}).click({timeout: 5000});

// Email and password are empty
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByText("Email is required")).toBeVisible();
  await expect(page.getByText("Password is required")).toBeVisible();

// Password is empty
  await page.getByLabel("Email address *").fill("test123@test.com");
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByText("Password is required")).toBeVisible();

});

  type Link = {
    linkName: string;
    expectedUrl: string
  }
  const linkRedirect: Link[] = [
    {
        linkName: "Register your account",
        expectedUrl: "/auth/register"
    },
    {
        linkName: "Forgot your Password?",
        expectedUrl: "/auth/forgot-password"
    }
];
test("Check redirecting URL in Login page", async ({ page }) => {
    for (const{linkName, expectedUrl} of linkRedirect){
        await page.goto("https://practicesoftwaretesting.com/auth/login");
        await page.getByRole("link", {name: linkName}).click();
        await expect(page).toHaveURL(`https://practicesoftwaretesting.com${expectedUrl}`);
    }

});
