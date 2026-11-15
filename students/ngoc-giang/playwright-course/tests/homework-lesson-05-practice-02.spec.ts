import { test, expect } from "@playwright/test";
test("kiểm tra giao diện và trạng thái của form đăng nhập", async ({
  page,
}) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.getByRole("link", { name: "sign in" }).click();
  // Giao diện trang đăng nhập: các phần tử sau hiển thị
  const email = page.getByRole("textbox", { name: "Email address *" });
  const password = page.getByRole("textbox", { name: "Password *" });
  const register = page.getByRole("link", { name: "Register your account" });
  const forgotPassword = page.getByRole("link", {
    name: "Forgot your Password?",
  });
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute("placeholder", "Your email");
  await expect(password).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  await expect(register).toBeVisible();
  await expect(forgotPassword).toBeVisible();

  //Trạng thái lỗi khi bỏ trống
  await page.getByRole("button", { name: "Login" }).click();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Email is required")).toBeVisible();
  await email.fill("ngoc@gmail.com");
  await expect(email).toHaveAttribute("aria-invalid", "false");
  await expect(page.getByText("Password is required")).toBeVisible();

  //Điều hướng từ trang đăng nhập:
  await register.click({ timeout: 2000 });
  await expect(page).toHaveURL(
    "https://practicesoftwaretesting.com/auth/register",
  );
  await page.getByRole("link", { name: "sign in" }).click();
  await forgotPassword.click();
  await expect(page).toHaveURL(
    "https://practicesoftwaretesting.com/auth/forgot-password",
  );

  // Dùng type mô tả link (tên link, URL mong đợi)
  type Link = {
    name: string;
    link: string;
  };
  const links: Link[] = [
    {
      name: "Register your account",
      link: "https://practicesoftwaretesting.com/auth/register",
    },
    {
      name: "Forgot your Password?",
      link: "https://practicesoftwaretesting.com/auth/forgot-password",
    },
  ];
  for (const checkLink of links) {
    await page.goto("https://practicesoftwaretesting.com/auth/login");
    await page.getByRole("link", { name: checkLink.name }).click();
    await expect(page).toHaveURL(checkLink.link);
  }
});
