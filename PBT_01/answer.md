# PHIẾU BÀI TẬP 01

## HTML Fundamental - Cấu trúc, Semantic, Tables & Links

---

### Phần A - Kiểm tra đọc hiểu

#### Câu 1: HTTP & Browser

**1. Thứ tự các bước xảy ra khi gõ vào http://shopee.vn**

- **Bước 1: DNS Lookup** – Trình duyệt gửi yêu cầu phân giải tên miền `shopee.vn` thành địa chỉ IP.
- **Bước 2: Thiết lập kết nối TCP** – Sau khi có IP, trình duyệt thiết lập kết nối TCP, qua router WiFi → nhà mạng (ISP) → hệ thống phân phối mạng (data center).
- **Bước 3: Gửi HTTP Request** – Trình duyệt gửi HTTP request đến server.
- **Bước 4: Server xử lý** – Server nhận request, xử lý logic, truy vấn cơ sở dữ liệu nếu cần.
- **Bước 5: Server trả về HTTP Response** – Server gửi lại response chứa file HTML, CSS, JS, hình ảnh… theo đường ngược lại về máy client.
- **Bước 6: Render trang** – Trình duyệt nhận file HTML, phân tích cú pháp (parse), xây dựng DOM, tải và áp dụng CSS (CSSOM), thực thi JavaScript, tính toán layout và vẽ (paint) giao diện lên màn hình.

**2. Trong DevTools của Chrome, tab Network cho thấy:**

- Thông tin tổng số request đã gửi, tổng dung lượng tải về, thời gian load.
- Bảng network log gồm các trường:
  - **Name**: tên file / tài nguyên.
  - **Status**: mã phản hồi HTTP (200, 404, 500…).
  - **Type**: loại tài nguyên (document, stylesheet, script, image…).
  - **Initiator**: nguồn kích hoạt request.
  - **Size**: kích thước tài nguyên (đã nén / thô).
  - **Time**: tổng thời gian tải / xử lý.
  - **Waterfall**: biểu đồ thờ igian chi tiết từng giai đoạn (queuing, DNS, TCP, request, response…).

---

#### Câu 2: Semantic

**Đoạn mã ban đầu:**

```html
<div class="header">
  <div class="logo">ShopTLU</div>
  <div class="menu">
    <div><a href="/">Trang chủ</a></div>
    <div><a href="/products">Sản phẩm</a></div>
    <div class="main">
      <div class="product">
        <div class="title">iPhone 16 Pro</div>
        <div class="price">25.990.000đ</div>
        <div class="image"><img src="iphone.jpg" /></div>
        <div class="footer">© 2026 ShopTLU</div>
      </div>
    </div>
  </div>
</div>
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
2. **Khó responsive**: khó thích ứng với nhiều kích thước màn hình (đặc biệt mobile).
3. **Khó bảo trì**: Cấu trúc lồng nhau phức tạp (`table > tr > td`) khiến code rối, khó đọc và khó sửa khi website phát triển.
4. **Tốc độ render chậm**: Trình duyệt phải tính toán kích thước toàn bộ bảng trước khi vẽ (table reflow).
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

### Phần C

#### Câu 1:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chi tiết sản phẩm</title>
</head>
<body>
  <!-- header: Chứa thông tin nhận diện thương hiệu và các công cụ toàn trang -->
  <header>
    <h1>Logo Brand</h1>
    <!-- nav: Nhóm các liên kết điều hướng chính của website -->
        <nav>
            <ul>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Sản phẩm</a></li>
            </ul>
        </nav>
  </header>

   <!-- main: Xác định nội dung chính, duy nhất của trang này (chi tiết sản phẩm) -->
  <main>
    <!-- nav aria-label="breadcrumb": Điều hướng phân cấp, giúp người dùng biết vị trí của họ -->
    <nav aria-label="breadcrumb">
        <!-- ol: Danh sách có thứ tự vì breadcrumb thể hiện cấp độ từ lớn đến nhỏ -->
        <ol>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/mobile">Điện thoại</a></li>
            <li aria-current="page">iPhone 16</li>
        </ol>
    </nav>

    <!-- article: Đại diện cho một đơn vị nội dung độc lập (sản phẩm) có thể tái sử dụng -->
    <article itemscope itemtype="https://schema.org/Product">
        <section id="product-overview">
            <!-- figure: Chứa ảnh minh họa cho nội dung sản phẩm -->
            <figure>
                <div class="main-image">
                    <img src="iphone16-main.jpg" alt="iPhone 16 màu hồng">
                </div>
                <!-- ul: Danh sách các ảnh bổ trợ (5 ảnh) -->
                <ul class="thumbnail-list">
                    <li><img src="thumb1.jpg" alt="Cạnh bên iPhone 16"></li>
                    <li><img src="thumb2.jpg" alt="Mặt sau iPhone 16"></li>
                    <li><img src="thumb3.jpg" alt="Cổng sạc iPhone 16"></li>
                    <li><img src="thumb4.jpg" alt="Màn hình iPhone 16"></li>
                    <li><img src="thumb5.jpg" alt="Hộp đựng iPhone 16"></li>
                </ul>
            </figure>

            <div class="product-info">
                <!-- h1: Tên sản phẩm, nội dung quan trọng nhất của trang -->
                <h1 itemprop="name">iPhone 16 - 128GB - Chính hãng VN/A</h1>
                
                <!-- data: Lưu giá trị máy tính đọc được trong khi vẫn hiển thị định dạng cho người dùng -->
                <p class="price">
                    Giá: <span>22.990.000đ</span>
                </p>

                <div class="rating">
                    <!-- meter hoặc span: Hiển thị đánh giá sao -->
                    <span>4.5/5 sao</span>
                </div>

                <!-- section: Một phân đoạn thông tin nhỏ trong trang sản phẩm -->
                <section class="description">
                    <h2>Mô tả sản phẩm</h2>
                    <p>iPhone 16 với chip A18 mạnh mẽ, camera cải tiến...</p>
                </section>
            </div>
        </section>

        <!-- table: Cấu trúc tốt nhất để hiển thị dữ liệu so sánh/thông số kỹ thuật -->
        <section id="specifications">
            <h2>Thông số kỹ thuật</h2>
            <table>
                <thead> <!--thead: Tiêu đề của bảng -->
                  <tr>
                      <th>Màn hình</th>
                      <th>Chipset</th>
                  </tr>
                </thead>
                <tbody> <!--tbody: Dữ liệu của bảng hiển thị -->
                  <tr>
                    <td>6.1 inch, Super Retina XDR</td>
                    <td>Apple A18</td>
                  </tr>
                </tbody>
            </table>
        </section>

        <!-- section id="reviews": Phân đoạn riêng biệt cho phản hồi khách hàng -->
        <section id="reviews">
            <h2>Đánh giá từ khách hàng</h2>
            <!-- article: Mỗi bình luận là một nội dung độc lập -->
            <article class="comment">
                <footer>Nguyễn Văn A - <time datetime="2024-10-20">20/10/2024</time></footer>
                <p>Máy rất đẹp, giao hàng nhanh!</p>
            </article>
        </section>
    </article>

    <!-- aside: Chứa nội dung liên quan gián tiếp đến nội dung chính (Sidebar) -->
    <aside>
        <h3>Sản phẩm tương tự</h3>
        <ul>
            <li><a href="#">iPhone 16 Pro</a></li>
            <li><a href="#">iPhone 15</a></li>
        </ul>
    </aside>
  </main>

  <!-- footer: Chứa thông tin cuối trang như bản quyền, địa chỉ -->
  <footer>
      <p>&copy; 2024 Ecommerce Store</p>
  </footer>
</body>
</html>
```

