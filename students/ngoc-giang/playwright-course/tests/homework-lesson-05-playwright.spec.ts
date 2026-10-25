import { test, expect } from "@playwright/test";

test("locator Playwright", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  //Giá của sản phẩm có tên đúng bằng "Pliers"
  await page.waitForTimeout(4000);
  const productName = page.getByText("Pliers", { exact: true });
  const productCard = page.locator("a.card").filter({ has: productName });
  const pricePlier = await productCard
    .locator('[data-test="product-price"]')
    .textContent();
  console.log(pricePlier);

  //Các mục con của danh mục "Hand Tools" ở bộ lọc (đếm số lượng)
  const category = page.getByRole("checkbox", { name: "Hand Tools" });
  const parent = page.locator("div.checkbox").filter({ has: category });
  const countCategory = await parent.getByRole("checkbox").count();
  console.log("Các mục con của danh mục Hand Tools " + countCategory);

  // Tất cả nút "Compare" (đếm số lượng)
  const compareButton = await page.getByLabel("Compare").count();
  console.log("Tất cả nút Compare: " + compareButton);

  //Tất cả thẻ sản phẩm (đếm số lượng)

  //Tên các sản phẩm có chữ "Hammer"
  const listHammer: string[] = await page.getByText("Hammer").allTextContents();
  console.log("Tên các sản phẩm có chữ Hammer: " + listHammer);

  // Tên các sản phẩm có chữ "Hammer" nhưng không có chữ "Claw"
  const product = page.locator('[data-test="product-name"]');
  const productHammer: string[] = await product
    .getByText("Hammer")
    .allTextContents();
  const list: string[] = productHammer.filter((text) => !text.includes("Claw"));
  console.log(
    "Tên các sản phẩm có chữ Hammer nhưng không có chữ Claw: " + list,
  );

  //Tên các sản phẩm không có chữ "Pliers"
  const productPliers: string[] = await product.allTextContents();
  const listNotHavePliers: string[] = productPliers.filter(
    (text) => !text.includes("Pliers"),
  );
  console.log("Tên các sản phẩm có chữ Pliers: " + listNotHavePliers);

  //Tên 2 sản phẩm "Pliers" và "Hammer" (đúng tên, lấy cùng lúc)
  const listProductA: string[] = await product.allTextContents();
  const listPliersHammer = listProductA.filter(
    (text) => text.trim() === "Hammer" || text.trim() === "Pliers",
  );
  console.log("Tên 2 sản phẩm: " + listPliersHammer);

  // Tên sản phẩm đang hết hàng
  const product1 = page.getByRole("link");
  const outOfStock = page.getByText("Out of stock");
  const outOfStockProduct = product1.filter({ has: outOfStock });
  const productName1 = await outOfStockProduct
    .getByRole("heading")
    .allTextContents();
  console.log("Tên sản phẩm đang hết hàng: " + productName1);

  //Giá trị thông số "Material"
  const ProductDetail = await product
    .getByText("Pliers", { exact: true })
    .click();
  await page.waitForTimeout(2000);
  const material = page
    .getByRole("row")
    .filter({ has: page.getByRole("cell", { name: "Material", exact: true }) });
  const productMaterial = await material
    .getByRole("cell")
    .nth(1)
    .allTextContents();
  console.log("Giá trị thông số Material:" + productMaterial);

  //Nút giảm số lượng, bắt đầu từ ô số lượng
  const IncreaseQuantity = await page.getByRole("spinbutton").fill("85");
  const DecreaseQuantity = await page
    .getByRole("button", { name: "Decrease quantity" })
    .click();
  const valueQuantity = await page.getByRole("spinbutton").inputValue();
  console.log(valueQuantity);

  //B3 Tên các sản phẩm trong khu vực "Related products"
  const relatedProducts: string[] = await page
    .locator("a.card")
    .filter({ has: page.getByRole("heading") })
    .allTextContents();
  console.log(relatedProducts);

  //B4: Đơn giá, bắt đầu từ nút "Add to cart"
  const priceUnit = await page.getByLabel("unit-price").textContent();
  console.log(priceUnit);

  //B5 Các dòng của bảng Specifications (đếm số lượng) //*[@data-test="specs-title"]/following::*[@data-test="spec-row"]
  const listSpecification = await page
    .locator('[data-test="spec-row"]')
    .count();
  console.log("Tổng Specifications item:" + listSpecification);

  //B6 Giá có cả ký hiệu $, bắt đầu từ phần tử đơn giá //span/*[@data-test="unit-price"]
  const priceUnit1 = await page.locator(".price-section").allTextContents();
  console.log("Giá Unit Price:" + priceUnit1);
});
