import { Account } from "../../data-types/user.type";
import { BasePage } from "../base.page";

export class LoginPage extends BasePage{
    emailInput = this.page.getByLabel("Email address *");
    passwordInput = this.page.getByLabel("Password *");
    loginBtn = this.page.getByRole('button', {name: "Login"});
    heading = this.page.getByRole('heading', {name: "Login"});

    async fillEmail(email:string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password:string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }
    
    async login(account: Account) {
        await this.fillEmail(account.email);
        await this.fillPassword(account.password);
        await this.clickLoginBtn();
    }
}