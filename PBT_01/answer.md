# PHIẾU BÀI TẬP 01

## HTML Fundamental - Cấu trúc, Semantic, Tables & Links

---

### Phần A - Kiểm tra đọc hiểu

#### Câu 1: HTTP & Browser

**1. Thứ tự các bước xảy ra khi gõ vào http://shopee.vn**

- **Bước 1: DNS Lookup** – Trình duyệt gửi yêu cầu phân giải tên miền `shopee.vn` thành địa chỉ IP thông qua DNS server.
- **Bước 2: Thiết lập kết nối TCP** – Sau khi có IP, trình duyệt thiết lập kết nối TCP (bắt tay 3 bước) với server, qua router WiFi → nhà mạng (ISP) → hệ thống phân phối mạng (CDN hoặc data center).
- **Bước 3: Gửi HTTP Request** – Trình duyệt gửi HTTP request (phương thức GET) đến server.
- **Bước 4: Server xử lý** – Server nhận request, xử lý logic, truy vấn cơ sở dữ liệu nếu cần.
- **Bước 5: Server trả về HTTP Response** – Server gửi lại response chứa file HTML, CSS, JS, hình ảnh… theo đường ngược lại về máy client.
- **Bước 6: Render trang** – Trình duyệt nhận file HTML, phân tích cú pháp (parse), xây dựng DOM, tải và áp dụng CSS (CSSOM), thực thi JavaScript, tính toán layout và vẽ (paint) giao diện lên màn hình.

**2. Trong DevTools của Chrome, tab Network cho thấy:**

- Thông tin tổng số request đã gửi, tổng dung lượng tải về, thờigian load.
- Bảng network log gồm các trường:
  - **Name**: tên file / tài nguyên.
  - **Status**: mã phản hồi HTTP (200, 404, 500…).
  - **Type**: loại tài nguyên (document, stylesheet, script, image…).
  - **Initiator**: nguồn kích hoạt request.
  - **Size**: kích thước tài nguyên (đã nén / thô).
  - **Time**: tổng thờigian tải / xử lý.
  - **Waterfall**: biểu đồ thờigian chi tiết từng giai đoạn (queuing, DNS, TCP, request, response…).

---

#### Câu 2: Semantic

**Đoạn mã ban đầu:**

```html
<div class="header">
  <div class="logo">ShopTLU</div>
  <div class="menu">
    <div><a href="/">Trang chủ</a></div>
    <div><a href="/products">Sản phẩm</a></div>
  </div>
</div>
<div class="main">
  <div class="product">
    <div class="title">iPhone 16 Pro</div>
    <div class="price">25.990.000đ</div>
    <div class="image"><img src="iphone.jpg" /></div>
  </div>
</div>
<div class="footer">© 2026 ShopTLU</div>
```

**Lý do SEO thấp:**

Trang web bị Google đánh giá SEO thấp vì:

- Chỉ dùng `<div>` generic để chia layout, thiếu **Semantic HTML** → công cụ tìm kiếm không hiểu rõ cấu trúc & nội dung.
- Thiếu **metadata** (`<meta name="description">`, Open Graph…).
- Thiếu **heading hierarchy** hợp lý (`<h1>` duy nhất, sau đó `<h2>`, `<h3>`…).
- Thiếu thuộc tính `alt` cho hình ảnh, ảnh hưởng accessibility.

**Các lỗi semantic & cách sửa:**

| Lỗi                      | Sửa thành                                                                    |
| ------------------------ | ---------------------------------------------------------------------------- |
| `<div class="header">`   | `<header>`                                                                   |
| `<div class="main">`     | `<main>`                                                                     |
| `<div class="footer">`   | `<footer>`                                                                   |
| `<div class="logo">`     | `<h1>` (logo là tiêu đề chính trang)                                         |
| `<div class="menu">`     | `<nav>`                                                                      |
| `<div class="product">`  | `<article>` (nội dung độc lập)                                               |
| `<div class="title">`    | `<h2>` (vì trang đã có `<h1>` cho logo, không được phép thêm `<h1>` thứ hai) |
| `<div class="price">`    | `<span>` hoặc `<p>`                                                          |
| `<img src="iphone.jpg">` | `<img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro">`                      |

