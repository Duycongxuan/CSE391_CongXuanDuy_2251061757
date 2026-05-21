# PHIẾU BÀI TẬP 06
## **CSS FRAMEWORKS —  TailwindCSS**

### Câu A1 (10đ) — Utility Classes

Cho đoạn html sau: 
```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-lg 
            hover:shadow-xl transition-shadow duration-300">
    <img class="w-16 h-16 rounded-full object-cover" src="avatar.jpg" alt="User">
    <div class="ml-4 flex-1">
        <h3 class="text-lg font-semibold text-gray-800 truncate">Nguyễn Văn A</h3>
        <p class="text-sm text-gray-500">Frontend Developer</p>
    </div>
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md 
                   hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
        Follow
    </button>
</div>
```

**Các loại utilities đã sử dụng:**
## `<div>`
- `flex` → `display: flex`
- `items-center` → `align-items: center`
- `justify-between` → `justify-content: space-between`
- `p-4` → `padding: 1rem (16px)`
- `bg-white` → `background-color: #ffffff`
- `shadow-md` → `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- `rounded-lg` → `border-radius: 0.5rem (8px)`
- `hover:shadow-xl` → `box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), ...` 
- `transition-shadow` → `transition-property: box-shadow`
- `duration-300` → `transition-duration: 300ms`
## `<img>`
- `w-16` → `width: 4rem (64px)`
- `h-16` → `height: 4rem (64px)`
- `rounded-full` → `border-radius: 9999px`
- `object-cover` → `object-fit: cover`
## `<div>`
- `ml-4` → `margin-left: 1rem (16px)`
- `flex-1` → `flex: 1 1 0%`
## `<h3>` 
- `text-lg` → `font-size: 1.125rem (18px)`
- `font-semibold` → `font-weight: 600`
- `text-gray-800` → `color: #1f2937`
- `truncate` → `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`
## `<p>`
- `text-sm` → `font-size: 0.875rem (14px)`
- `text-gray-500` → `color: #6b7280`
## `<button>` 
- `px-4` → `padding-left: 1rem (16px); padding-right: 1rem (16px)`
- `py-2` → `padding-top: 0.5rem (8px); padding-bottom: 0.5rem (8px)`
- `bg-blue-500` → `background-color: #3b82f6`
- `text-white` → `color: #ffffff`
- `rounded-md` → `border-radius: 0.375rem (6px)`
- `hover:bg-blue-600` → `background-color: #2563eb` 
- `focus:ring-2` → `box-shadow: 0 0 0 2px var(--tw-ring-color)`
- `focus:ring-blue-300` → `--tw-ring-color: #93c5fd` 

### Câu A2 — Responsive & States


#### 1. Responsive Prefixes: `md:`, `lg:`, `xl:`

Tailwind dùng cách tiếp cận **mobile-first**: class không có prefix áp dụng cho mọi màn hình, còn prefix chỉ kích hoạt từ breakpoint đó **trở lên**.

| Prefix | Breakpoint | Min-width |
|--------|-----------|-----------|
| _(none)_ | mobile | `0px` |
| `sm:` | small | `640px` |
| `md:` | tablet | `768px` |
| `lg:` | desktop | `1024px` |
| `xl:` | large desktop | `1280px` |
| `2xl:` | extra large | `1536px` |

### Ví dụ: `md:grid-cols-2 lg:grid-cols-4`

```
0px   → 767px   : grid-cols mặc định (1 cột, nếu không khai báo thêm)
768px → 1023px  : grid-cols-2  (2 cột)
1024px+         : grid-cols-4  (4 cột)
```

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  ...
</div>
```

---

#### 2. State Modifiers

### `hover:` — khi di chuột vào

Kích hoạt khi người dùng hover chuột lên phần tử.

```html
<button class="bg-blue-500 hover:bg-blue-700">
  Click me
</button>
```
- `bg-blue-500` → màu mặc định
- `hover:bg-blue-700` → màu đậm hơn khi hover

---

### `focus:` — khi phần tử được focus

Kích hoạt khi phần tử nhận focus (tab vào, click vào input, button...).

```html
<input class="border focus:border-blue-500 focus:ring-2 focus:ring-blue-300" />
```
- `focus:border-blue-500` → viền xanh khi focus
- `focus:ring-2` → thêm ring outline khi focus (quan trọng cho accessibility)

---

### `active:` — khi đang nhấn giữ chuột

Kích hoạt trong khoảnh khắc người dùng nhấn và giữ chuột (mousedown).

```html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-800">
  Click me
