import { test, expect } from "@playwright/test";

// Vào trang chủ, lấy tên 9 sản phẩm ở trang 1, lưu vào mảng firstPageNames
test("lấy toàn bộ tên sản phẩm vào mảng", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  const productName = await page.locator('[data-test="product-name"]');
  await productName.first().waitFor();
  const firstPageName: string[] = await productName.allTextContents();
  for (let i = 0; i < firstPageName.length && i < 9; i++) {
    firstPageName[i] = firstPageName[i].trim();
  }
  console.log(firstPageName);
  expect(firstPageName).toHaveLength(9);
  expect(firstPageName).toContain("Thor Hammer");
});

//Đi qua tất cả các trang (các nút số trang 1, 2, 3 ở cuối danh sách), gộp tên sản phẩm
test("Lay all product trên 2 trang", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  const allProductNames: string[] = [];
  for (let i = 1; i <= 3; i++) {
    if (i > 1) {
      await page.getByRole("button", { name: `Page-${i}` }).click();
      await page.waitForTimeout(1000);
    }

    const productName = page.locator('[data-test="product-name"]');
    await productName.first().waitFor();

    const listAllProducts: string[] = await productName.allTextContents();
    for (let y = 0; y < listAllProducts.length && y < 9; y++) {
      listAllProducts[y] = listAllProducts[y].trim();
    }
    allProductNames.push(...listAllProducts);
  }
  console.log(allProductNames);
  console.log("Tong so produc: " + allProductNames.length);
  const hammer: string[] = allProductNames.filter((name: string) =>
    name.toLowerCase().includes("hammer"),
  );
  console.log(hammer);
});
