import { test, expect } from "@playwright/test";

test("Tạo mới account", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");
 
// Click vào button Sign In  
  await page.getByRole("link", {name:"Sign in"}).click();
  const loginLabel = await page.getByRole("heading", {name: "Login"}).isVisible();
  console.log (`Truy cập vào trang login: ${loginLabel}`);

// Click vào button Register your account để đến trang Register
  await page.getByRole("link", {name:"Register your account"}).click();
  const pageTitle = await page.getByRole("heading", {name: "Customer registration"}).isVisible();
  console.log(`Truy cập vào trang Register: ${pageTitle}`);

// Nhập dữ liệu cho tất cả các trường
  await page.getByLabel("First name").fill("Hien");
  await page.getByLabel("Last name").fill("Nguyen");
  await page.getByLabel("Date of Birth *").fill("1993-02-28");
  await page.selectOption("#country", {label:"Viet Nam"});
  await page.getByLabel("Postal code").fill("1000")
  await page.getByLabel("House number").fill("10");
  await page.getByLabel("Street").fill("Ho Tung Mau");
  await page.getByLabel("City").fill("Ha Noi");
  await page.getByLabel("State").fill("HN");
  await page.getByLabel("Phone").fill("09892008979");
  await page.getByLabel("Email address").fill("hientest.899@test.com");
  await page.getByLabel("Password").fill("Hien@0956888667");

// Bấm Register button
  await page.getByRole("button", {name: "Register "}).click();
  console.log (`Register thành công và chuyển đến trang login: ${loginLabel}`);

// Thực hiện login bằng email và pass vừa đăng kí
  await page.getByLabel("Email address *").fill("hientest.899@test.com")  ;
  await page.getByLabel("Password *").fill("Hien@0956888667");
  await page.getByRole("button",{name: "Login"}).click();
  const myAccountTitle = await page.getByRole("heading", {name: "My account"}).isVisible();
  console.log(`Login thành công và chuyển đến trang My account: ${myAccountTitle}`);
});