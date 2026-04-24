# PHIẾU BÀI TẬP 01

## HTML Fundamental - Cấu trúc, Sematic, Tables & Links

### Phần A - Kiểm tra đọc hiểu:

#### Câu 1: HTTP & Browser:

1. Thứ tự các bước xảy ra khi gõ vào http://shopee.vn

Bước 1: Request xuất phát từ laptop → đi qua router WiFI kết nối

Bước 2: → Request tiếp tục đi qua nhà mạng → qua cáp quang dưới đáy Thái Bình Dương

Bước 3: → Đến data center → Server xử lý yêu cầu

Bước 4: → Server trả lại response và chạy ngược lại về laptop của bạn

Bước 5: → Browser sẽ nhận được file HTML, CSS, JS được trả về → render ra giao diện → bạn có thể thấy trang web shopee xuất hiện trên màn hình.

2. Trong DevTools của Chrome, tab **Network** cho thấy các sự kiện của network được ghi lại và hiển thị trên tab: 
- thông Tổng số request đã gửi, tổng dung lượng tải về.

- `table network log` gồm các trường:

  - **Status**: mã response của HTTP.
  
  - **Type**: resource type.

  - **Size**: kích thước của resource.

  - **Time**: Tổng số thời gian để download/ upload.

  ...

#### Câu 2: SEMATIC

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
        <div class="image"><img src="iphone.jpg"></div>
    </div>
</div>
<div class="footer">© 2026 ShopTLU</div>
```

-**Lý do**: Trang web bị Google đánh giá SEO thấp vì trang web chỉ chia layout bằng `<div></div>`, thiếu các Sematic HTML, thiếu metadata và thiếu tối ưu nội dung.

- **Các lỗi sematic**:

 - `<div class="header"></div>` → `<header></header>`.

 -  `<div class="main"></div>` → `<main></main>`.

 -  `<div class="footer"></div>` → `<footer></footer>`

 -  `<div class="logo"></div>` → `<h1></h1>`.

 -  `<div class="menu"></div>` → `<nav class="logo"></nav>`.

 -  `<div class="product"></div>` → `<article class="product"></article>`

 -  `<div class="price"></div>` -> `<span class="price"></span>`

 -  `<img src="iphone.jpg">` → `<img src="iphone.jpg" alt="Điện thoại Iphone.">`

- **Sau khi sửa**

```html
<header>
    <h1 class="logo">ShopTLU</h1>
    <nav class="menu">
        <div><a href="/">Trang chủ</a></div>
        <div><a href="/products">Sản phẩm</a></div>
    </nav>
</header>
<main>
    <article class="product">
        <h1 class="title">iPhone 16 Pro</h1>
        <span class="price">25.990.000đ</span>
        <div class="image"><img src="iphone.jpg" alt="Điện thoại Iphone."></div>
    </article>
