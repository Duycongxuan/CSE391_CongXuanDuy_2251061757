# PHIẾU BÀI TẬP 05
# **CSS RESPONSIVE & SCSS — Responsive Design, Media Queries, Sass**

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First
**1. Thẻ `<meta viewport>` chuẩn:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
* **Giải thích:**
  * `name="viewport"`: Khai báo đây là thẻ meta thiết lập viewport.
  * `content="width=device-width"`: Chiều rộng của trang sẽ bằng chiều rộng thực tế của thiết bị.
  * `initial-scale=1.0`: Tỷ lệ zoom ban đầu là 100% (không thu nhỏ hoặc phóng to tự động).

**2. Nếu thiếu thẻ này:**

Các thiết bị di động sẽ giả định trang web có chiều rộng khoảng như desktop rồi tự động thu nhỏ toàn bộ trang xuống để vừa màn hình. Kết quả: chữ rất nhỏ, nút bấm chồng chéo, phải zoom in thủ công, UX cực kỳ kém.

**3. Mobile-First vs Desktop-First:**

* **Mobile-First (khuyến nghị)**: Viết CSS mặc định cho mobile trước, sau đó dùng @media (min-width: ...) để thêm style cho màn hình lớn hơn.

* **Desktop-First**: Viết CSS cho desktop trước, sau đó dùng @media (max-width: ...) để điều chỉnh cho màn hình nhỏ hơn.

* **Ví dụ** :
```css
/* Mobile-First */
.container {
  width: 100%;
  padding: 16px;
}
@media (min-width: 768px) {
  .container { width: 720px; margin: 0 auto; }
}
/* Desktop-First */
.container {
  width: 1140px;
  margin: 0 auto;
  padding: 16px;
}
@media (max-width: 768px) {
  .container { width: 100%; margin: 0; }
}
```
* **Lý do**: Mobile tải ít CSS hơn, ưu tiên nội dung quan trọng trước, Google Mobile-First Indexing ưu tiên, Dễ maintain và progressive enhancement

### Câu A2 (5đ) — Breakpoints

| Tên Breakpoint | Mức Min-width | Thiết bị đại diện | Số cột lưới sản phẩm |
| :--- | :--- | :--- | :--- |
| **Mobile** | `< 576px` | iPhone SE, điện thoại nhỏ | 1 cột |
| **Mobile L** | `≥ 576px` | iPhone Plus | 2 cột |
| **Tablet** | `≥ 768px` | iPad dọc, tablet | 2–3 cột |
| **Desktop** | `≥ 992px` | Laptop nhỏ | 3–4 cột |
| **Desktop L** | `≥ 1200px` | Desktop, laptop lớn | 4 cột |
| **Desktop XL** | `≥ 1400px` | Màn hình lớn, ultrawide | 4–5 cột |

### Câu A3 (5đ) — Media Queries

Cho đoạn mẫu:
```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

**Kết quả:**

| Chiều rộng màn hình | `.container` width |
| :--- | :--- |
| **375px** (iPhone SE) | `100%` |
| **600px** | `540px` |
| **800px** | `720px` |
| **1000px** | `960px` |
| **1400px** | `1140px` |

### Câu A4 (5đ) — SCSS Basics

**1. Variables (`$primary-color`):** Cho phép định nghĩa giá trị một lần và sử dụng lại nhiều lần trong toàn bộ project. Nếu designer yêu cầu đổi màu chủ đạo, chỉ cần sửa 1 chỗ là toàn bộ `button`, `link`, `heading`… sẽ tự động cập nhật

**Ví dụ:**
```scss
$primary-color: #7c3aed;
$spacing-md: 24px;
$radius: 12px;
```

**2. Nesting (viết CSS lồng nhau):** Cho phép viết CSS theo cấu trúc giống HTML (nested). Giúp code dễ đọc hơn, ngắn gọn hơn và tự động sinh ra selector đúng

**Ví dụ:**
```scss
.card {
    background: white;
    border-radius: $radius;
    
    &__title {
        font-size: 1.25rem;
        color: $primary-color;
    }
    
    &:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
}
```

**3. Mixins (`@mixin`, `@include`):** Mixin giống như hàm trong lập trình. Bạn định nghĩa một khối CSS tái sử dụng được nhiều lần, có thể truyền tham số (parameters). Rất hữu ích cho các pattern lặp lại như `flexbox center`, `button styles`, `responsive breakpoints`, `animation keyframes`…

**Ví dụ:**
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  @include flex-center;
  position: fixed;
  inset: 0;
}

.button {
  @include flex-center;
}
```

**4. `@extend` / Inheritance:** Cho phép một class “kế thừa” toàn bộ style của class khác. Giúp tránh lặp code. Khi compile, SCSS sẽ gộp các selector lại với nhau để tối ưu CSS output.

**Ví dụ:**
```scss
.btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary {
    @extend .btn;
    background: $primary-color;
    color: white;
}

.btn-danger {
    @extend .btn;
    background: #ef4444;
    color: white;
}
```

**Tại sao trình duyệt KHÔNG đọc được file .scss?** 

Vì SCSS là ngôn ngữ preprocessor (siêu cú pháp của CSS), trình duyệt chỉ hiểu được CSS thuần túy. SCSS chứa các tính năng nâng cao như `biến`, `mixin`, `nesting`… mà browser không hỗ trợ trực tiếp.

**Cần bước gì để chuyển SCSS → CSS?**

Phải compile (biên dịch) SCSS sang CSS trước khi deploy.
Các cách phổ biến:
* Live Sass Compiler (extension VS Code)
* Vite, Webpack, Parcel (trong dự án frontend)
* Command line: `sass input.scss output.css --watch`