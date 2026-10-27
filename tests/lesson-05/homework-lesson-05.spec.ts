// Mở trang Contact, trong đó có 3 phần tử với các thông tin như sau:
// 1. First Name: thẻ đúng chuẩn, là thẻ <input> gắn với thẻ <label> bên ngoài bằng for ="first_name", role là text, assessible name = nội dung chữ bên trong thẻ label
// 2. Subject: thẻ đúng chuẩn, là thẻ <select> có id="subject", role là combobox, assessible name = nội dung chữ bên trong thẻ label
// 3. Button Send: thẻ đúng chuẩn, là thẻ <input> có type="submit", role là button assessible name = nội dung chữ bên trong thẻ


import { test, expect } from "@playwright/test";

test("locator cho 15 phần tử khác nhau trên Toolshop", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");

// Ô Search có placeholder "Search" nên dùng được getByPlaceholder
  const searchInput = page.getByPlaceholder("Search");
  await expect(searchInput).toBeVisible();

  // thẻ <select> có area-label="sort" nên dùng được getByRole, assessible name lấy từ area-label
  const sortSelect = page.getByRole("combobox", { name: "sort" });
  await expect(sortSelect).toBeVisible();

  // Ô Wrench có type là checkbox nên dùng được getByRole, assessible name lấy từ thẻ label bên ngoài
  const filterSelect = page.getByRole("checkbox", {name:"Wrench"});
  await expect(filterSelect).toBeVisible();

  // 
  const productName = page.getByText("Combination Pliers");
  await expect(productName).toBeVisible();

  // thẻ giả "Categories" trên menu trông giống link nhưng là thẻ <button>
  const categoryLink = page.getByRole("link", { name: "Category" });
  await expect(categoryLink).toHaveCount(0);

  // assessible name = nội dung chữ bên trong thẻ
  await page.getByRole("heading", {name: "Combination Pliers"}).click();
  const addtocartButton = page.getByRole("button", { name: "Add to cart" });
  await expect(addtocartButton).toBeVisible();

  // thẻ <input type="number"> nên có role là spinbutton
  const quantityInput = page.getByRole("spinbutton", { name: "Quantity" });
  await expect(quantityInput).toBeVisible();

  //
  await page.getByRole("link", {name:"Contact"}).click();
  const firstNameInput = page.getByLabel("First Name");
  await expect(firstNameInput).toBeVisible();

  //
  const emailAddressInput = page.getByLabel("Email Address");
  await expect(emailAddressInput).toBeVisible();

  // assessible name lấy từ thẻ label bên ngoài
  const messageInput = page.getByRole("textbox", { name: "Message" });
  await expect(messageInput).toBeVisible();

  // Subject là 1 dropdown nên dùng getByRole với combobox, assessible name lấy từ thẻ label bên ngoài
  const subjectSelect = page.getByRole("combobox", { name: "subject" });
  await expect(subjectSelect).toBeVisible();

  // có type là submit, assessible name lấy từ nội dung chữ bên trong thẻ
  const sendButton = page.getByRole("button", { name: "Send" });
  await expect(sendButton).toBeVisible();

  // thẻ <input> có placeholder="Your Password" nên dùng được getByPlaceholder
  await page.getByRole("link", {name:"Sign in"}).click();
  const passwordInput = page.getByPlaceholder("Your Password");
  await expect(passwordInput).toBeVisible();

  // thẻ <a> có <href="..."> nên role là link,  assessible name lấy từ area-label=Register your account
  const registerLink = page.getByRole("link", { name: "Register your account" });
  await expect(registerLink).toBeVisible();

  // thẻ <button> có type là submit nên role là button, assessible name lấy từ nội dung chữ bên trong thẻ
  await registerLink.click();
  const registerButton = page.getByRole("button", { name: "Register" });
  await expect(registerButton).toBeVisible();
})