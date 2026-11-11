import { BasePage } from "../base.page";

export default class AccountPage extends BasePage{
    readonly heading = this.page.getByRole('heading', {name: 'My account'});
}