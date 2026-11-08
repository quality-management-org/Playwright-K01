import { test, expect } from "@playwright/test";

    const baseURL= "https://practicesoftwaretesting.com/";

    const account = {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01"
    }

    const product = {
        name: "Combination Pliers",
        quantity: "2",
        price: "$14.15",
        total: "$28.30"
    }

    const address = {
        country: "Viet Nam",
        postalCode: "10000",
        houseNumber: "12",
        street: "Ho Tung Mau",
        city: "Ha Noi",
        state: "Phu Dien"
    }

    const payment = "Cash on Delivery"

    type Account = {
        email: string;
        password: string
    }

    type Product = {
        name: string;
        quantity: string
        price: string;
        total: string
    }

    type Address = {
        country: string;
        postalCode: string;
        houseNumber: string;
        street: string;
        city: string;
        state: string;
    }

    type Payment = string;

test("Verify checkout flow",async ({ page }) => {

    // Login    
    await page.goto(baseURL);
    await page.getByRole("link", { name: "Sign in" }).click();

    await page.getByLabel("Email address *").fill(account.email);
    await page.getByLabel("Password *").fill(account.password);

    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("heading", {name: 'My account'})).toBeVisible();

    // Add product to cart  
    await page.getByRole("link",{name: "Home"}).click();
    await expect(page.getByRole("button", {name: "Seach"}));
    await page.getByRole("heading",{name: product.name}).click();
    await page.getByRole("button",{name: "Increase quantity"}).click();
    await page.getByRole("button", { name: "Add to cart" }).click();

    // Check cart information after adding product    
    await page.locator("//a[@class='nav-link']//*[@data-icon='cart-shopping']").click();
    await expect(page).toHaveURL(`${baseURL}checkout`);
    const table = page.locator("//table[@class='table table-hover']");

    await expect.soft(table.locator("//*[@class='product-title']")).toHaveText(product.name);
    await expect.soft(page.getByLabel(`Quantity for ${product.name}`)).toHaveValue(product.quantity);
    await expect.soft(table.locator("//*[@data-test='product-price']")).toHaveText(product.price);
    await expect.soft(table.locator("//*[@data-test='line-price']")).toContainText(product.total);

    // Proceed checkout
    await page.getByRole("button", {name: "Proceed to checkout"}).click();
    await page.getByRole("button", {name:"Proceed to checkout"}).click();
    
    await page.selectOption("#country", {label:address.country});
    await page.getByLabel("Postal code").fill(address.postalCode);
    await page.getByLabel("House number").fill(address.houseNumber);
    await page.getByLabel("Street").fill(address.street);
    await page.getByLabel("City").fill(address.city);
    await page.getByLabel("State").fill(address.state);
    await page.getByRole("button", {name: "Proceed to checkout"}).click();

    // Payment
    await page.selectOption("#payment-method", {label:payment});
    await page.getByRole("button", {name: "Check payment" }).click();
    await expect(page.locator("//*[@data-test='payment-success-message']")).toBeVisible();
    await page.getByRole("button", {name: "Confirm"}).click();
    await expect(page.locator("//*[@id='order-confirmation']")).toBeVisible();

});