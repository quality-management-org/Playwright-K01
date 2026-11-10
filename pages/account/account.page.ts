import { BasePage } from "../base.page";

export default class AccountPage extends BasePage {
    heading = this.page.getByRole('heading', {name: "My Account"});
}