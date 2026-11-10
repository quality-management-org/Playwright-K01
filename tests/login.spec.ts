import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login/login.page";
import user from "../test-data/login.json";
import AccountPage from "../pages/account/account.page";

test('Verify login to dashboard successfully', async({page}) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    await test.step("Step 1: Open login page", async () => {
        await loginPage.goToSignin();
        await expect(loginPage.heading).toBeVisible();
    });

    await test.step("Step 2: Login to dashboard", async () => {  
        await loginPage.login(user.account);
        await expect(page).toHaveURL(/account/);
        await expect(accountPage.heading).toBeVisible();
    });


});