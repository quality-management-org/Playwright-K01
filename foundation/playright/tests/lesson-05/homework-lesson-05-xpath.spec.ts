import { test, expect } from "@playwright/test";

test("Phần A: trang chủ (trang 1, chưa lọc, chưa sắp xếp)", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");

// A1: Giá của sản phẩm có tên đúng bằng "Pliers"  
const pliersCard = page
  .locator(".card")
  .filter({
    has: page.locator('[data-test="product-name"]').getByText("Pliers", { exact: true })
  });
await expect(pliersCard.locator('[data-test="product-price"]')).toHaveText("$12.01");

const price = page.locator(
  "//h5[normalize-space()='Pliers']/parent::div/following-sibling::div//span[@data-test='product-price']"
);

await expect(price).toBeVisible();

// A2: Các mục con của danh mục "Hand Tools" ở bộ lọc (đếm số lượng)
const handToolsFilter = page
    .locator(".icheck")
    .filter({ hasText: "Hand Tools" });
console.log(await handToolsFilter.count());

const handToolsCount2 = page.locator(
    "//label[normalize-space()='Hand Tools']/following-sibling::ul//input"
).count();
console.log(`Tổng số mục con của danh mục Hand Tools là: ${handToolsCount2}`);

// A3: Nút "X" (xóa ô tìm kiếm), bắt đầu từ nút "Search"

const deleteButton1 = page.locator('[data-test="search-reset"]');
await expect(deleteButton1).toBeVisible();

const deleteButton2 = page.locator(
    "//button[normalize-space()='Search']/preceding-sibling::button[@data-test='search-reset']"
);
await expect(deleteButton2).toBeVisible();

// A4: Tiêu đề đứng ngay trước tiêu đề "Sustainability:"
const byBrandLabel1 = page.getByText("By brand:");
await expect(byBrandLabel1).toBeVisible();


const sustainabilityLabel2 = page.locator(
    "//h4[normalize-space()='Sustainability:']/preceding-sibling::h4[1]"
);
await expect(sustainabilityLabel2).toHaveText("By brand:");

// A5: Tất cả nút "Compare" (đếm số lượng)
const compareButton1 = page.getByRole("button", { name: "Compare" });
await expect(compareButton1).toHaveCount(9);

const compareButton2 = page.locator(
    "//button[@data-test='compare-btn']"
).count();
console.log(`Tổng số nút Compare là: ${compareButton2}`);

// A6: Tất cả thẻ sản phẩm (đếm số lượng)

const productCards1 = page.locator(".card").count();
console.log(`Tổng số thẻ sản phẩm là: ${productCards1}`);

const productCards2 = page.locator("//a[starts-with(@href,'/product/')]").count();
console.log(`Tổng số thẻ sản phẩm là: ${productCards2}`);

// A7: Tên các sản phẩm có chữ "Hammer"
const hammerProducts = page
    .locator(".card")
    .filter({ hasText: "Hammer" });
console.log(await hammerProducts.count());

const productHammers = page.locator(
    "//h5[@data-test='product-name' and contains(text(),'Hammer')]"
).count();
console.log(`Tổng số thẻ sản phẩm có tên là "Hammer" là: ${productHammers}`);

// A8: Tên các sản phẩm có chữ "Hammer" nhưng không có chữ "Claw"
const hammernotclawProducts = page
    .locator(".card")
    .filter({ hasText: "Hammer" })
    .filter({ hasNotText: "Claw" });
console.log(await hammernotclawProducts.count());

const productHammers2 = page.locator(
    "//h5[@data-test='product-name' and contains(text(),'Hammer') and not(contains(text(),'Claw'))]"
).count();
console.log(`Tổng số thẻ sản phẩm có tên là "Hammer" nhưng không có chữ "Claw" là: ${productHammers2}`);

// A9: Tên các sản phẩm không có chữ "Pliers"
const notPliersProducts = page
    .locator(".card")
    .filter({ hasNotText: "Pliers" });
console.log(await notPliersProducts.count());

const productNotPliers = page.locator(
    "//h5[@data-test='product-name' and not(contains(text(),'Pliers') )]"
).count();
console.log(`Tổng số thẻ sản phẩm không có chữ "Pliers" là: ${productNotPliers}`);  

// A10: Tên 2 sản phẩm "Pliers" và "Hammer" (đúng tên, lấy cùng lúc)
const pliersAndHammerProducts = page
    .locator(".card")
    .filter({ hasText: "Pliers" })
    .filter({ hasText: "Hammer" });
console.log(await pliersAndHammerProducts.count());

 const productPliersAndHammer = page.locator(
    "//h5[@data-test='product-name' and (normalize-space(.) = 'Pliers' or normalize-space(.) = 'Hammer')]"
).count();
console.log(`Tổng số thẻ sản phẩm có tên là "Pliers" hoặc "Hammer" là: ${productPliersAndHammer}`);

// A11: Tên sản phẩm đang hết hàng
const productOutOfStock1 = page
    .locator(".card")
    .filter({ hasText: "Out of stock" });
console.log(await productOutOfStock1.count());

const productOutOfStock = page.locator(
    "//h5[@data-test='product-name' and .//span[@data-test='out-of-stock']]"
).count();
console.log(`Tổng số thẻ sản phẩm đang hết hàng là: ${productOutOfStock}`);

});

