import { test, expect } from "@playwright/test";

test("hàm check và uncheck radio button", async ({ page }) => {
  await page.goto("https://demoqa.com/radio-button");

  await page.getByRole("radio", { name: "Yes" }).check();
  // await page.getByRole("radio", { name: "Yes" }).uncheck();

});

test("hàm check và uncheck toggle", async ({ page }) => {
  await page.goto("https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch/");

  await page.getByRole("switch", {name: "Notifications"}).check();
  // await page.getByRole("switch", {name: "Notifications"}).uncheck();
});

test("verify hiển thị text", async ({ page }) => {
    await page.goto("https://demoqa.com/frames");
    const iframe = page.locator("frame1").contentFrame();
    const isTextVisible = await iframe.getByRole("heading", { name: "This is a sample page" }).isVisible();
    
    console.log(`Verify element visible: ${isTextVisible}`);
});

test("select dropdown language",async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByRole("button", {name: 'Select language'}).click();
    await page.getByRole("menuitem", { name: "DE" }).click();
});

test("Verify toast message after adding product to cart",async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByRole("heading",{name: ' Combination Pliers '}).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    const toastMessage =  page.getByRole("alert",{name:'Product added to shopping cart."'});
    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toBeHidden({timeout:7000});
});

test("Verify login function",async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
// Click button Sign In    
    await page.getByRole("link", {name:"Sign in"}).click({timeout: 5000});
// Nhập thông tin và click button Login    
    await page.getByLabel("Email address *").fill("hien3@test.com", {timeout: 3000})  ;
    await page.getByLabel("Password *").fill("Hien@09098989", {timeout: 3000});
    await page.getByRole("button",{name: "Login"}).click({timeout: 5000});

    const myAccount = page.getByRole("heading", {name: 'My account'});
    await expect (myAccount).toBeVisible();
});

test("Verify result when searching product with partial keyword",async ({ page }) => {
    const keyword = "Pliers";
    await page.goto("https://practicesoftwaretesting.com/");

    await page.getByLabel("Search").fill(keyword,{timeout:5000});
    await page.keyboard.press('Enter');

    const heading = page.getByRole("heading", {level:3});
    await expect(heading).toHaveText(`Searched for: ${keyword}`);

    const result = page.locator("//p[@data-testid='search-result-count']");
    await expect(result).toContainText(`products found for '${keyword}'`);
});

test("Hàm sử dụng toBeChecked",async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    const checked = page.getByLabel(" Hammer ");
    await checked.check();
    await expect(checked).toBeChecked();
});

test("Check shopping cart after adding product",async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");

// Add sản phẩm vào giỏ hàng    
    await page.getByRole("heading",{name: ' Combination Pliers '}).click();
    await page.getByRole("button",{name: "Increase quantity"}).click();
    await page.getByRole("button", { name: "Add to cart" }).click();

// Check thông tin giỏ hàng sau khi add    
    await page.locator("//a[@class='nav-link']//*[@data-icon='cart-shopping']").click();
    const itemProduct = page.locator("//table[@class='table table-hover']//*[@class='product-title']");
    await expect.soft(itemProduct).toHaveText('Combination Pliers');

    const itemQuanlity = page.getByLabel("Quantity for Combination Pliers");
    await expect.soft(itemQuanlity).toHaveValue("2");

    const itemPrice = page.locator("//table[@class='table table-hover']//*[@data-test='product-price']");
    await expect.soft(itemPrice).toHaveText("$14.15");

    const itemTotal = page.locator("//table[@class='table table-hover']//*[@data-test='line-price']");
    await expect.soft(itemTotal).toHaveText("$28.30");

});