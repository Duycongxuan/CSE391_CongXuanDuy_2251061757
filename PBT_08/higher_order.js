// file: higher_order.js

// ==========================================
// 1. PIPE() — Nối chuỗi các function
// Ý nghĩa: Nhận vào một danh sách các hàm. Trả về 1 hàm mới. 
// Khi gọi hàm mới này, dữ liệu sẽ chảy qua từng hàm một theo thứ tự từ trái sang phải.
// ==========================================
function pipe(...fns) {
    // Trả về một hàm nhận vào giá trị ban đầu (initialValue)
    return function(initialValue) {
        // Dùng reduce để truyền kết quả của hàm trước làm tham số cho hàm sau
        return fns.reduce((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, initialValue);
    };
}

// TEST 1
const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("=== 1. TEST PIPE ===");
console.log(process(5)); // → "Kết quả: 20"


// ==========================================
// 2. MEMOIZE() — Cache kết quả tính toán
// Ý nghĩa: Dùng Closure để lưu trữ (cache) lại kết quả của những hàm tốn thời gian tính toán.
// Nếu hàm được gọi lại với cùng tham số, trả về kết quả trong cache thay vì tính lại.
// ==========================================
function memoize(fn) {
    const cache = {}; // Object lưu trữ kết quả (Closure private variable)

    return function(...args) {
        // Biến các tham số thành một chuỗi (string) để làm key cho object cache
        const key = JSON.stringify(args); 
        
        // Nếu key đã tồn tại trong cache, trả về luôn kết quả đã lưu
        if (cache[key] !== undefined) {
            return cache[key];
        }

        // Nếu chưa có, gọi hàm fn để tính toán
        const result = fn(...args);
        
        // Lưu kết quả vào cache để dùng cho lần sau
        cache[key] = result;
        
        return result;
    };
}

// TEST 2
console.log("\n=== 2. TEST MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán cực nhọc...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // Lần 1: In "Đang tính..." -> 499999500000
console.log(expensiveCalc(1000000)); // Lần 2: Không in "Đang tính...", lấy từ cache -> 499999500000


// ==========================================
// 3. DEBOUNCE() — Chờ user ngừng thao tác
// Ý nghĩa: Ngăn chặn một hàm chạy quá nhiều lần liên tục. 
// Nó sẽ delay việc thực thi lại, nếu trong thời gian delay mà hàm tiếp tục bị gọi, nó sẽ reset lại thời gian chờ.
// (Thường dùng cho thanh Search, click button liên tục, scroll màn hình)
// ==========================================
function debounce(fn, delay) {
    let timerId; // Closure private variable
    
    return function(...args) {
        // Xóa bộ đếm giờ cũ nếu user lại tiếp tục gọi hàm
        clearTimeout(timerId);
        
        // Đặt lại bộ đếm giờ mới
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// TEST 3
console.log("\n=== 3. TEST DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Đang gửi API tìm kiếm cho:", query);
}, 500);

// Giả lập user gõ phím liên tục cực nhanh
search("i");        // Bị hủy
search("iP");       // Bị hủy
search("iPho");     // Bị hủy
search("iPhone");   // Mãi 500ms sau mới chạy cái cuối cùng này


// ==========================================
// 4. RETRY() — Thử lại nếu có lỗi
// Ý nghĩa: Nhận vào một hàm Async (gọi API). Nếu hàm lỗi, tự động gọi lại hàm đó cho đến khi
// vượt quá số lần maxAttempts.
// ==========================================
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Chờ kết quả của hàm, nếu thành công thì return luôn, kết thúc vòng lặp
            return await fn(); 
        } catch (error) {
            console.log(`Lỗi ở lần thử ${attempt}/${maxAttempts}: ${error.message}`);
            // Nếu đã chạy đến lần thử cuối cùng mà vẫn lỗi thì ném (throw) lỗi đó ra ngoài
            if (attempt === maxAttempts) {
                throw new Error("Đã thử tối đa nhưng vẫn thất bại!");
            }
        }
    }
}

// TEST 4
console.log("\n=== 4. TEST RETRY ===");

// Giả lập một API dỏm, gọi 2 lần đầu sẽ lỗi, lần 3 mới thành công
let counter = 0;
const fakeApiCall = async () => {
    counter++;
    if (counter < 3) {
        throw new Error("Mạng bị đứt!");
    }
    return "Lấy dữ liệu thành công ở lần " + counter;
};

// Chạy thử hàm retry
retry(fakeApiCall, 3)
    .then(result => console.log("Kết quả cuối cùng:", result))
    .catch(err => console.log("Catch block:", err.message));