import { expect, test } from "@playwright/test";

test('verify login to dashboard successfully', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.getByLabel('Email address *').fill('customer@practicesoftwaretesting.com');
    await page.getByLabel('Password *').fill('welcome01');
    await page.getByRole('button', { name: 'Login' }).click();

    // Cách 1:
    const myAccount = page.getByRole('heading', { name: 'My account' });
    await expect(myAccount).toBeVisible();

    // Cách 2:
    const isMyAccountVisible = await page.getByRole('heading', { name: 'My account' }).isVisible(); // true/false
    expect(isMyAccountVisible).toBe(true);
});

test('verify toast message after adding product to cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    // View product detail
    await page.getByText("Combination Pliers").click();

    // Click on add to cart button 
    await page.getByRole('button', { name: "Add to cart" }).click()

    // Verify toast message hidden
    const toastMsg = page.getByRole('alert', {name: 'Product added to shopping cart EXE'});
    await expect(toastMsg, {message: 'The toast message is still visible'}).toBeHidden({timeout: 7000});
});


test('verify result when searching product with partial keyword', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    await page.getByLabel('Search').fill('Hammer');
    await page.getByRole('button', {name: 'Search'}).click();

    // toHaveText()
    const heading = page.getByRole('heading', {level: 3});
    await expect(heading).toHaveText('Searched for: Hammer'); // Text đúng 100%

    // toContains() 
    const result = page.locator('//p[@data-testid="search-result-count"]');
    await expect(result).toContainText("4 products found for 'Hammer'");
});


test('verify homepage', async({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    
    await expect.soft(page.getByLabel('sort')).toBeVisible();
    await expect.soft(page.getByLabel('Search Demo')).toBeVisible();
    await expect.soft(page.locator('.pagination')).toBeVisible();
});

test('Filter product by category', async({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.getByLabel('Pliers').check();
    await page.waitForLoadState('domcontentloaded');

    const actProductCount = await page.getByTestId('product-name').count();
    expect(actProductCount).toBe(5);
})