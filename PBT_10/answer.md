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

- `Callback Hell`: là tình trạng xảy ra khi ta xử lý nhiều tác vụ bất đồng bộ liên tiếp nhau, trong đó kết quả của tác vụ trước là đầu vào của tác vụ sau.
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

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy

Giả sử app E-Commerce gọi nhiều API (lấy danh sách sản phẩm, chi tiết sản phẩm, tạo đơn hàng, thanh toán...). Chiến lược xử lý lỗi nên chia theo tầng:

- **Network error**: lỗi kết nối (mất mạng, DNS, CORS, request bị ngắt).
- **API error**: server trả response nhưng mã trạng thái không hợp lệ (404/500/429...).
- **Timeout**: API chậm quá giới hạn.
- **Retry**: thử lại khi lỗi tạm thời (thường là lỗi network / timeout), nhưng có giới hạn.

#### 1) Network errors (mất mạng giữa chừng) → Xử lý thế nào?

- Dùng `try/catch` quanh `fetch`.
- Khi gặp lỗi network: hiển thị toast/modal kiểu “Mất kết nối, thử lại sau”.
- Không retry vô hạn: giới hạn số lần retry (ví dụ 3 lần) + có thể backoff.
- Giữ UI ở trạng thái “đang tải thất bại” và cho phép user bấm “Thử lại”.

Ví dụ: retry 3 lần cho network/timeout:

```js
async function fetchWithRetry(url, maxRetries = 3, options = {}) {
  let lastErr;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      lastErr = err;

      // Network error/timeout: chờ thêm trước lần thử tiếp theo (backoff đơn giản)
      if (attempt < maxRetries) {
        const backoffMs = attempt * 300; // 300ms, 600ms, ...
        await new Promise((r) => setTimeout(r, backoffMs));
      }
    }
  }

  throw lastErr;
}
```

#### 2) API errors (server trả 500, 404, 429 Too Many Requests) → Xử lý từng loại

Ta luôn kiểm tra `response.ok` và xử lý theo `status`:

- **404 Not Found**: dữ liệu không tồn tại (URL sản phẩm sai/id sai). Thường không retry; hiển thị “Sản phẩm không tồn tại”.
- **500 Internal Server Error**: server lỗi tạm thời. Có thể retry (kèm giới hạn) nếu là lỗi tạm thời, hoặc chuyển sang fallback.
- **429 Too Many Requests**: rate limit. **Không retry ngay liên tục**; phải tôn trọng `Retry-After` nếu có.

Ví dụ helper parse lỗi theo status:

```js
async function fetchJsonOrThrow(url, options = {}) {
  const res = await fetch(url, options);

  if (res.ok) return await res.json();

  // Tùy biến error theo status
  const errBody = await res.text().catch(() => "");
  const message = `HTTP ${res.status}: ${errBody || res.statusText}`;

  const error = new Error(message);
  error.status = res.status;
  throw error;
}
```

Và logic xử lý theo từng loại:

```js
function handleApiError(err) {
  if (err.status === 404) {
    return { uiMessage: "Không tìm thấy dữ liệu (404).", retryable: false };
  }

  if (err.status === 429) {
    return {
      uiMessage: "Hệ thống đang quá tải (429). Thử lại sau.",
      retryable: true,
    };
  }

  if (err.status >= 500) {
    return { uiMessage: "Server lỗi. Đang thử lại...", retryable: true };
  }

  return { uiMessage: "Lỗi không xác định từ server.", retryable: false };
}
```

Đối với **429**, có thể retry sau `Retry-After` header:

```js
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function retryOn429(url, maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await fetchJsonOrThrow(url);
    } catch (err) {
      if (err.status !== 429) throw err;

      // Không phải response nào cũng có Retry-After; nên guard
      const retryAfter = Number(err.retryAfter) || 1000;
      await sleep(retryAfter);
    }
  }
}
```

_(Lưu ý: để lấy `Retry-After` chính xác, ta cần giữ lại `response` hoặc set vào error trong lúc tạo lỗi.)_

#### 3) Timeout (API chậm > 10 giây) → Viết code `fetchWithTimeout(url, ms)`

Cách làm chuẩn: dùng `AbortController` để hủy request khi vượt quá `ms`.

```js
function fetchWithTimeout(url, ms = 10000, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(timeoutId));
}
```

Trong app, timeout thường được coi là lỗi tạm thời → có thể retry.

#### 4) Retry logic (thử lại 3 lần nếu lỗi network) → Viết code `fetchWithRetry(url, maxRetries)`

Kết hợp timeout + retry:

```js
async function fetchWithRetry(url, maxRetries = 3, options = {}) {
  let lastErr;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Gắn timeout 10s cho từng lần thử
      const res = await fetchWithTimeout(url, 10000, options);

      // Nếu server trả lỗi HTTP (404/500/429) thì xử lý riêng:
      if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }

      return res;
    } catch (err) {
      lastErr = err;

      // Retry chỉ cho network/timeout (không retry cho 404)
      const isAbort = err?.name === "AbortError";
      const isNetworkLike =
        isAbort || err?.message?.toLowerCase().includes("network");
      const isRetryableHttp = err?.status === 500 || err?.status === 429;

      if (attempt === maxRetries || (!isNetworkLike && !isRetryableHttp)) {
        throw err;
      }

      // Backoff đơn giản
      const backoffMs = attempt * 300;
      await new Promise((r) => setTimeout(r, backoffMs));
    }
  }

  throw lastErr;
}
```