</button>
```
- `active:bg-blue-800` → màu tối nhất trong lúc đang nhấn

**Thứ tự trạng thái thường dùng:** `default → hover → active`

---

### `group-hover:` — hover vào phần tử cha, con thay đổi

Dùng khi muốn **phần tử con** thay đổi style khi **phần tử cha** được hover.

**Bước 1:** Đánh dấu phần tử cha bằng class `group`  
**Bước 2:** Dùng `group-hover:` trên phần tử con

```html
<div class="group flex items-center p-4 hover:bg-gray-100">
  <img src="avatar.jpg" class="w-10 h-10 rounded-full" />
  <span class="ml-3 text-gray-600 group-hover:text-blue-500">
    Nguyễn Văn A
  </span>
  <svg class="ml-auto opacity-0 group-hover:opacity-100">...</svg>
</div>
```
- Khi hover vào `div.group` → text chuyển xanh, icon xuất hiện
- Không cần JavaScript, không cần `:hover` selector phức tạp

---

#### 3. Ẩn trên mobile, hiện dạng flex trên tablet trở lên

Tương đương `d-none d-md-flex` của Bootstrap:

```html
<div class="hidden md:flex">
  ...
</div>
```

| Class | Tác dụng |
|-------|----------|
| `hidden` | `display: none` — ẩn trên mobile (0px+) |
| `md:flex` | `display: flex` — hiện dạng flex từ 768px trở lên |

> **Giải thích logic mobile-first:**
> - `hidden` áp dụng từ `0px` → ẩn mặc định
> - `md:flex` ghi đè từ `768px` → hiện ra dạng flex
> - Kết quả: ẩn trên mobile, hiện trên tablet/desktop

### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tailwind vs CSS thuần

code
Md
# PHẦN C — PHÂN TÍCH

## Câu C1 — So sánh Tailwind CSS và CSS thuần (Ví dụ: Navbar Component)

Để phân tích, ta sẽ so sánh đoạn code CSS thuần của component Navbar đã cho với phiên bản được viết lại bằng Tailwind CSS.

### 1. Code tham chiếu

**Phiên bản CSS thuần (Code gốc):**
```html
<!-- HTML -->
<nav class="navbar">
    <div class="logo">TechStore</div>
    <div class="nav-links">
        <a href="#">Trang chủ</a>
        <a href="#">Sản phẩm</a>
    </div>
    <button class="hamburger" id="hamburger"><i class="fas fa-bars"></i></button>
</nav>
```

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #60a5fa;
}

.nav-links {
    display: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
}

.hamburger {
    background: none;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
}
```

**Phiên bản tailwindcss:**
```html
<nav class="flex justify-between items-center p-4">
    <div class="text-[1.8rem] font-bold text-blue-400">TechStore</div>
    <div class="hidden md:flex gap-8">
        <a href="#" class="text-white font-medium hover:text-blue-300">Trang chủ</a>
        <a href="#" class="text-white font-medium hover:text-blue-300">Sản phẩm</a>
    </div>
    <button class="md:hidden bg-transparent border-none text-white text-[1.8rem] cursor-pointer" id="hamburger">
        <i class="fas fa-bars"></i>
    </button>
</nav>
```

#### **So sánh:**

