import AccountPage from "@pages/account/account.page";
import { LoginPage } from "@pages/login/login.page";
import test, { expect } from "@playwright/test";
import { sharedAccount } from "@utils/env";

test("TC05: Login to dashboard successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    await test.step("Step 1: Open login page", async () => {
        await loginPage.openURL();
        await loginPage.goToSignin();
        await expect(loginPage.heading).toBeVisible();
    });

    await test.step("Step 2: Enter email and password, click Login", async () => {
        await loginPage.login(sharedAccount);
        await expect(page).toHaveURL(/account/);
        await expect(accountPage.heading, "heading is not visible").toBeVisible();
    });
});
