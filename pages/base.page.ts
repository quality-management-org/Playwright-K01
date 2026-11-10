import { Locator, Page } from "@playwright/test";

export class BasePage {
    page: Page;
    homeLink: Locator;
    contactLink: Locator;
    signInLink: Locator;

    constructor (page:Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', {name: "Home"});
        this.contactLink = page.getByRole('link', {name: "Contact"});
        this.signInLink = page.getByRole('link', {name: "Sign in"})
    }

    async goToHome() {
        await this.homeLink.click();
    }

    async goToContact() {
        await this.contactLink.click();
    }

    async goToSignin() {
        await this.signInLink.click();
    }

}