**Sau khi sửa:**

```html
<header>
  <h1 class="logo">ShopTLU</h1>
  <nav class="menu">
    <ul>
      <li><a href="/">Trang chủ</a></li>
      <li><a href="/products">Sản phẩm</a></li>
    </ul>
  </nav>
</header>
<main>
  <article class="product">
    <h2 class="title">iPhone 16 Pro</h2>
    <p class="price">25.990.000đ</p>
    <figure class="image">
      <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro" />
    </figure>
  </article>
</main>
<footer>© 2026 ShopTLU</footer>
```

---

#### Câu 3: Block vs Inline

**Đoạn mã:**

```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```

**Hiển thị đúng:**

```
╔════════════════════════════╗
║ Hộp 1                      ║
║ Text AText B               ║
║ Hộp 2                      ║
║ Text CText D               ║
║ Hộp 3                      ║
╚════════════════════════════╝
```

**Lý giải:**

- `<div>` là thẻ **block-level**. Mỗi `<div>` chiếm toàn bộ chiều rộng khả dụng và **luôn bắt đầu trên một dòng mới**. Do đó `Hộp 1`, `Hộp 2`, `Hộp 3` mỗi cái nằm trên một dòng riêng.
- `<span>` và `<strong>` là thẻ **inline**. Chúng chỉ chiếm đúng khoảng không gian cần thiết cho nội dung và **nằm cùng dòng** với các phần tử inline khác.
- Dòng 2: `Text A` và `Text B` nằm liền nhau trên cùng một dòng.
- Dòng 3: `Hộp 2` xuất hiện trên dòng mới (do là block).
- Dòng 4: `Text C` và `Text D` nằm cùng dòng; `Text D` được in đậm do `<strong>`.
- Dòng 5: `Hộp 3` xuất hiện trên dòng mới (do là block).

---

#### Câu 4: Table

**Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`:**

| Thẻ       | Vị trí    | Vai trò                                                                  |
| --------- | --------- | ------------------------------------------------------------------------ |
| `<thead>` | Đầu bảng  | Nhóm các hàng tiêu đề cột (header). Thường chứa `<th>`.                  |
| `<tbody>` | Thân bảng | Nhóm các hàng dữ liệu chính. Có thể có nhiều `<tbody>`.                  |
| `<tfoot>` | Cuối bảng | Nhóm các hàng tổng kết, ghi chú, kết luận (ví dụ: tổng tiền, chú thích). |

**Lý do không dùng `<table>` làm layout trang web:**

1. **Mục đích sai lệch**: `<table>` sinh ra để trình bày dữ liệu dạng bảng (tabular data), không phải để xây dựng khung/bố cục trang.
2. **Khó responsive**: Bố cục dạng bảng cứng nhắc, khó thích ứng với nhiều kích thước màn hình (đặc biệt mobile).
3. **Khó bảo trì**: Cấu trúc lồng nhau phức tạp (`table > tr > td`) khiến code rối, khó đọc và khó sửa khi website phát triển.
4. **Tốc độ render chậm**: Trình duyệt phải tính toán kích thước toàn bộ bảng trước khi vẽ (table reflow), trong khi CSS Grid / Flexbox cho phép render dần từng phần.
5. **SEO & Accessibility kém**: Screen reader đọc bảng theo chiều ngang/dọc, gây khó hiểu nếu dùng làm layout.

---

### Phần B - Thực hành code

#### Câu 3: Debug HTML

1. **Lỗi 1** – Dòng 1: `DOCTYPE` không đầy đủ (thiếu `"html"`) → Sửa thành `<!DOCTYPE html>`.
2. **Lỗi 2** – Dòng 4: Thẻ `<title>` thiếu thẻ đóng → Thêm `</title>`.
3. **Lỗi 3** – Dòng 5: `charset="utf8"` không đúng chuẩn HTML5 → Sửa thành `charset="UTF-8"`.
4. **Lỗi 4** – Dòng 8: Thẻ đóng `<h1>` sai (`<h1>` thay vì `</h1>`) → Sửa thành `</h1>`.
5. **Lỗi 5** – Dòng 12: Thẻ đóng `<a>` sai (`<a>` thay vì `</a>`) → Sửa thành `</a>`.
6. **Lỗi 6** – Dòng 20: Thuộc tính `src` của `<img>` thiếu dấu ngoặc kép → Sửa thành `src="iphone.jpg"`.
7. **Lỗi 7** – Dòng 20: Thẻ `<img>` thiếu thuộc tính `alt` (lỗi semantic + accessibility) → Thêm `alt="iPhone 16 Pro"`.
8. **Lỗi 8** – Dòng 22: Thẻ `<b>` và `</p>` lồng sai thứ tự (mismatched tags) → Sửa thành `<p>Giá: <b>25.990.000đ</b></p>`.
9. **Lỗi 9** – Dòng 40: Sử dụng thẻ `<main>` thứ hai (lỗi semantic nghiêm trọng, chỉ được phép có 1 `<main>`) → Thay `<main>` thành `<aside>` hoặc `<section>`.
10. **Lỗi 10** – Dòng 29 và 30: Header bảng dùng `<td>` thay vì `<th>` (lỗi semantic) → Sửa cả hai thành `<th>`.
11. **Lỗi 11** – Dòng 45: Thẻ `<p>` trong footer thiếu thẻ đóng → Thêm `</p>`.
12. **Lỗi 12** – Sau dòng 47: Thiếu thẻ đóng `</html>` → Thêm `</html>` ngay trước kết thúc file.
13. **Lỗi 13** – Dòng 2: Thẻ `<html>` thiếu thuộc tính `lang` (ảnh hưởng SEO và screen reader) → Thêm `lang="en"` hoặc `lang="vi"`.

---

#### Câu 4: Phân tích trang web thật

**1. Tab Elements – Semantic HTML**

- **3 thẻ semantic HTML5 mà trang sử dụng đúng:**
  - `<header>`: Phần header trên cùng (logo, thanh tìm kiếm, giỏ hàng, tài khoản).
  - `<section>`: Các khối nội dung nhóm theo chủ đề (Flash Sale, Sản phẩm hot, Gợi ý cho bạn…).
  - `<footer>`: Phần chân trang (thông tin công ty, hỗ trợ, chính sách).

- **2 thẻ mà trang KHÔNG dùng đúng semantic:**
  - Quá nhiều `<div class="...">` thay vì `<article>`: Mỗi card sản phẩm đang dùng `<div>` (nên dùng `<article>` vì đây là nội dung độc lập, có thể tái sử dụng).
  - Không có `<aside>` cho sidebar/filter: Đang dùng `<div class="sidebar">` (nên là `<aside>` vì đây là nội dung liên quan gián tiếp).

**2. Tìm thẻ `<table>`:**

- Không tìm thấy thẻ `<table>` nào trên trang chủ thegioididong.com.
- Trang sử dụng **CSS Grid + Flexbox** để hiển thị danh sách sản phẩm, bảng giá, flash sale… – đây là thực hành hiện đại, tránh dùng `<table>` cho layout.

**3. Tìm `<form>` trong trang thegioididong.com:**

- **Form đó có `action` và `method` gì?**
  - `action="/tim-kiem"`
  - Thuộc tính `method` không được khai báo (mặc định là `GET`).

- **Input types nào được dùng?**

  ```html
  <input
    id="skw"
    type="text"
    class="input-search"
    onkeyup="suggestSearch(event);"
    placeholder="Bạn tìm gì..."
    name="key"
    autocomplete="off"
    maxlength="100"
  />
  ```

  - Thuộc tính `type` được dùng là `"text"`.

---
