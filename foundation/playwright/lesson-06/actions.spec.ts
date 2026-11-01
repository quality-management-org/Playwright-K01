import { test, expect } from '@playwright/test';

// Demo các action cơ bản của Playwright trên https://practicesoftwaretesting.com/
// Mỗi test = chuỗi thao tác (actions) + các điểm kiểm tra (assertions).

test.describe('Playwright actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test('click, fill - đăng nhập', async ({ page }) => {
    // .click(): bấm chuột trái
    await page.getByRole('link', { name: 'Sign in' }).click();

    // .fill(text): xóa sạch rồi điền text vào ô nhập
    await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
    await page.getByPlaceholder('Your password').fill('welcome01');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
    
    expect(2).toBeLessThan(3);
  });

  // .selectOption(value)
  test('selectOption - sắp xếp sản phẩm theo giá tăng dần', async ({ page }) => {
    const sortDropdown = page.getByLabel('sort');

    await sortDropdown.selectOption('price,asc');

    await expect(sortDropdown).toHaveValue('price,asc');

    // Sau khi sắp xếp, sản phẩm rẻ nhất (Washers) phải đứng đầu danh sách
    await expect(page.getByRole('heading', { level: 5 }).first()).toHaveText('Washers');
  });

  // Dropdown tự làm (không phải thẻ <select>) => không dùng được .selectOption()
  test('dropdown tự làm - đổi ngôn ngữ', async ({ page }) => {
    const languageDropdown = page.getByRole('button', { name: 'Select language' });

    // Bước 1: click để mở dropdown
    await languageDropdown.click();

    // Bước 2: click vào lựa chọn
    await page.getByRole('menuitem', { name: 'FR' }).click();

    await expect(languageDropdown).toContainText('FR');
  });

  // .check() / .uncheck()
  test('check / uncheck - tick và bỏ tick checkbox', async ({ page }) => {
    // const ecoCheckbox = page.getByRole('checkbox', { name: 'Eco' });

    // await ecoCheckbox.check();
    // await expect(ecoCheckbox).toBeChecked();

    // await ecoCheckbox.uncheck();
    // await expect(ecoCheckbox).not.toBeChecked();

    const pliersCheckbox = page.getByLabel('Pliers', { exact: true })

    await pliersCheckbox.check();
    await expect(pliersCheckbox).toBeChecked();
  });

  // .hover()
  test('hover - di chuột lên thẻ sản phẩm', async ({ page }) => {
    const productCard = page.locator('a.card').first();

    await expect(productCard).toHaveCSS('box-shadow', 'none');
    await productCard.hover();
    // Khi hover, thẻ sản phẩm hiện bóng đổ
    await expect(productCard).not.toHaveCSS('box-shadow', 'none');
  });

  // .dblclick()
  test('dblclick - bấm đúp nút tăng số lượng', async ({ page }) => {
    await page.getByRole('heading', { name: 'Combination Pliers' }).click();

    const quantity = page.getByRole('spinbutton');
    await expect(quantity).toHaveValue('1');

    // Bấm đúp = 2 lần click liên tiếp => số lượng tăng từ 1 lên 3
    await page.getByRole('button', { name: 'Increase quantity' }).dblclick();
    await expect(quantity).toHaveValue('3');
  });

  // .press(key)
  test('press - gõ phím Enter để tìm kiếm', async ({ page }) => {
    const searchBox = page.getByPlaceholder('Search');

    await searchBox.fill('Pliers');
    await searchBox.press('Enter');

    await expect(page.getByText('Searched for: Pliers')).toBeVisible();
    await expect(page.getByRole('heading', { level: 5 }).first()).toContainText('Pliers');
  });

  // .setInputFiles(path)
  test('setInputFiles - upload file trong form Contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();

    await page.getByLabel('First name').fill('Linh');
    await page.getByLabel('Last name').fill('Nguyen');
    await page.getByLabel('Email address').fill('linh@example.com');
    await page.getByLabel('Subject').selectOption('customer-service');
    await page.getByLabel('Message').fill('Day la tin nhan demo de thu chuc nang upload file trong Playwright.');

    // Trang chỉ nhận file .txt có dung lượng 0kb
    const uploadInput = page.getByLabel('Attachment');
    await uploadInput.setInputFiles('test-data/empty.txt');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('Thanks for your message!')).toBeVisible();
  });
});

test.describe('dblclick trên website khác', () => {
  // Nút này chỉ phản hồi sự kiện dblclick, click thường không có tác dụng
  test('dblclick - nút Double Click Me trên DemoQA', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    const doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
    const message = page.getByText('You have done a double click');

    await doubleClickButton.click();
    await expect(message).toBeHidden();

    await doubleClickButton.dblclick();
    await expect(message).toBeVisible();
  });
});
