import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { Account } from "../../data-types/user.type";

export class LoginPage extends BasePage{

    readonly emailInput = this.page.getByLabel('Email address *');
    readonly passwordInput = this.page.getByLabel('Password *');
    readonly loginBtn = this.page.getByRole('button', {name: 'Login'});
    readonly heading = this.page.getByRole('heading', {name: 'Login'});

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async login(account : Account) {
        await this.fillEmail(account.email);
        await this.fillPassword(account.password);
        await this.clickLoginBtn();
    }
}