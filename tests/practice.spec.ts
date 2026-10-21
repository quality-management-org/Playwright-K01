import { test, expect } from "@playwright/test";

test("hàm check và uncheck radio button", async ({ page }) => {
  await page.goto("https://demoqa.com/radio-button");

  await page.getByRole("radio", { name: "Yes" }).check();
  // await page.getByRole("radio", { name: "Yes" }).uncheck();

});

test("hàm check và uncheck toggle", async ({ page }) => {
  await page.goto("https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch/");

  await page.getByRole("switch", {name: "Notifications"}).check();
  // await page.getByRole("switch", {name: "Notifications"}).uncheck();
});

test("verify hiển thị text", async ({ page }) => {
    await page.goto("https://demoqa.com/frames");
    const iframe = page.locator("frame1").contentFrame();
    const isTextVisible = iframe.getByRole("heading", { name: "This is a sample page" }).isVisible();
    
    console.log(`Verify element visible: ${isTextVisible}`);
});

test("select dropdown language",async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByRole("button", {name: 'Select language'}).click();
    await page.getByRole("menuitem", { name: "DE" }).click();
});