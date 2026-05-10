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

### B2(20đ) - Box Model Lab

#### Phần 1 - Chứng minh content-box vs border-box:

Hộp 1 dùng:

```css
box-sizing: content-box;
```

Tính toán:

```txt
300 + 20 + 20 + 5 + 5 = 350px
```

Kết quả:

```txt
Hộp 1 (content-box): chiều rộng thực tế = 350px
```

Hộp 2 dùng:

```css
box-sizing: border-box;
```

Kết quả mong đợi:

```txt
Hộp 2 (border-box): chiều rộng thực tế = 300px
```

Giải thích: Với `content-box`, width chỉ tính phần content, còn padding và border cộng thêm ra ngoài. Với `border-box`, width đã bao gồm content, padding và border.

#### Phần 2 - Layout 3 cột:

Container rộng `1000px`.

Nếu không dùng `border-box`:

```txt
Sidebar: 250 + 15 + 15 = 280px
Content: 500 + 20 + 20 = 540px
Ads: 250 + 15 + 15 = 280px
Tổng = 1100px
```

Nếu dùng `border-box`, mỗi cột giữ đúng width khai báo:

```txt
250 + 500 + 250 = 1000px
```

### Bài B3 (15đ) — Specificity Battle

Element:

```html
<p id="demo" class="text highlight">Hello World</p>
```

10 rules đã viết trong `specificity.css`, sắp xếp từ thấp đến cao:

| STT | Selector | Specificity | Màu |
|---|---|---|---|
| 1 | `p` | `(0,0,1)` | #111111 |
| 2 | `.text` | `(0,1,0)` | #0ea5e9 |
| 3 | `.highlight` | `(0,1,0)` | #22c55e |
| 4 | `p.text` | `(0,1,0)` | #f97316 |
| 5 | `p.highlight` | `(0,1,1)` | #a855f7 |
| 6 | `#demo` | `(1,0,0)` | #3b82f6 |
| 7 | `p#demo` | `(1,0,1)` | #ef4444 |
| 8 | `p#demo.text` | `#14b8a6` | red |
| 9 | `p#demo.highlight` | `(1,1,1)` | #f59e0b |
| 10 | `p#demo.text.highlight` | `(1,2,1)` | #111827 |

Element cuối cùng hiển thị màu `#111827`.

Giải thích: Rule số 10 có specificity cao nhất `(1,2,1)`. Do đó nó thắng các rule còn lại.

Nếu thay đổi thứ tự các rule trong file CSS, kết quả vẫn được giữ nguyên. Với các rule có specificity khác nhau, rule có specificity cao hơn vẫn thắng dù viết trước hay viết sau. 