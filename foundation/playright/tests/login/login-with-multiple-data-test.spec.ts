
import { test, expect, Page } from '@playwright/test';

// Hàm login
async function login(
    page: Page,
    email: string,
    password: string = "welcome01"
): Promise<void> {
    await page.goto("https://practicesoftwaretesting.com/");

    await page.getByRole("link", { name: "Sign in" }).click();

    await page.getByLabel("Email address *").fill(email);
    await page.getByLabel("Password *").fill(password);

    await page.getByRole("button", { name: "Login" }).click();
}

// type mô tả bộ dữ liệu đăng nhập
type LoginTestData = {
    email: string;
    password?: string;
    expectedResult: string;
};

// mảng kiểu type
const loginTestCases: LoginTestData[] = [
    {
        email: "",
        password: "welcome01",
        expectedResult: "Thông báo thiếu email"
    },
    {
        email: "not-registeredpracticesoftwaretesting.com",
        password: "welcome01",
        expectedResult: "Thông báo email sai định dạng"
    },
    {
        email: "not-registered@practicesoftwaretesting.com",
        password: "",
        expectedResult: "Thông báo thiếu password"
    },
    {
        email: "not-registered@practicesoftwaretesting.com",
        password: "ab",
        expectedResult: "Thông báo độ dài password không hợp lệ"
    },
    {
        email: "unregistered@example.com",
        password: "welcome01",
        expectedResult: "Thông báo sai email hoặc password"
    },
    {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
        expectedResult: "Chuyển sang trang tài khoản"
    }
];

// kiểm tra kết quả của từng bộ dữ liệu khớp với cột "Expected Result".
test('Verify login with multiple test cases', async ({ page }) => {
    for (const { email, password, expectedResult } of loginTestCases) {
        await login(page, email, password);

        switch (expectedResult) {
            case 'Thông báo thiếu email':
                await expect(page.locator("//*[@data-test='email-error']/div"))
                    .toHaveText('Email is required');
                break;

            case 'Thông báo email sai định dạng':
                await expect(page.locator("//*[@data-test='email-error']/div"))
                    .toHaveText('Email format is invalid');
                break;

            case 'Thông báo thiếu password':
                await expect(page.locator("//*[@data-test='password-error']/div"))
                    .toHaveText('Password is required');
                break;

            case 'Thông báo độ dài password không hợp lệ':
                await expect(page.locator("//*[@data-test='password-error']/div"))
                    .toHaveText('Password length is invalid');
                break;

            case 'Thông báo sai email hoặc password':
                await expect(page.locator("//*[@data-test='login-error']/div"))
                    .toHaveText('Invalid email or password');
                break;

            case 'Chuyển sang trang tài khoản':
                const myAccount = page.getByRole("heading", {name: 'My account'});
                await expect (myAccount).toBeVisible();
                break;
        }
    }
});