| Tiêu chí | CSS Thuần | Tailwind CSS |
|--------|-----------|-----------|
| HTML file size | Gọn nhẹ, sạch sẽ. Các class name ngắn gọn (VD: class="navbar"). | Lớn hơn (Bloated). HTML phình to do nhồi nhét nhiều class (VD: class="flex justify-between..."). |
| Dễ đọc (Readability) | Tốt. Nhìn vào class có thể hiểu ngay ngữ nghĩa và vai trò của khối block (Semantic). | Kém hơn. Dễ bị rối mắt (Utility soup), khó nhìn ra cấu trúc logic ngay lập tức |
| Dễ sửa (Maintainability) | Thấp. Phải chuyển đổi qua lại giữa file HTML và CSS (Context switching). Dễ gây lỗi vỡ layout ở các nơi khác do tính xếp tầng (Global scope). | Rất cao. Sửa UI trực tiếp ngay tại dòng HTML. An toàn tuyệt đối, không sợ ảnh hưởng (xung đột) đến các component khác. |
| Reusability (Tính tái sử dụng) | Rất tự nhiên. Định nghĩa 1 class .navbar, gọi ở 10 file HTML khác nhau dễ dàng. | Cần công cụ hỗ trợ. Nếu chỉ dùng HTML thuần, copy-paste chuỗi class dài gây vi phạm DRY. Cần kết hợp framework JS hoặc dùng @apply. |

## Câu C2 — Về Performance (Hiệu suất)

### 1. Tại sao HTML dùng Tailwind dài nhưng file CSS cuối cùng lại NHỎ HƠN Bootstrap?
Mặc dù file HTML của Tailwind chứa rất nhiều class, nhưng file CSS xuất ra ở môi trường Production lại nhỏ hơn Bootstrap rất nhiều. Lý do là:

*   **Tính kế thừa toàn bộ (Bootstrap):** Bootstrap cung cấp sẵn một bộ UI Kits khổng lồ (Modal, Carousel, Navbar, Card...). Dù dự án của chỉ là một trang web 1 trang siêu nhỏ, phải tải xuống toàn bộ file CSS vài trăm KB của Bootstrap bao gồm cả những component **không bao giờ đụng tới**.
*   **Tính tái sử dụng cực cao của Utility classes (Tailwind):** Một class trong Tailwind chỉ thực hiện đúng 1 chức năng (Ví dụ: `flex`, `mt-4`, `text-center`). Trong file HTML có thể dùng class `mt-4` đến **100 lần**, nhưng trong file CSS được biên dịch ra, định nghĩa `.mt-4 { margin-top: 1rem; }` chỉ xuất hiện **đúng 1 lần duy nhất**. Sự lặp lại nằm ở HTML, chứ không nằm ở CSS.

### 2. Giải thích cơ chế PurgeCSS / Tailwind JIT compiler. Nó loại bỏ những gì?
*   **Cơ chế hoạt động:** 
    *   Trước đây Tailwind dùng công cụ **PurgeCSS**. Từ phiên bản v3 trở đi, Tailwind sử dụng engine **JIT (Just-In-Time)**. 
    *   Khi chạy lệnh build dự án, trình biên dịch (JIT) sẽ quét toàn bộ các file trong thư mục nguồn (HTML, JS, Vue, React...) để tìm các chuỗi text khớp với tên class của Tailwind.
*   **Nó loại bỏ cái gì?**
    *   Nó loại bỏ **Utility Classes không được sử dụng** ra khỏi file CSS cuối cùng.

### 3. Khi nào KHÔNG nên dùng Tailwind CSS? (2 tình huống cụ thể)

Mặc dù rất mạnh mẽ, nhưng Tailwind CSS không phải là "viên đạn bạc". Dưới đây là 2 tình huống cụ thể **không nên** dùng Tailwind:

*   **Tình huống 1: Các dự án có nội dung động sinh ra từ Database (như CMS, WordPress với WYSIWYG Editor).**
    *   *Lý do:* Tailwind JIT hoạt động dựa trên việc quét mã nguồn tĩnh lúc **Build time** (quá trình biên dịch). Nếu nội dung HTML được user soạn thảo qua Editor mang theo các class mới và lưu vào database, lúc trang web hiển thị (Run time), Tailwind sẽ không nhận diện được các class này do chúng chưa được quét lúc build, dẫn đến việc mất hoàn toàn CSS.
    
*   **Tình huống 2: Làm prototype nhanh, dự án siêu nhỏ không muốn setup môi trường Build (Node.js/npm).**
    *   *Lý do:* Để Tailwind phát huy sức mạnh (dung lượng siêu nhẹ), bắt buộc phải có môi trường Node.js và các build tools (như Vite, Webpack, PostCSS). Nếu chỉ muốn tạo nhanh một file `index.html`, quăng lên server để test ý tưởng ngay lập tức thì việc thiết lập Tailwind mất rất nhiều thời gian.