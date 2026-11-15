import { test, expect } from "@playwright/test";
test ("register", async ({page})=>{
await page.goto("https://practicesoftwaretesting.com/auth/login");
await page.locator('[data-test="register-link"]').click() ;
await page.locator('[data-test="first-name"]').fill("Ngoc");
await page.locator('[data-test="last-name"]').fill("Ngoc");
await page.locator('[data-test="dob"]').fill("1992-04-03");
await page.locator('[data-test="country"]').selectOption("Viet Nam");
await page.locator('[data-test="postal_code"]').fill("19920403");
await page.locator('[data-test="house_number"]').fill("19920403");
await page.locator('[data-test="street"]').fill("Thanh Binh");
await page.locator('[data-test="city"]').fill("Ha Noi");
await page.locator('[data-test="phone"]').fill("19920403");
await page.locator('[data-test="email"]').fill("ngoc19920403@test.com");
await page.locator('[data-test="password"]').fill("MeoMeo$$Meo@12345");
await page.locator('[data-test="register-submit"]').click();

await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/login");


});