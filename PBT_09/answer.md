#  PHIẾU BÀI TẬP 09
# **DOM MANIPULATION & EVENTS**

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree
1. **Vẽ DOM tree**
```md
div#app
 ├── header
 │    ├── h1 (Text: "Todo App")
 │    └── nav
 │         ├── a.active (Text: "All")
 │         ├── a (Text: "Active")
 │         └── a (Text: "Completed")
 └── main
      ├── form#todoForm
      │    ├── input#todoInput
      │    └── button (Text: "Add")
      └── ul#todoList
           ├── li.todo-item (Text: "Learn HTML")
           └── li.todo-item.completed (Text: "Learn CSS")
```
2. **Query Selector**
- Chọn thẻ `<h1>`: `document.querySelector('h1')`
- Chọn `input` trong form: `document.querySelector('#todoInput')`
- Chọn tất cả `.todo-item`: `document.querySelectorAll('.todo-item')`
- Chọn `link` đang `active`: `document.querySelector('a.active')`
- Chọn `<li>` đầu tiên trong `#todoList`: `document.querySelector('#todoList li')`
- Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll('nav a')`

### Câu A2 (5đ) — innerHTML vs textContent

**1. Sự khác nhau và ví dụ:**
- `innerHTML`: Đọc/Ghi nội dung của một thẻ và biên dịch (parse) các thẻ HTML có trong đó.
  - Khi nào dùng: Khi bạn muốn chèn thêm một cấu trúc HTML mới vào trang web bằng JavaScript.
  - Ví dụ: `element.innerHTML = '<strong>Xin chào</strong>'`;
- textContent: Đọc/Ghi nội dung dưới dạng văn bản thuần túy (plain text).   
  - Khi nào dùng: Khi bạn chỉ muốn thay đổi chữ, hiển thị dữ liệu do người dùng nhập vào để đảm bảo an toàn.
  - Ví dụ: `element.textContent = '<strong>Xin chào</strong>'`; 

**2.  Câu hỏi bảo mật (XSS):**
- `Tại sao innerHTML gây lỗi XSS (Cross-Site Scripting)`?
Bởi vì innerHTML ép trình duyệt đọc chuỗi string và thực thi nó như một đoạn mã HTML/JavaScript thật. Nếu hacker nhập vào một đoạn mã độc (như thẻ `<script>` hoặc thẻ `<img onerror="...">`), trình duyệt sẽ chạy đoạn mã đó ngay lập tức, dẫn đến việc bị đánh cắp cookie, token hoặc thao túng giao diện.
- ` Cách sửa code`: Đổi `innerHTML` thành `textContent` để ép trình duyệt hiểu đoạn mã do user nhập vào chỉ là một chuỗi văn bản bình thường.

```javascript
// Mã an toàn:
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput; // Dùng textContent thay vì innerHTML
```

### Câu A3 (5đ) — Event Bubbling

**1. Khi click vào button (Code giữ nguyên, không bỏ comment):**

Sự kiện click sẽ bắt đầu từ phần tử được `click` (#btn), sau đó `"nổi bọt"` (bubble up) dần lên các thẻ cha của nó là `#inner` và `#outer`.
```text
BUTTON
INNER
OUTER
```
**2. Nếu uncomment e.stopPropagation():**

Hàm `e.stopPropagation()` có tác dụng ngăn chặn sự nổi bọt. Khi sự kiện chạy xong ở `#btn`, nó sẽ bị chặn lại ngay lập tức và không lan lên các thẻ cha (`#inner` và `#outer`) nữa.

```text
BUTTON
```