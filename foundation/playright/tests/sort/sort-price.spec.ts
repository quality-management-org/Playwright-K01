
import { test, expect, Page } from '@playwright/test';

// Check whether prices are sorted
function isSorted(
    prices: number[],
    direction: "asc" | "desc"
): boolean {
    for (let i = 0; i < prices.length - 1; i++) {
        if (direction === "asc" && prices[i] > prices[i + 1]) {
            return false;
        }

        if (direction === "desc" && prices[i] < prices[i + 1]) {
            return false;
        }
    }

    return true;
}

// Get all product prices
async function getProductPrices(page: Page) {
    const priceElements = page.locator('[data-test="product-price"]');

    const count = await priceElements.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
        const priceText = await priceElements.nth(i).innerText();
        const price = Number(priceText.replace(/[^0-9.]/g, ''));

        prices.push(price);
    }

    return prices;
}

// Test ascending order
test('Verify Price Low to High', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/category/power-tools');

    await page.getByLabel('Sort').selectOption({
        label: 'Price (Low - High)'
    });

    const prices = await getProductPrices(page);

    expect(
        isSorted(prices, 'asc'),
        `Prices are not sorted ascending: ${prices}`
    ).toBeTruthy();
});

// Test descending order
test('Verify Price High to Low', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/category/power-tools');

    await page.getByLabel('Sort').selectOption({
        label: 'Price (High - Low)'
    });

    const prices = await getProductPrices(page);

    expect(
        isSorted(prices, 'desc'),
        `Prices are not sorted descending: ${prices}`
    ).toBeTruthy();
});
