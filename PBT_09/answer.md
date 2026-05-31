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

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("onclick", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay = count;
    historyList.innerHTML = null;
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove;
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});
```

**CÁC LỖI CÓ TRONG ĐOẠN CODE:**
- `addEventListener("onclick", ...)` -> Đổi thành `"click"`.
- `countDisplay = count;` -> c`ountDisplay.textContent = count`;.
- `historyList.innerHTML = null` -> `historyList.innerHTML = ""`;.
- `item.remove` -> `item.remove();`.
- `count = localStorage.getItem("count");` -> `count = Number(localStorage.getItem("count")) || 0;`
- Trong sự kiện "load", code lấy count ra nhưng lại quên lấy history ra. Dẫn đến danh sách bị trống khi F5 -> `Thêm dòng historyList.innerHTML = localStorage.getItem("history") || ""`
- Gắn sự kiện xóa trực tiếp vào li lúc tạo mới `li.addEventListener("click", ...)` -> Sử dụng `Event Delegation` trên `historyList` để bắt sự kiện.

**CODE SAU KHI SỬA:**
```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// [SỬA LỖI 7]: Dùng Event Delegation thay vì gắn event lên từng thẻ li
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count; // Tối ưu: Dùng textContent thay vì innerHTML
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // Đã xóa li.addEventListener ở đây
    historyList.append(li);
});

// [SỬA LỖI 1]: Đổi "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    // [SỬA LỖI 2]: Sửa lại cách gán text cho DOM
    countDisplay.textContent = count; 
    // [SỬA LỖI 3]: Dùng "" thay vì null
    historyList.innerHTML = ""; 
});

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        // [SỬA LỖI 4]: Thêm dấu ngoặc tròn ()
        item.remove(); 
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    // [SỬA LỖI 5]: Ép kiểu về số, xử lý trường hợp null (lần đầu vào web)
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    
    // [SỬA LỖI 6]: Thêm logic load lại history
    historyList.innerHTML = localStorage.getItem("history") || "";
});
```

### Câu C2 (7đ) — Performance

**1. Tại sao bind event lên 1000 elements là BAD PRACTICE?**
- `Tiêu tốn RAM (Memory Leak)`: Tạo ra 1000 hàm (function) đính kèm vào 1000 phần tử HTML tiêu tốn rất nhiều bộ nhớ của trình duyệt.
- `Chậm quá trình Render`: Trình duyệt phải mất thời gian duyệt qua 1000 elements để gắn listener, làm chậm quá trình hiển thị trang.
- `Lỗi khi DOM thay đổi`: Nếu xóa hoặc thêm element mới bằng JS, bạn phải gắn lại sự kiện thủ công. (Giống như lỗi số 7 ở bài C1).

**Cách Event Delegation giải quyết:**
Tận dụng cơ chế Event Bubbling (Sự kiện nổi bọt). Thay vì gắn 1000 sự kiện cho 1000 thẻ con (VD: `<li>`), ta chỉ gắn 1 sự kiện duy nhất cho thẻ cha (VD: `<ul>`). Khi click vào con, sự kiện nổi bọt lên cha. Cha sẽ dùng e.target để kiểm tra xem con nào vừa bị click và thực thi lệnh tương ứng.

**2. Reflector code:**
```javascript
// Tạo một DocumentFragment rỗng (tồn tại trong bộ nhớ ảo)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    // Thêm div vào Fragment (Không tác động đến giao diện)
    fragment.appendChild(div); 
}

// Thêm toàn bộ Fragment vào DOM cùng lúc (Chỉ gây ra 1 lần reflow)
document.body.appendChild(fragment);
```

**Giải thích:**

- Trong code cũ, mỗi vòng lặp gọi `document.body.appendChild()`. Trình duyệt lập tức cập nhật lại giao diện, tính toán lại vị trí `(Layout/Reflow)` và vẽ lại màn hình` (Repaint)` 1000 lần. Quá trình này cực kỳ nặng nề cho CPU/GPU.
- `DocumentFragment` là một cấu trúc DOM "ảo" chỉ tồn tại trong bộ nhớ RAM (không nằm trên màn hình hiển thị). Việc append vào fragment không gây kích hoạt `Reflow`.
- Chỉ ở dòng code cuối cùng, khi đẩy toàn bộ fragment vào body, trình duyệt mới phải `Reflow` và `Repaint` đúng 1 lần duy nhất để hiển thị cả 1000 phần tử, giúp tốc độ tăng lên đáng kể.