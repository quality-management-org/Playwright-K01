import { expect, test } from "@playwright/test";

const BASE_URL = 'https://practicesoftwaretesting.com/';

test("Nội dung: toHaveText, toContainText", async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByLabel('Search').fill('Pliers');
    await page.getByRole('button', { name: 'Search' }).click();

    // toHaveText: khớp TOÀN BỘ chữ
    await expect(page.getByRole('heading', { level: 3 })).toHaveText('Searched for: Pliers');

    // toContainText: chỉ cần CHỨA một phần chữ
    await expect(page.getByText(/products found for/)).toContainText('4 products found');

    // Truyền mảng để kiểm tra lần lượt từng phần tử
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
        'Combination Pliers',
        'Pliers',
        'Long Nose Pliers',
        'Slip Joint Pliers',
    ]);
})

test("Nội dung: toHaveValue", async ({ page }) => {
    await page.goto(BASE_URL);

    // Ô nhập liệu
    const searchInput = page.getByLabel('Search');
    await expect(searchInput).toHaveValue('');
    await searchInput.fill('Hammer');
    await expect(searchInput).toHaveValue('Hammer');

    // <select>: so sánh với value của option, không phải label
    const sort = page.getByLabel('sort');
    await sort.selectOption({ label: 'Price (High - Low)' });
    await expect(sort).toHaveValue('price,desc');

    // Ô số lượng ở trang chi tiết sản phẩm
    await page.getByText('Combination Pliers').first().click();
    const quantity = page.getByTestId('quantity');
    await expect(quantity).toHaveValue('1');
    await page.getByLabel('Increase quantity').click();
    await expect(quantity).toHaveValue('2');
})

test("Trạng thái: toBeChecked", async ({ page }) => {
    await page.goto(BASE_URL);

    const checkbox = page.getByLabel('Hand Saw');
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
})

test("Trạng thái: toBeEnabled, toBeDisabled", async ({ page }) => {
    // Sản phẩm còn hàng: bấm được
    await page.goto(BASE_URL);
    await page.getByText('Combination Pliers').first().click();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeEnabled();

    // Sản phẩm hết hàng: nút và ô số lượng bị vô hiệu hóa
    await page.goto(BASE_URL);
    await page.getByText('Long Nose Pliers').first().click();
    await expect(page.getByText('Out of stock')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeDisabled();
    await expect(page.getByTestId('quantity')).toBeDisabled();
})

test("Thuộc tính: toHaveAttribute, toHaveClass", async ({ page }) => {
    await page.goto(BASE_URL);

    const searchInput = page.getByLabel('Search');
    await expect(searchInput).toHaveAttribute('placeholder', 'Search');
    await expect(searchInput).toHaveAttribute('type', 'text');

    // toHaveClass với chuỗi phải khớp toàn bộ class, dùng regex để kiểm tra một class
    const page1 = page.locator('.pagination li').filter({ has: page.getByLabel('Page-1') });
    const page2 = page.locator('.pagination li').filter({ has: page.getByLabel('Page-2') });
    await expect(page1).toHaveClass('page-item active');
    await expect(page2).not.toHaveClass(/active/);

    await page.getByLabel('Page-2').click();
    await expect(page2).toHaveClass(/active/);
    await expect(page1).not.toHaveClass(/active/);
})

test("Số lượng: toHaveCount", async ({ page }) => {
    await page.goto(BASE_URL);

    const productCards = page.locator('a.card');
    await expect(productCards).toHaveCount(9);

    await page.getByLabel('Search').fill('Pliers');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(productCards).toHaveCount(4);

    // Không tìm thấy sản phẩm nào
    await page.getByLabel('Search').fill('abcxyz');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(productCards).toHaveCount(0);
})

test("Trang: toHaveURL, toHaveTitle", async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveURL(BASE_URL);
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');

    await page.getByText('Combination Pliers').first().click();

    // URL có id sản phẩm thay đổi, nên dùng regex
    await expect(page).toHaveURL(/\/product\//);
    await expect(page).toHaveTitle(/^Combination Pliers/);
})


test("Soft assertion: kiểm tra thông tin sản phẩm", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByText('Combination Pliers').first().click();

    // expect.soft: một dòng fail thì test vẫn chạy tiếp,
    // cuối test báo tất cả các dòng fail cùng lúc
    const addToCart = page.getByRole('button', { name: 'Add to cart' });

    await expect.soft(page.getByRole('heading', { level: 1 })).toHaveText('Combination Pliers');
    await expect.soft(page.getByLabel('category')).toHaveText('Pliers');
    await expect.soft(page.getByLabel('brand')).toHaveText('ForgeFlex Tools');
    await expect.soft(page.getByLabel('unit-price')).toHaveText('14.15');
    await expect.soft(page.getByText('Versatile combination pliers')).toBeVisible();
    await expect.soft(page.getByRole('spinbutton')).toHaveValue('1');
    await expect.soft(addToCart).toBeEnabled();

    // Bảng thông số kỹ thuật: tìm dòng theo tên, kiểm tra giá trị trong dòng đó
    await expect.soft(page.getByRole('row').filter({ hasText: 'Handle Material' })).toContainText('Bi-component');
    await expect.soft(page.getByRole('row').filter({ hasText: 'Length' })).toContainText('200mm');
    await expect.soft(page.getByRole('row').filter({ hasText: 'Warranty' })).toContainText('2years');
    await expect.soft(page.getByRole('row').filter({ hasText: 'Weight' })).toContainText('340g');

    // Dừng test nếu đã có soft assertion fail, tránh chạy các bước sau với dữ liệu sai
    expect(test.info().errors).toHaveLength(0);

    await addToCart.click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart');
})
