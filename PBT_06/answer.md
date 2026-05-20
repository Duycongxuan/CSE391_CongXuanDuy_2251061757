# PHIẾU BÀI TẬP 06
## **CSS FRAMEWORKS —  TailwindCSS**

#### Câu A1 (10đ) — Utility Classes

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

# Câu A2 — Responsive & States

---

## 1. Responsive Prefixes: `md:`, `lg:`, `xl:`

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

## 2. State Modifiers

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

## 3. Ẩn trên mobile, hiện dạng flex trên tablet trở lên

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