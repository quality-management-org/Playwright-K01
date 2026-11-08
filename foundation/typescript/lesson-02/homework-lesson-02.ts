// Trường hợp gọi API thất bại
async function getProductsFailed() {
    const response = await fetch ("https://fakestoreapi.com/product");
    if (response.ok == false) {
    console.error(`Lỗi khi gọi API: ${response.status}`);
    return;
  }
    else{
        const products = await response.json();
        console.log(`Tổng số sản phẩm là: ${products.length} `);
        console.log(`Tên của sản phẩm đầu tiên là: ${products[0].title}`);
    }
    }
getProductsFailed();

// Trường hợp gọi API thành công
async function getProductsPassed() {
    const response = await fetch ("https://fakestoreapi.com/products");
    if (response.ok == false) {
    console.error(`Lỗi khi gọi API: ${response.status}`);
    return;
  }
    else{
        const products = await response.json();
        console.log(`Tổng số sản phẩm là: ${products.length} `);
        console.log(`Tên của sản phẩm đầu tiên là: ${products[0].title}`);
    }
    }
getProductsPassed();