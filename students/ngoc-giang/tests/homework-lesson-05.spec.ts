import { test, expect } from "@playwright/test";

test("test Locator", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.locator('[data-test="nav-sign-in"]').click();

    await page
        .locator('[data-test="email"]')
        .fill("customer@practicesoftwaretesting.com");

    await page.locator('[data-test="password"]').fill("welcome01");
    await page.waitForTimeout(3000);
    await page.locator('[data-test="login-submit"]').click();
     await page.waitForTimeout(3000);
    await page.locator('[data-test="nav-home"]').click();
    // Check sort
    await expect(page.locator('[data-test="sort"]')).toBeVisible();

    // Check select data from dropdown
    await page.locator('[data-test="sort"]').selectOption({label:'Price (High - Low)'});


    // check slider
    const maxSlider= page.getByLabel('ngx-slider-max');
    await expect(maxSlider).toBeVisible();
    // check Search plcae holder
    await page.getByPlaceholder('Search').fill("Pliers");
    
    await page.getByRole('button',{name:'Search'}).click();
    


    //verify checkbox
    await expect(page.getByRole('checkbox', { name: 'Tool Belts' })).toBeVisible();
    // get by text

    // await page.locator('svg[data-icon="scale-balanced"]').click();
    // await expect(page.getByText("Compare Now")).toBeVisible();

    // click paging
    await page.getByRole('button',{name:"Page-2"}).click();

 
    await page.locator('[data-test="nav-categories"]').click();
    await expect(page.getByText('Special Tools')).toBeVisible();



});
