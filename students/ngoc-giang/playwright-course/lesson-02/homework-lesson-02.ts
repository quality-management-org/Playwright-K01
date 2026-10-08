// Bài 1: gọi API và kiểm tra kết quả trả về
async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");

  if (response.ok === false) {
    console.log("Error" + response.status);
    return;
  } else {
    const products = await response.json();
    console.log("Tổng số sản phẩm " + products.length);
    console.log("Product đầu tiên " + products[0].title);
  }
}
getProducts();
