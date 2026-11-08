import { test, expect } from '@playwright/test';

test('Lấy tên 9 sản phẩm ở trang 1', async ({ page }) => {
await page.goto('https://practicesoftwaretesting.com/');

const productNames = page.locator('[data-test="product-name"]');
await expect(productNames.first()).toBeVisible();

const firstPageNames: string[] = (await productNames.allTextContents())
.slice(0, 9)
.map(name => name.trim());
expect(firstPageNames).toHaveLength(9);
console.log(firstPageNames);
})