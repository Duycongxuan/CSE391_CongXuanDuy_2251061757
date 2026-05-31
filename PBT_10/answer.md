# PHIẾU BÀI TẬP 10
# **ASYNC JAVASCRIPT & API INTEGRATION**

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

**1. Dự đoán thứ tự output**
```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```
**2. Giải thích chi tiết các khái niệm và luồng chạy**

- `Call Stack` (Ngăn xếp gọi hàm - Đồng bộ): Nơi chứa và thực thi các đoạn code đồng bộ `(Synchronous)`. Code chạy từ trên xuống dưới, hàm nào vào sau sẽ chạy trước `(LIFO)`.
- `Microtask Queue` (Hàng đợi Microtask): Nơi chứa các tác vụ bất đồng bộ có độ ưu tiên cao. Các tác vụ này thường sinh ra từ `Promise(.then/catch/finally)`, `queueMicrotask`, hoặc `MutationObserver`.
- `Macrotask Queue` (Hàng đợi Macrotask / Task Queue): Nơi chứa các tác vụ bất đồng bộ có độ ưu tiên thấp hơn. Các tác vụ này sinh ra từ `setTimeout`, `setInterval`, `I/O`, `UI events`...
- `Event Loop` (Vòng lặp sự kiện): Là "người điều phối". Vòng lặp này liên tục kiểm tra `Call Stack`.
  - Nếu `Call Stack` trống, nó sẽ kiểm tra `Microtask Queue` đầu tiên. Nó sẽ đẩy toàn bộ các tác vụ trong `Microtask Queue` vào `Call Stack` để chạy cho đến khi hàng đợi này trống rỗng.
  - Chỉ khi` Microtask Queue` đã trống, `Event Loop` mới lấy 1 tác vụ duy nhất từ `Macrotask Queue` đẩy vào `Call Stack` để chạy. Sau đó, nó lại quay lại kiểm tra `Microtask Queue`.

### Câu A2 (5đ) — Fetch API
```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

**1. await fetch(...)**
- `fetch` trả về gì? Trả về một `Promise` (khi thành công sẽ chứa đối tượng `Response` bao gồm `status` và `headers`).
- Tại sao cần `await`? Vì gọi mạng `(network request) `cần thời gian để phản hồi (bất đồng bộ). `await` giúp tạm dừng hàm `getData` cho đến khi có phản hồi từ server, giúp viết code bất đồng bộ nhưng dễ đọc như code đồng bộ.

**2. response.ok**
- Khi nào `false`? Khi `HTTP Status Code` nằm ngoài khoảng `200` - `299` (tức là `request` bị lỗi từ phía `client` hoặc `server`).
- 3 status codes tương ứng (ví dụ):
  - `404` (Not Found - Không tìm thấy dữ liệu)
  - `500` (Internal Server Error - Lỗi cục bộ máy chủ)
  - `401` (Unauthorized - Không có quyền truy cập)

**3. response.json()**
- Tại sao cần `await` lần nữa? Lần `await` đầu tiên mới chỉ nhận được "vỏ" (`headers`, `status`). Việc đọc toàn bộ luồng dữ liệu (`body stream`) tải về và phân tích (`parse`) nó thành `JSON` cũng tiêu tốn thời gian.

**4. try...catch bắt được những lỗi gì?**
- Trong đoạn code cụ thể này, nó bắt được cả 3 loại lỗi bạn nêu:
  - `Network error` (Lỗi mạng): Mất mạng, sai tên miền, lỗi `CORS`... (Lúc này hàm `fetch` sẽ tự động quăng lỗi - reject).
  - Lỗi `HTTP` (404, 500...): Nhờ đoạn code `if (!response.ok) throw new Error...`, ta đã chủ động quăng lỗi.
  - `JSON parse error`: Nếu server phản hồi thành công nhưng dữ liệu trả về là `HTML` hoặc `text thuần` (không đúng chuẩn JSON), hàm `response.json()` sẽ quăng lỗi (`SyntaxError`) và rơi ngay vào `catch`.

### Câu A3 (5đ) — Promise States
**1. Sơ đồ 3 trạng thái của Promise (Markdown)**
```text
                           +-------------------+
                           |    1. PENDING     |
                           |   (Đang chờ xử lý)|
                           +-------------------+
                                 /       \
                  resolve(value) /         \ reject(error)
                               /             \
                              v               v
           +--------------------+           +--------------------+
           |   2. FULFILLED     |           |    3. REJECTED     |
           |    (Thành công)    |           |     (Thất bại)     |
           +--------------------+           +--------------------+
                     |                                |
                     v                                v
               .then(onSuccess)                 .catch(onError) 
```

**2. Giải thích: Callback Hell là gì?**
- `Callback Hell`:  là tình trạng xảy ra khi ta xử lý nhiều tác vụ bất đồng bộ liên tiếp nhau, trong đó kết quả của tác vụ trước là đầu vào của tác vụ sau.
- Để làm được điều này bằng Callback, ta phải lồng các hàm (nesting) vào bên trong nhau liên tục.
- Hậu quả:
  - Code phình to theo chiều ngang (hình kim tự tháp >).
  - Cực kỳ khó đọc, khó bảo trì.
  - Khó quản lý lỗi (phải xử lý lỗi ở từng cấp độ).

**3. Ví dụ 4 cấp Callback Hell**
```javascript
// Ví dụ Callback Hell (4 cấp lồng nhau)
getUser(1, (err, user) => {
    if (err) return console.error("Lỗi lấy User", err);

    getPosts(user.id, (err, posts) => {
        if (err) return console.error("Lỗi lấy Posts", err);

        getComments(posts[0].id, (err, comments) => {
            if (err) return console.error("Lỗi lấy Comments", err);

            getAuthorInfo(comments[0].authorId, (err, authorInfo) => {
                if (err) return console.error("Lỗi lấy Author", err);
                
                console.log("Thông tin tác giả cần tìm:", authorInfo);
            });
        });
    });
});
```
**4. Refactor thành Async/Await**

```javascript
// Refactor bằng Async/Await
async function getFullAuthorInfo() {
    try {
        // Code phẳng, chạy tuần tự từ trên xuống
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const authorInfo = await getAuthorInfo(comments[0].authorId);

        console.log("Thông tin tác giả cần tìm:", authorInfo);
        
    } catch (error) {
        // Xử lý lỗi chung cho tất cả 4 bước
        console.error("Đã xảy ra lỗi trong quá trình lấy dữ liệu:", error);
    }
}

getFullAuthorInfo();
```