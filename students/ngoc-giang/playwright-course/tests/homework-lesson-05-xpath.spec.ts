import { test, expect } from "@playwright/test";

test("locator Playwright và XPath", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  //Giá của sản phẩm có tên đúng bằng "Pliers"
  const pricePlaywright = page.locator(".card").filter({
    has: page.locator('[data-test="product-name"]', {
      hasText: /^\s*Pliers\s*$/,
    }),
  });

  await expect(
    pricePlaywright.locator('[data-test="product-price"]'),
  ).toHaveText("$12.01");
  const priceXpath = page.locator(
    '//*[@data-test="product-name"][normalize-space(.)= "Pliers"]/parent::*/following-sibling::*//*[@data-test="product-price"]',
  );
  await expect(priceXpath).toHaveText("$12.01");
  //Các mục con của danh mục "Hand Tools" ở bộ lọc (đếm số lượng)
  const listSubCategory = await page
    .locator('//label[normalize-space(.)="Hand Tools"]/../ul//input')
    .count();
  console.log(listSubCategory);

  // Tất cả nút "Compare" (đếm số lượng)
  const buttonCompare = await page
    .locator('//button[contains(@class,"compare-btn")]')
    .count();
  console.log(buttonCompare);

  //Tất cả thẻ sản phẩm (đếm số lượng)
  const countProductscard = await page.locator(
    '//a[starts-with(@href, "/product/")]',
  );
  console.log("Total the product:" + countProductscard.count());

  //Tên các sản phẩm có chữ "Hammer"
  const allProductNames = await page
    .locator('[data-test="product-name"]')
    .allTextContents();
  const hammer: string[] = allProductNames.filter((name: string) =>
    name.includes("Hammer"),
  );
  console.log("Tên các sản phẩm có chữ Hammer " + hammer);

  // Tên các sản phẩm có chữ "Hammer" nhưng không có chữ "Claw"
  const includeHammer: string[] = await page
    .locator(
      '//*[@data-test="product-name"and contains(., "Hammer") and not(contains(.,"Claw"))]',
    )
    .allTextContents();
  console.log(includeHammer);

  //Tên các sản phẩm không có chữ "Pliers"
  const notPliers: string[] = await page
    .locator('//*[@data-test="product-name" and not(contains(.,"Pliers"))]')
    .allTextContents();
  console.log(notPliers);

  //Tên 2 sản phẩm "Pliers" và "Hammer" (đúng tên, lấy cùng lúc)
  const bothPliersHammer: string[] = await page
    .locator(
      '//*[@data-test="product-name" and (normalize-space(.) = "Pliers" or normalize-space(.) = "Hammer")]',
    )
    .allTextContents();
  console.log("Tên 2 sản phẩm Pliers và Hammer " + bothPliersHammer);

  // Tên sản phẩm đang hết hàng
  const outOfStock: string[] = await page
    .locator(
      '//a[.//*[@data-test="product-name"] and .//*[@data-test="out-of-stock"]]//*[@data-test="product-name"]',
    )
    .allTextContents();
  console.log("Tên sản phẩm đang hết hàng: " + outOfStock);

  //Giá trị thông số "Material"
  await page
    .locator(
      '//*[@data-test="product-name" and normalize-space(.)="Combination Pliers"]',
    )
    .click();
  const material = await page
    .locator(
      '//td[@data-test="spec-name" and normalize-space(.)="Material"]/following-sibling::td/span[@data-test="spec-value-text"]',
    )
    .textContent();
  console.log("Giá trị thông số Material " + material);
  //Nút giảm số lượng, bắt đầu từ ô số lượng
  await page
    .locator(
      '//*[@data-test="quantity"]/following-sibling::button[@id="btn-increase-quantity"]',
    )
    .click();
  const decreaseQuantity = await page
    .locator(
      '//*[@data-test="quantity"]/preceding-sibling::button[@id="btn-decrease-quantity"]',
    )
    .click();

  //B3 Tên các sản phẩm trong khu vực "Related products"
  const relatedProducts: string[] = await page
    .locator(
      '//h2[text()="Related products"]/following::*[@class="card-title"]',
    )
    .allTextContents();
  console.log(
    "Tên các sản phẩm trong khu vực related products: " + relatedProducts,
  );
  //B4: Đơn giá, bắt đầu từ nút "Add to cart"
  const priceUnit = await page
    .locator(
      '//button[@data-test="add-to-cart"]/preceding::*[@data-test="unit-price"]',
    )
    .allTextContents();
  console.log("Unit price: " + priceUnit);
  //B5 Các dòng của bảng Specifications (đếm số lượng) //*[@data-test="specs-title"]/following::*[@data-test="spec-row"]
  const specifications = await page
    .locator('//tbody/child::*[@data-test="spec-row"]')
    .count();
  console.log("Số lượng Specifications: " + specifications);

  //B6 Giá có cả ký hiệu $, bắt đầu từ phần tử đơn giá //span/*[@data-test="unit-price"]
  const price = await page.locator('//*[@data-test="unit-price"]/parent::span');
  console.log("Giá có cả ký hiệu: " + price);
});
