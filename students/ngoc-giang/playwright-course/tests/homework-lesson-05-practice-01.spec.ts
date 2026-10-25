import { test, expect } from "@playwright/test";
test("kiểm tra đăng nhập với nhiều bộ dữ liệu", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.getByRole("link", { name: "Sign in" }).click({ timeout: 1000 });
  const defaultPassword = "welcome01";
  const emailTrue = "customer@practicesoftwaretesting.com";
  await page.getByRole("textbox", { name: "Email address *" }).fill(emailTrue);
  await page.getByRole("textbox", { name: "Password *" }).fill(defaultPassword);
  await page.getByRole("button", { name: "Login" }).click();
});
test("Khai báo type", async ({ page }) => {
  type Account = {
    email: string;
    password: string;
  };
  const accounts: Account[] = [
    {
      email: "",
      password: "welcome01",
    },
    {
      email: "acb",
      password: "welcome01",
    },
    {
      email: "customer@practicesoftwaretesting.com",
      password: "",
    },
    {
      email: "not-registered@practicesoftwaretesting.com",
      password: "av",
    },
    {
      email: "not-registered@practicesoftwaretesting.com",
      password: "welcome01",
    },
    {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
    },
  ];

  for (let i = 0; i < accounts.length; i++) {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByRole("link", { name: "Sign in" }).click({ timeout: 1000 });
    await page
      .getByRole("textbox", { name: "Email address *" })
      .fill(accounts[i].email);
    await page
      .getByRole("textbox", { name: "Password *" })
      .fill(accounts[i].password);
    await page.getByRole("button", { name: "Login" }).click();
    if (i === 0) {
      await expect(page.getByText("Email is required")).toBeVisible();
    } else if (i === 1) {
      await expect(page.getByText("Email format is invalid")).toBeVisible();
    } else if (i === 2) {
      await expect(page.getByText("Password is required")).toBeVisible();
    } else if (i === 3) {
      await expect(page.getByText("Password length is invalid")).toBeVisible();
    } else if (i === 4) {
      await expect(page.getByText("Invalid email or password")).toBeVisible();
    } else if (i === 5) {
      await expect(
        page.getByRole("heading", { name: "My account" }),
      ).toBeVisible();
    }
  }
});

test("Khai báo type dùng for of", async ({ page }) => {
  type Account = {
    email: string;
    password: string;
    expected: string;
  };
  const accounts: Account[] = [
    {
      email: "",
      password: "welcome01",
      expected: "Email is required",
    },
    {
      email: "acb",
      password: "welcome01",
      expected: "Email format is invalid",
    },
    {
      email: "customer@practicesoftwaretesting.com",
      password: "",
      expected: "Password is required",
    },
    {
      email: "not-registered@practicesoftwaretesting.com",
      password: "av",
      expected: "Password length is invalid",
    },
    {
      email: "not-registered@practicesoftwaretesting.com",
      password: "welcome01",
      expected: "Invalid email or password",
    },
    {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
      expected:"My account"

    },
  ];

  for ( const account of accounts) {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByRole("link", { name: "Sign in" }).click({ timeout: 1000 });
    await page
      .getByRole("textbox", { name: "Email address *" })
      .fill(account.email);
    await page
      .getByRole("textbox", { name: "Password *" })
      .fill(account.password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText(account.expected)).toBeVisible();
  }
});
