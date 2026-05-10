# PHIẾU BÀI TẬP 03 — CSS CORE (Selects/Box Model/Inheritance/Cascade)

## A1 (5đ) — 3 cách nhúng CSS vào HTML

### 1) Inline CSS

```html
<p style="color: red;">Hello</p>
```

- **Ưu điểm:** Chỉ áp dụng cho đúng 1 element; nhanh để test.
- **Nhược điểm:** Khó bảo trì; trộn logic nội dung với style; không tái sử dụng.
- **Khi nào dùng:** Sửa nhanh chỗ cụ thể hoặc demo.

### 2) Internal CSS (trong thẻ `<style>`)

```html
<head>
  <style>
    p {
      color: red;
    }
  </style>
</head>
```

- **Ưu điểm:** Không cần file ngoài, phù hợp cho trang nhỏ/ trang tĩnh.
- **Nhược điểm:** Không dùng lại cho nhiều trang, nếu trang nhiều sẽ khó quản lý.
- **Khi nào dùng:** Bài tập/trang tĩnh nhỏ.

### 3) External CSS (file `.css` riêng)

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

- **Ưu điểm:** Tái sử dụng cho nhiều trang, dễ bảo trì, dễ đồng bộ UI.
- **Nhược điểm:** Phải quản lý nhiều file.
- **Khi nào dùng:** Website/app thực tế.

### Câu thêm: nếu cùng 1 element có cả 3 cách đồng thời áp dụng, cách nào thắng?

**Inline CSS thắng (cao nhất)** → sau đó đến **Internal** → cuối cùng **External**.

- Inline: ưu tiên cao do thuộc tính `style`.
- Internal: sau Inline.
- External: ưu tiên thấp hơn.

---

## A2 (8đ) — CSS Selectors — Dự đoán kết quả

1. `h1` → **Chọn:** `ShopTLU`.
2. `.price` → **Chọn:** `25.990.000đ`, `45.990.000đ`.
3. `#app header` → **Chọn:** toàn bộ `header`.
4. `nav a:first-child` → **Chọn:** `Home`.
5. `.product.featured h2` → **Chọn:** `MacBook Pro`.
6. `article > p` → **Chọn:**
   - `25.990.000đ`
   - `Mô tả sản phẩm...` (của iPhone)
   - `45.990.000đ`
   - `Mô tả sản phẩm...` (của MacBook)
7. `a[href="/"]` → **Chọn:** `Home`
8. `.top-bar.dark h1` → **Chọn:** `ShopTLU`

---

## A3 (7đ) — Box Model — Tính toán kích thước

### Trường hợp 1: `content-box` (mặc định)

```css
.box-1 {
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

- **Chiều rộng hiển thị (border-box ngoài cùng) =**
  width(content) + padding`x`2 + border`x`2
  = 400 + 20`x`2 + 5`x`2
  = 400 + 40 + 10
  = **450px**
- **Không gian chiếm trên trang =** border-box + margin`x`2
  = 450 + 10`x`2
  = 450 + 20
  = **470px**

### Trường hợp 2: `border-box`

```css
.box-2 {
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

- **Chiều rộng hiển thị (border-box ngoài cùng) =** **400px**
- **Kích thước content thực tế =**
  border-box - padding`x`2 - border`x`2
  = 400 - 20`x`2 - 5`x`2
  = 400 - 40 - 10
  = **350px**
- **Không gian chiếm trên trang =**
  400 + margin`x`2 = 400 + 20 = **420px**

### Trường hợp 3: Margin collapse

```css
.box-a {
  margin-bottom: 25px;
}
.box-b {
  margin-top: 40px;
}
```

- **Khoảng cách giữa box-a và box-b =** **max(25px, 40px) = 40px**
- **Giải thích tại sao KHÔNG phải 65px:**
  Margin giữa 2 khối dọc theo cùng trục có thể **collapse** → thay vì cộng, trình duyệt chọn **giá trị lớn hơn**.

**Nâng cao:** `.box-a { margin-bottom: -10px; }` và `.box-b { margin-top: 40px; }`

- **Khoảng cách =**
  collapse của `-10` và `40` ⇒ **40px + (-10px) = 30px**
  (vì một margin âm sẽ kéo sát lại, tổng thể là 30px)

---

## A4 (5đ) — Specificity (Độ ưu tiên)

Target: `<p class="price" id="main-price">`

### 1) Tính specificity score (a,b,c)

Rule A: `p { color: black; }`

- Specificity: 1

Rule B: `.price { color: blue; }`

- Specificity: 10

Rule C: `#main-price { color: red; }`

- Specificity: 100

Rule D: `p.price { color: green; }`

- Specificity: 11

### 2) Element sẽ có màu gì?

Vì rule C có specificity là 100 ( cao nhất trong 4 rule ) nên thẻ `<p>` sẽ chọn rule C.

⇒ **Màu: red (Rule C)**

### 3) Nếu thêm `style="color: orange;"`

Inline style có độ ưu tiên cao nhất (vượt specificity thường).
⇒ **Màu: orange**

### 4) Nếu Rule A thêm `!important`?

- `!important` sẽ thắng so với các rule không `!important`.

⇒ **Màu: black** (do Rule A có `!important`)

---

## B (phần B)

### B1 (20đ) — Style trang Profile

Các loại selector đã sử dụng trong `style.css`:

| Loại selector | Ví dụ |
|---|---|
| Universal selector | `*` |
| Element selector | `body`, `header`, `table`, `footer`, `nav`, `section` |
| Class selector | `.open-menu`, `.active`, `.profile-card` |
| ID selector | `#skills`, `#contact`, `#about-me `, `#profile`, `#slogan` |
| Descendant selector | `.main-nav a`, `.skills-table th` |
| Pseudo-class selector | `figure img:hover`, `#skills table tr:nth-child(even)`, `#skills table tbody tr:hover ` |