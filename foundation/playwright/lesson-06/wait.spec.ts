import { test, expect } from '@playwright/test';

// Demo các hàm wait của Playwright.
// Phần lớn chạy trên https://practicesoftwaretesting.com/ (API: https://api.practicesoftwaretesting.com)
// Các trường hợp trang này không có (dialog, download, phần tử biến mất) dùng https://the-internet.herokuapp.com/

const BASE_URL = 'https://practicesoftwaretesting.com/';
const API_URL = 'https://api.practicesoftwaretesting.com';
const INTERNET_URL = 'https://the-internet.herokuapp.com';

test.describe('locator.waitFor()', () => {
  // count() và allInnerTexts() KHÔNG tự chờ => phải waitFor() trước
  // Thực tế: mở Shopee/Tiki, khung trang hiện trước, danh sách sản phẩm gọi API nên hiện sau 1-2 giây.
  //          Muốn đếm số sản phẩm hoặc lấy tên sản phẩm thì phải chờ danh sách hiện ra.
  // Trên trang này: trang chủ hiện các ô trống (skeleton) trước, sau đó mới có 9 sản phẩm
  //          => chờ sản phẩm đầu tiên hiện ra rồi mới đếm và lấy tên.
  test('waitFor (visible) trước count() và allInnerTexts()', async ({ page }) => {
    await page.goto(BASE_URL);

    // Dùng data-test="product-name" thay vì thẻ h5, vì lúc đang tải trang hiện các thẻ h5 rỗng (skeleton)
    const productNames = page.getByTestId('product-name');

    // Không chờ: danh sách sản phẩm tải bằng API nên lúc này có thể vẫn chưa có gì => count() = 0
    // console.log(await productNames.count());

    // Mặc định state = 'visible'. waitFor() chỉ chạy trên 1 phần tử => dùng .first()
    await productNames.first().waitFor();

    // Trang chủ hiển thị 9 sản phẩm mỗi trang
    expect(await productNames.count()).toBe(9);

    // allInnerTexts() lấy chữ đúng như hiển thị trên màn hình (không thừa khoảng trắng)
    const names = await productNames.allInnerTexts();
    expect(names).toContain('Combination Pliers');
    expect(names).toContain('Bolt Cutters');
  });

  // Thực tế: bấm "Lưu" => hiện vòng xoay loading => phải chờ loading biến mất (hidden) mới kiểm tra kết quả.
  //          Bấm "Xóa" sản phẩm trong giỏ hàng => sản phẩm phải bị xóa hẳn khỏi trang (detached).
  // Trên trang này: bấm Remove => hiện thanh loading "Wait for it..." => checkbox bị xóa => hiện "It's gone!"
  test('waitFor các state: attached, hidden, detached', async ({ page }) => {
    await page.goto(`${INTERNET_URL}/dynamic_controls`);
    const checkbox = page.locator('#checkbox');
    const loading = page.locator('#loading');

    // attached: có trong DOM (không cần nhìn thấy)
    await checkbox.waitFor({ state: 'attached' });

    // Bấm Remove => hiện loading một lúc, sau đó checkbox bị xóa khỏi DOM
    await page.getByRole('button', { name: 'Remove' }).click();

    // hidden: không nhìn thấy (bị ẩn HOẶC không có trong DOM)
    await loading.waitFor({ state: 'hidden' });

    // detached: đã bị xóa khỏi DOM
    await checkbox.waitFor({ state: 'detached' });
    expect(await checkbox.count()).toBe(0);
    await expect(page.locator('#message')).toHaveText("It's gone!");
  });
});

test.describe('page.waitForURL()', () => {
  // Thực tế: đăng nhập ngân hàng điện tử => hệ thống kiểm tra tài khoản => chuyển sang /dashboard.
  //          Hàm login() trong Page Object phải chờ chuyển trang xong, test sau mới thao tác được.
  // Trên trang này: đăng nhập thành công => chuyển từ /auth/login sang /account
  test('waitForURL - chờ chuyển sang trang My account sau khi đăng nhập', async ({ page }) => {
    await page.goto(`${BASE_URL}auth/login`);
    await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
    await page.getByPlaceholder('Your password').fill('welcome01');
    await page.getByRole('button', { name: 'Login' }).click();

    // Chờ URL khớp và trang tải xong (dùng nhiều trong Page Object)
    await page.waitForURL('**/account');
    // Có thể dùng regex: await page.waitForURL(/\/account$/);

    // Trong test, ưu tiên assertion vì vừa chờ vừa kiểm tra
    await expect(page).toHaveURL(/\/account$/);
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
  });
});