#### Câu 2: So sánh & Tranh luận

> **"Dùng `<div>` cho mọi thứ rồi thêm class là được, không cần semantic HTML. Tốn thời gian học thêm thẻ mới."**

Quan điểm này hoàn toàn sai lầm và có thể gây hại cho chất lượng website. Semantic HTML là nền tảng để công cụ tìm kiếm và trợ giúp tiếp cận nội dung đúng cách.

**Về SEO**, Google và các công cụ tìm kiếm khác dựa vào cấu trúc HTML để hiểu thứ bậc và mối quan hệ giữa các phần nội dung. Khi dùng toàn `<div>`, bot crawl chỉ thấy một đống thẻ generic không phân biệt được đâu là tiêu đề chính, đâu là nội dung phụ. Ví dụ, một trang sản phẩm dùng `<div class="title">` thay vì `<h1>` sẽ khiến Google không biết đâu là từ khóa quan trọng nhất, dẫn đến xếp hạng kém. Ngược lại, `<article>`, `<header>`, `<nav>` giúp bot xác định rõ phần nội dung chính, phần điều hướng, từ đó index chính xác hơn.

**Về Accessibility**, hãy tưởng tượng một người khiếm thị đang dùng screen reader đọc trang web. Nếu bạn để `<img src="iphone.jpg">` mà không có thuộc tính `alt`, họ hoàn toàn không biết đó là hình ảnh gì – máy chỉ đọc "image" hoặc bỏ qua luôn. Nhưng nếu dùng `<img src="iphone.jpg" alt="iPhone 16 Pro màu hồng">`, screen reader sẽ đọc to: _"Hình ảnh: iPhone 16 Pro màu hồng"_, giúp họ hình dung sản phẩm như người sáng mắt. Semantic HTML chính là cầu nối giúp họ tiếp cận thông tin bình đẳng.

Tuy nhiên, `<div>` vẫn có chỗ đứng trong thực tế. Khi cần một container thuần túy chỉ để nhóm phần tử cho mục đích styling (ví dụ: `<div class="card-wrapper">` để áp dụng Flexbox/Grid) mà không mang ngữ nghĩa cụ thể nào, `<div>` là lựa chọn hợp lý. Kết hợp semantic đúng chỗ và `<div>` khi cần styling container mới là cách viết HTML chuyên nghiệp, bền vững.

### Phần D: Videos

#### Links GG Drive: https://drive.google.com/file/d/1PXg0cLpukFXu6F4dFuEYOvPPE3jRJrow/view?usp=sharing