**Tóm tắt chiến lược cho e-commerce**

- Network/timeout: retry có giới hạn (3 lần), có backoff.
- 404: không retry, báo user.
- 500: có thể retry hoặc fallback.
- 429: retry có delay theo `Retry-After` (nếu có), không spam.

---

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

Giả sử app e-commerce tải nhiều dữ liệu song song:

- trang sản phẩm cần: `product`, `price`, `stock`, `reviews`.

#### 1) Bảng so sánh

| Method          | Khi nào resolve?                                | Khi nào reject?                                  | Use case                                                                                              |
| --------------- | ----------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `.all()`        | Tất cả Promise resolve                          | Ngay khi **1 Promise reject** đầu tiên           | Cần dữ liệu đầy đủ, ví dụ: tạo trang product chỉ render khi đủ price+stock+reviews                    |
| `.allSettled()` | Tất cả Promise đã settled (resolve hoặc reject) | **Không reject** (luôn resolve với mảng kết quả) | Cần gom kết quả kể cả lỗi, ví dụ: tải nhiều ảnh/hình thumbnail; ảnh lỗi vẫn render phần còn lại       |
| `.race()`       | Promise đầu tiên resolve                        | Promise đầu tiên reject                          | Cần “cái nhanh nhất”, ví dụ: gọi 2 CDN lấy cùng resource, dùng phản hồi nhanh nhất                    |
| `.any()`        | Promise đầu tiên resolve                        | Tất cả reject                                    | Cần “miễn là có 1 cái thành công”, ví dụ: thử 3 endpoint tìm cấu hình; chỉ cần 1 endpoint trả dữ liệu |

#### 2) Ví dụ code thực tế cho từng method (không delay đơn giản)

##### a) `.all()` — cần đủ dữ liệu để render trang

Ví dụ: lấy **product detail**, **stock**, **reviews**; nếu 1 trong 3 lỗi → không render (hoặc render trang lỗi).

```js
async function loadProductPage(productId) {
  const endpoints = [
    `https://api.example.com/products/${productId}`,
    `https://api.example.com/products/${productId}/stock`,
    `https://api.example.com/products/${productId}/reviews`,
  ];

  const [product, stock, reviews] = await Promise.all(
    endpoints.map((url) =>
      fetch(url).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} at ${url}`);
        return r.json();
      }),
    ),
  );

  // Render trang với đủ dữ liệu
  return { product, stock, reviews };
}
```

##### b) `.allSettled()` — gom dữ liệu dù một số API lỗi

Ví dụ: trang chủ hiển thị danh sách sản phẩm + vẫn muốn load “reviews” cho sản phẩm nào lấy được.

```js
async function loadHomeBanners(productIds) {
  const promises = productIds.map((id) =>
    fetch(`https://api.example.com/products/${id}/thumbnail`).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }),
  );

  const results = await Promise.allSettled(promises);

  const thumbnails = results
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  // Các thumbnail lỗi thì bỏ qua, vẫn render phần lấy được
  return thumbnails;
}
```

##### c) `.race()` — chọn response nhanh nhất (failover)

Ví dụ: cùng một dữ liệu “giá sản phẩm” từ 2 endpoint/CDN; dùng cái trả về trước.

```js
async function loadPriceFast(productId) {
  const url1 = `https://cdn1.example.com/prices/${productId}`;
  const url2 = `https://cdn2.example.com/prices/${productId}`;

  const fastest = await Promise.race([
    fetch(url1).then((r) => {
      if (!r.ok) throw new Error(`CDN1 HTTP ${r.status}`);
      return r.json();
    }),
    fetch(url2).then((r) => {
      if (!r.ok) throw new Error(`CDN2 HTTP ${r.status}`);
      return r.json();
    }),
  ]);

  return fastest;
}
```

_(Race reject nếu cái “đầu tiên hoàn thành” là reject. Tùy yêu cầu có thể wrap để ignore reject.)_

##### d) `.any()` — chỉ cần 1 endpoint thành công

Ví dụ: lấy danh sách danh mục từ 3 region/endpoint; chỉ cần 1 cái trả dữ liệu.

```js
async function loadCategoriesAny() {
  const urls = [
    `https://region1.example.com/categories`,
    `https://region2.example.com/categories`,
    `https://backup.example.com/categories`,
  ];

  const data = await Promise.any(
    urls.map((url) =>
      fetch(url).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} at ${url}`);
        return r.json();
      }),
    ),
  );

  return data;
}
```

**Khi nào dùng nhanh?**

- `.all()` → cần “đầy đủ mới làm tiếp”.
- `.allSettled()` → cần “có bao nhiêu lấy được thì dùng bấy nhiêu”.
- `.race()` → “ai nhanh hơn thắng”.
- `.any()` → “miễn sao có 1 cái thành công”.