</main>
<footer class="footer">© 2026 ShopTLU</footer>
```

#### Câu 3: - Block vs Inline

```html
<div>Hộp 1</div>
<span>Text A</span>
<span>Text B</span>
<div>Hộp 2</div>
<span>Text C</span>
<strong>Text D</strong>
<div>Hộp 3</div>
```

- **Hiển thị**:
╔════════════════════════════╗

║ Hộp 1                      ║

║ Text AText BHộp 2          ║

║ Text C**Text D**Hộp 3      ║

╚════════════════════════════╝

- **Lý giải**: Các thẻ `<div></div>` là thẻ block nên khi sử dụng, thẻ `<div></div>` sẽ chiếm toàn bộ không gian của phần tử cho, bắt đầu trên 1 dòng mới. Còn các thẻ `<span></span>` và `<strong></strong>` là thẻ inline, nên khi sử dụng chỉ chiếm không gian cần thiết cho nội dung, nằm cùng dòng các phần tử khác. Do đó:

+ "Hộp 1" sẽ chiếm toàn bộ dòng đầu tiên nên các khối tiếp theo sẽ bắt đầu ở dòng 2.

+ "Text A", "Text B" là các thẻ inline chỉ chiếm vừa đủ không gian của nội dung, chưa đầy không gian của dòng nên nằm cạnh nhau. 

+ "Hộp 2" sẽ nằm cạnh "Text A" và "Text B" và chiếm nốt toàn bộ không gian còn lại của dòng và đẩy phần tử tiếp theo xuống.

+ "Text C","Text D" và "Hộp 3" hiển thị giống với dòng trước đó nhưng do "Text D" là thẻ `<strong></strong>` nên sẽ in đậm cả chữ.

#### Câu 4: Table

- Sự khác nhau giữa các thẻ `<thead>`, `<tbody>`, `<tfoot>`:

 -  Thẻ `<thead>`: nằm ở đầu bảng, với vai trò là tiêu đề của bảng.

 -  Thẻ `<tbody>`: là phân thân bảng, là nơi hiển thị dữ liệu chính của bảng.

 -  Thẻ `<tfoot>`: là phần cuối cùng của bảng, dùng để tổng kết lại bảng như tổng số, kết luận...

- Lý do không sử dụng `<table>` làm layout của trang web là vì:

  + `<table>` sinh ra dùng với mục đích chủ yếu là để hiển thị dữ liệu chứ không phải để xây dụng khung cho website. 

  + Nếu sử dụng `<table>` rất khó khăn trong việc reponsive và khó bảo trì khi website lớn.

  + Tốc độ render sẽ chậm hơn do trình duyệt sẽ phải tính toán lại kích thước của mỗi cột, mỗi dòng khi load.

  ### Phần B - Thực hành code

  #### Câu 3: Debug HTML

1.  Lỗi 1: Dòng 1 — DOCTYPE không đầy đủ (thiếu "html") — Sửa thành <!DOCTYPE html>

2. Lỗi 2: Dòng 4 — Thẻ <title> thiếu thẻ đóng — Thêm </title> ngay sau nội dung title

3. Lỗi 3: Dòng 5 — Thuộc tính charset="utf8" không đúng chuẩn HTML5 — Sửa thành charset="UTF-8"

4. Lỗi 4: Dòng 8 — Thẻ đóng <h1> sai (viết <h1> thay vì </h1>) — Sửa thành </h1>

5. Lỗi 5: Dòng 12 — Thẻ đóng <a> sai (viết <a> thay vì </a>) — Sửa thành </a>

6. Lỗi 6: Dòng 20 — Thuộc tính src của <img> thiếu dấu ngoặc kép — Sửa thành src="iphone.jpg"

7. Lỗi 7: Dòng 20 — Thẻ <img> thiếu thuộc tính alt (lỗi semantic + accessibility) — Thêm alt="iPhone 16 Pro"

8. Lỗi 8: Dòng 22 — Thẻ <b> và </p> lồng sai thứ tự (mismatched tags) — Sửa thành <p>Giá: <b>25.990.000đ</b></p>

9. Lỗi 9: Dòng 40 — Sử dụng thẻ <main> thứ hai (lỗi semantic nghiêm trọng, chỉ được phép có 1 <main>) — Thay <main> thành <aside>

10. Lỗi 10: Dòng 29 và 30 — Header của bảng dùng <td> thay vì <th> (lỗi semantic) — Sửa cả hai thành <th>

11. Lỗi 11: Dòng 45 — Thẻ <p> trong footer thiếu thẻ đóng — Thêm </p>

12. Lỗi 12: Sau dòng 47 — Thiếu thẻ đóng </html> — Thêm </html> ngay trước kết thúc file

13. Lỗi 13: Dòng 2 — Thẻ <html> thiếu thuộc tính lang (lỗi semantic, ảnh hưởng SEO và screen reader) — Thêm lang="en"

#### Câu 4: Phân tích trang web thật

1. Tab Elements - sematic HTML

**3 thẻ semantic HTML5 mà trang sử dụng đúng:**:

- `<header>`: Phần header trên cùng (logo Tiki, thanh tìm kiếm, giỏ hàng, tài khoản).

- `<section>`: Các khối sản phẩm (Flash Sale, Sản phẩm hot, Gợi ý cho bạn…).

- `<footer>`: Phần chân trang (thông tin công ty, hỗ trợ).

**2 thẻ mà trang KHÔNG dùng đúng semantic:**

- Quá nhiều `<div class="...">` thay vì `<article>`: Mỗi card sản phẩm đang dùng `<div>` (nên dùng `<article>` vì đây là nội dung độc lập).

- Không có `<aside>` cho sidebar/filter bên trái: Đang dùng `<div class="sidebar">` (semantic sai, nên là `<aside>`).

2. Tìm thẻ `<table>`:

- Không tìm thấy bất kỳ thẻ `<table>` nào trên trang chủ thegioididong.com

- Table đó hiển thị nội dung gì? → Không có.

- Có dùng `<thead>`, `<tbody>` không? → Không áp dụng (trang sử dụng CSS Grid + Flexbox để hiển thị danh sách sản phẩm, bảng giá, flash sale… – đây là thực hành hiện đại, tránh dùng table cho layout).

3. Tìm `<form>` trong trang "thegioidicong.com":

- Form đó có `action` và `method` gì?

  - `action="/tim-kiem"`

  - thuộc tính `method` không được sử dụng trong form

- Input types nào được dùng?

  - `<input id="skw" type="text" class="input-search" onkeyup="suggestSearch(event);" placeholder="Bạn tìm gì..." name="key" autocomplete="off" maxlength="100">`

  - thuộc tính types được dùng trong `<input/>` là "text".
  