import { test, expect } from "@playwright/test";

test("Verify checkout flow",async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");

// Login    
    await page.getByRole("link", { name: "Sign in" }).click();

    await page.getByLabel("Email address *").fill("hientest1@test.com");
    await page.getByLabel("Password *").fill("Hien@09098989");

    await page.getByRole("button", { name: "Login" }).click({timeout:10000});
    await expect(page.getByRole("heading", {name: 'My account'})).toBeVisible();

// Add product to cart  
    await page.getByRole("link",{name: "Home"}).click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com");
    await page.getByRole("heading",{name: " Combination Pliers "}).click();
    await page.getByRole("button",{name: "Increase quantity"}).click();
    await page.getByRole("button", { name: "Add to cart" }).click();

// Check cart information after adding product    
    await page.locator("//a[@class='nav-link']//*[@data-icon='cart-shopping']").click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/checkout");

    await expect.soft(page.locator("//table[@class='table table-hover']//*[@class='product-title']")).toHaveText('Combination Pliers');
    await expect.soft(page.getByLabel("Quantity for Combination Pliers")).toHaveValue("2");
    await expect.soft(page.locator("//table[@class='table table-hover']//*[@data-test='product-price']")).toHaveText("$14.15");
    await expect.soft(page.locator("//table[@class='table table-hover']//*[@data-test='line-price']")).toContainText("$28.30");

// Proceed checkout
    await page.getByRole("button", {name: "Proceed to checkout"}).click();
    await page.getByRole("button", {name:" Proceed to checkout "}).click();
    
    await page.selectOption("#country", {label:"Viet Nam"});
    await page.getByLabel("Postal code").fill("10000");
    await page.getByLabel("House number").fill("12");
    await page.getByLabel("Street").fill("Ho Tung Mau");
    await page.getByLabel("City").fill("Ha Noi");
    await page.getByLabel("State").fill("Phu Dien");
    await page.getByRole("button", {name: "Proceed to checkout"}).click();

// Payment
    await page.selectOption("#payment-method", {label:"Cash on Delivery"});
    await page.getByRole("button", {name: " Check payment " }).click();
    await expect(page.locator("//*[@data-test='payment-success-message']")).toBeVisible();
    await page.getByRole("button", {name: " Confirm "}).click();
    await expect(page.locator("//*[@id='order-confirmation']")).toBeVisible();

});