test("Phần B: trang chi tiết Combination Pliers (bấm vào thẻ sản phẩm từ trang chủ)", async ({ page }) => {
await page.goto("https://practicesoftwaretesting.com/");
await page.locator('[data-test="product-name"]')
  .filter({ hasText: 'Combination Pliers' })
  .click();

// B1: Giá trị thông số "Material"
const materialValue1 = page
      .locator("tr")
      .filter({
    has: page.locator("[data-test='spec-name']")
      .filter({ hasText: /^Material$/ })
  });
await expect(materialValue1.locator("[data-test='spec-value-text']")).toHaveText("Chrome Vanadium Steel");      

const materialValue2 = page.locator(
    "//td[normalize-space()='Material']/following-sibling::td/span[@data-test='spec-value-text']"
);
await expect(materialValue2).toHaveText("Chrome Vanadium Steel");

// B2: Nút giảm số lượng, bắt đầu từ ô số lượng

const decreaseButton1 = page.locator('[data-test="decrease-quantity"]');
await expect(decreaseButton1).toBeVisible();

const decreaseButton2 = page.locator(
    "//input[@id='quantity-input']/preceding-sibling::button[@id='btn-decrease-quantity']//*[@class='svg-inline--fa fa-minus fa-undefined fa-pull-undefined']"
);
await expect(decreaseButton2).toBeVisible();

// B3: Tên các sản phẩm trong khu vực "Related products"

const relatedProducts1 = page
    .locator(".card")
    .filter({ hasText: "Related products" });
console.log(await relatedProducts1.count());

const relatedProducts2 = page.locator(
    "//h2[normalize-space()='Related products']/following::*[@class='card-title']"
).count();
console.log(`Tổng số thẻ sản phẩm trong khu vực "Related products" là: ${relatedProducts2}`);

// B4: Đơn giá, bắt đầu từ nút "Add to cart"

const price1 = page.locator('[data-test="unit-price"]');
await expect(price1).toHaveText("14.15");

const price2 = page.locator(
    "//*[normalize-space()='Add to cart']/preceding::span[@data-test='unit-price']"
);
await expect(price2).toHaveText("14.15");

// B5: Các dòng của bảng Specifications (đếm số lượng)

const specificationsRows1 = page.locator('[data-test="spec-row"]').count();
console.log(`Tổng số dòng của bảng Specifications là: ${specificationsRows1}`);

const specificationsRows2 = page.locator(
    "//table[@class='table table-striped specs-table']/child::tbody/child::tr[@data-test='spec-row']").count();
console.log(`Tổng số dòng của bảng Specifications là: ${specificationsRows2}`);

// B6: Giá có cả ký hiệu $, bắt đầu từ phần tử đơn giá

const unitPrice = page.locator(
  "//span[@data-test='unit-price']/parent::span"
);

console.log(await unitPrice.innerText());

})