test.describe('page.waitForLoadState()', () => {
  // Thực tế: trang tin tức nhiều ảnh, chỉ cần kiểm tra tiêu đề => chờ domcontentloaded là đủ, test nhanh hơn.
  //          Trang dashboard báo cáo gọi nhiều API cùng lúc => networkidle (nhưng không khuyến khích).
  // Trên trang này: trang chủ có ảnh banner, ảnh sản phẩm và gọi nhiều API (products, brands, categories...)
  test('waitForLoadState - load, domcontentloaded, networkidle', async ({ page }) => {
    // goto() mặc định đã tự chờ 'load' => thường không cần waitForLoadState()
    await page.goto(BASE_URL);

    // domcontentloaded: HTML đã tải và phân tích xong (chưa cần ảnh, css...)
    await page.waitForLoadState('domcontentloaded');

    // load (mặc định): tải xong cả ảnh, css, script
    await page.waitForLoadState();

    // networkidle: không còn request mạng nào trong ít nhất 500ms
    // Playwright KHÔNG khuyến khích dùng trong test, chỉ để demo
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { level: 5 }).first()).toBeVisible();
  });
});

test.describe('page.waitForResponse()', () => {
  // Thực tế: giao diện chỉ báo "Đăng nhập thất bại" chung chung. Tester cần biết lỗi thật:
  //          sai mật khẩu (401), tài khoản bị khóa (403) hay server sập (500)?
  // Trên trang này: nhập sai mật khẩu => API /users/login trả về 401 kèm thông báo lỗi
  test('waitForResponse - đăng nhập sai mật khẩu, API trả về 401', async ({ page }) => {
    await page.goto(`${BASE_URL}auth/login`);
    await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
    await page.getByPlaceholder('Your password').fill('sai-mat-khau');

    // Bắt đầu chờ TRƯỚC khi click (không await), nếu không sẽ bỏ lỡ response
    const responsePromise = page.waitForResponse(`${API_URL}/users/login`);
    await page.getByRole('button', { name: 'Login' }).click();
    const response = await responsePromise;

    // Kiểm tra status code và dữ liệu API trả về
    // Lưu ý: nếu sau đó trang chuyển hẳn sang trang khác thì không đọc được body nữa
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBeTruthy();
  });

  // Thực tế: tìm "iPhone", API trả về 4 sản phẩm nhưng giao diện chỉ hiện 3 do lỗi hiển thị
  //          => đối chiếu dữ liệu API với dữ liệu trên màn hình để phát hiện.
  // Trên trang này: tìm "Pliers" => trang gọi cùng lúc nhiều API (products, brands, categories...)
  //          => phải lọc đúng API /products/search, sau đó so số sản phẩm API trả về với số trên màn hình
  test('waitForResponse với điều kiện - kiểm tra kết quả tìm kiếm', async ({ page }) => {
    await page.goto(BASE_URL);

    // Truyền hàm để lọc response theo nhiều điều kiện
    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('/products/search') && res.status() === 200
    );
    await page.getByPlaceholder('Search').fill('Pliers');
    await page.getByPlaceholder('Search').press('Enter');
    const response = await responsePromise;

    const body = await response.json();
    expect(body.data.length).toBe(4);

    // Dữ liệu trên giao diện khớp với dữ liệu API
    await expect(page.getByRole('heading', { level: 5 })).toHaveCount(body.data.length);
  });
});

