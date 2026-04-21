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

 + `<div class="header"></div>` → `<header></header>`.

 + `<div class="main"></div>` → `<main></main>`.

 + `<div class="footer"></div>` → `<footer></footer>`

 + `<div class="logo"></div>` → `<h1></h1>`.

 + `<div class="menu"></div>` → `<nav class="logo"></nav>`.

 + `<div class="product"></div>` → `<article class="product"></article>`

 + `<div class="price"></div>` -> `<span class="price"></span>`

 + `<img src="iphone.jpg">` → `<img src="iphone.jpg" alt="Điện thoại Iphone.">`

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

1. "Hộp 1" sẽ chiếm toàn bộ dòng đầu tiên nên các khối tiếp theo sẽ bắt đầu ở dòng 2.

2. "Text A", "Text B" là các thẻ inline chỉ chiếm vừa đủ không gian của nội dung, chưa đầy không gian của dòng nên nằm cạnh nhau. 

3. "Hộp 2" sẽ nằm cạnh "Text A" và "Text B" và chiếm nốt toàn bộ không gian còn lại của dòng và đẩy phần tử tiếp theo xuống.

3. "Text C","Text D" và "Hộp 3" hiển thị giống với dòng trước đó nhưng do "Text D" là thẻ `<strong></strong>` nên sẽ in đậm cả chữ.

#### Câu 4: Table

- Sự khác nhau giữa các thẻ `<thead>`, `<tbody>`, `<tfoot>`:

 + Thẻ `<thead>`: nằm ở đầu bảng, với vai trò là tiêu đề của bảng.

 + Thẻ `<tbody>`: là phân thân bảng, là nơi hiển thị dữ liệu chính của bảng.

 + Thẻ `<tfoot>`: là phần cuối cùng của bảng, dùng để tổng kết lại bảng như tổng số, kết luận...

- Lý do không sử dụng `<table>` làm layout của trang web là vì:

  1. `<table>` sinh ra dùng với mục đích chủ yếu là để hiển thị dữ liệu chứ không phải để xây dụng khung cho website. 

  2. Nếu sử dụng `<table>` rất khó khăn trong việc reponsive và khó bảo trì khi website lớn.

  3. Tốc độ render sẽ chậm hơn do trình duyệt sẽ phải tính toán lại kích thước của mỗi cột, mỗi dòng khi load.