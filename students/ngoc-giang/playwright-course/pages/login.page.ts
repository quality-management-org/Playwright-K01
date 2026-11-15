
import { Page, expect } from '@playwright/test';


export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLogin() {
        const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
        throw new Error('BASE_URL is missing in .env');
    }
        await this.page.goto(baseUrl);
        await this.page.getByRole('link', { name: 'Sign in' }).click();
    }

    async login() {
        const email= process.env.EMAIL;
        const passWord= process.env.PASSWORD;
        if (!email || !passWord) {
        throw new Error('EMAIL or PASSWORD is missing in .env');
    }
        await this.page
            .getByRole('textbox', { name: 'Email address *' })
            .fill(email);

        await this.page
            .getByRole('textbox', { name: 'Password *' })
            .fill(passWord);

        await this.page.getByRole('button', { name: 'Login' }).click({timeout:3000});
    }

    async verifyLoginSuccess() {
        await expect(
            this.page.getByRole('heading', { name: 'My account' }),
            'Login should succeed and display My account heading'
        ).toBeVisible();
    }
}