test.describe('page.waitForRequest()', () => {
  // Thực tế: form chuyển khoản, nhập "1.000.000" => frontend gửi lên 1000000 hay gửi nhầm 1?
  //          Request sai => lỗi của frontend. Response sai => lỗi của backend.
  // Trên trang này: bấm Login => kiểm tra trình duyệt gửi lên API đúng method POST và đúng email đã nhập
  test('waitForRequest - đăng nhập có gửi đúng email lên API không', async ({ page }) => {
    await page.goto(`${BASE_URL}auth/login`);
    await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
    await page.getByPlaceholder('Your password').fill('welcome01');

    const requestPromise = page.waitForRequest(`${API_URL}/users/login`);
    await page.getByRole('button', { name: 'Login' }).click();
    const request = await requestPromise;

    expect(request.method()).toBe('POST');
    expect(request.postDataJSON().email).toBe('customer@practicesoftwaretesting.com');
  });
});

test.describe('page.waitForEvent()', () => {
  // Thực tế: bấm "Thanh toán qua VNPay/MoMo" hoặc "Đăng nhập bằng Google" => mở tab/cửa sổ mới.
  //          Không bắt popup thì page vẫn trỏ vào tab cũ, thao tác tiếp sẽ không tìm thấy gì.
  // Trên trang này: link "Documentation" ở đầu trang có target="_blank" => mở tài liệu ở tab mới
  test('popup - link Documentation mở tab mới', async ({ page }) => {
    await page.goto(BASE_URL);

    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Documentation' }).click();
    const newTab = await popupPromise;

    await expect(newTab).toHaveURL(/testsmith-io\.github\.io\/practice-software-testing/);
  });

  // Thực tế: nộp hồ sơ tuyển dụng, bấm "Tải CV lên" => mở hộp thoại chọn file của Windows/macOS.
  //          Hay gặp khi input file bị ẩn sau một nút tự làm, khó viết locator cho input.
  // Trên trang này: trang Contact có ô Attachment để đính kèm file .txt
  test('filechooser - chọn file trong form Contact', async ({ page }) => {
    await page.goto(`${BASE_URL}contact`);

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByLabel('Attachment').click();
    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles('test-data/empty.txt');
    await expect(page.getByLabel('Attachment')).toHaveValue(/empty\.txt$/);
  });

  // Thực tế: bấm "Xuất báo cáo Excel", "Tải sao kê", "Tải phiếu lương"
  //          => kiểm tra có tải được file không và tên file có đúng không.
  // Trên trang này: danh sách link file, click vào link đầu tiên => trình duyệt tải file đó về
  test('download - tải file về', async ({ page }) => {
    await page.goto(`${INTERNET_URL}/download`);
    const firstFileLink = page.locator('.example a').first();
    const fileName = await firstFileLink.textContent();

    const downloadPromise = page.waitForEvent('download');
    await firstFileLink.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe(fileName);
  });

  // Thực tế: bấm "Xóa tài khoản" / "Hủy đơn hàng" => hiện "Bạn có chắc chắn?" với nút OK và Hủy.
  //          Không xử lý thì Playwright tự bấm Hủy => tài khoản không bị xóa, test kiểm tra sai.
  // Trên trang này: bấm "Click for JS Confirm" => hiện hộp confirm => bấm OK => hiện "You clicked: Ok"
  test('dialog - hộp thoại confirm của trình duyệt', async ({ page }) => {
    await page.goto(`${INTERNET_URL}/javascript_alerts`);

    // Hộp thoại chặn trang đến khi được xử lý => không await click() trước khi xử lý dialog
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept();
    await clickPromise;

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });
});

test.describe('page.waitForTimeout()', () => {
  // Chờ cứng một khoảng thời gian => test chậm và dễ lỗi khi mạng chậm.
  // KHÔNG dùng trong test thật, chỉ dùng tạm khi debug để quan sát trang.
  // Thực tế: test thỉnh thoảng fail, ai đó thêm waitForTimeout(3000) => pass. Hôm server chậm cần 4 giây => lại fail.
  //          Hôm server nhanh vẫn phí 3 giây chờ. 500 test => thêm khoảng 25 phút mỗi lần chạy.
  // Trên trang này: chờ cứng 2 giây cho danh sách sản phẩm hiện ra. Mạng nhanh thì phí thời gian, mạng chậm thì vẫn có thể fail.
  test('waitForTimeout - chỉ dùng khi debug', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForTimeout(2000);

    await expect(page.getByRole('heading', { level: 5 }).first()).toBeVisible();
  });
});
