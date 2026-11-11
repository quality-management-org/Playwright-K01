import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly contactLink: Locator;
    readonly signInLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole("link", { name: "Home" });
        this.contactLink = page.getByRole("link", { name: "Contact" });
        this.signInLink = page.getByRole("link", { name: "Sign in" });
    }

    async openURL() {
        await this.page.goto('/');
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
