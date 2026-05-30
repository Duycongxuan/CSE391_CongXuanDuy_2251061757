# PHIẾU BÀI TẬP 08
# **JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS**

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

```javascript
// CÁCH 1: Function Declaration (Khai báo hàm truyền thống)
function tinhThueBaoHiem1(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
}

// CÁCH 2: Function Expression (Biểu thức hàm)
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};

// CÁCH 3: Arrow Function (Hàm mũi tên - ES6)
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
```

**Giải thích:**
- **Function Declaration** được Hoisted toàn bộ (cả tên hàm và nội dung hàm). Do đó, bạn có thể gọi hàm trước khi viết nó.
- **Function Expression** và **Arrow Function** (nếu dùng const/let) sẽ đưa biến vào vùng chết tạm thời (Temporal Dead Zone), `KHÔNG THỂ` gọi hàm trước khi khởi tạo.

**Ví dụ code:**
```javascript
// Chạy thành công (In ra object)
console.log(hamDeclaration(15000000)); 
function hamDeclaration(luong) {
    return { thuc_nhan: luong * 0.9 };
}

// Báo lỗi: ReferenceError: Cannot access 'hamExpression' before initialization
console.log(hamExpression(15000000)); 
const hamExpression = function(luong) {
    return { thuc_nhan: luong * 0.9 };
}

// Báo lỗi: ReferenceError: Cannot access 'hamArrow' before initialization
console.log(hamArrow(15000000)); 
const hamArrow = (luong) => {
    return { thuc_nhan: luong * 0.9 };
}
```

### Câu A2 (5đ) — Scope & Closure

```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1  (++count tăng lên 1 rồi mới trả về 1)
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2  (--count giảm xuống 2 rồi trả về 2)
console.log(c.getCount());   // 2  (Trả về giá trị count hiện tại)

//Giải thích: Mặc dù hàm counter() đã chạy xong, nhưng object được return về vẫn giữ được "đường dẫn" (tham chiếu) đến biến count trong phạm vi (scope) của hàm mẹ. Biến count trở thành một biến private.

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
/* Output sau 200ms:
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
*/

/** 
 * Vòng lặp var: Do var có phạm vi Function Scope (không bị giới hạn bởi block {} vòng lặp), nên chỉ có duy nhất 1 biến i được tạo ra. Khi vòng lặp chạy xong siêu nhanh, i đã bằng 3. Sau 100ms, cả 3 hàm setTimeout thức dậy và cùng nhìn vào biến i đó -> Cùng in ra số 3.
 * Vòng lặp let: Do let có phạm vi Block Scope, ở mỗi vòng lặp (iteration), nó sẽ tạo ra một bản sao hoàn toàn mới của biến j và đóng gói (closure) nó vào setTimeout tương ứng. Sau 200ms, các hàm in ra đúng giá trị của bản sao đó -> In ra 0, 1, 2.
*/
```

### Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn → [2, 4, 6, 8, 10]
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3 → [3, 6, 9, ..., 30]
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả → 55
const sum = nums.reduce((total, n) => total + n, 0);

// 4. Tìm số đầu tiên > 7 → 8
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không → false
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0 → true
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]" → ["Số 1 là lẻ", "Số 2 là chẵn", ...]
const strArray = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc) → [10, 9, ..., 1]
const reversed = [...nums].reverse(); // Hoặc dùng chuẩn mới nhất (ES2023): nums.toReversed()
```

### Câu A4 (5đ) — Object Destructuring & Spread

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // specs is not defined

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            //  25990000  (gốc có đổi?)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 (16 hay 8? Tại sao?)

/**
  * Nó tạo ra một object mới (copy) và copy các thuộc tính ở "tầng ngoài cùng" (top-level) như name và price.
  * Nhưng đối với các Nested Object (Object lồng bên trong như specs), nó KHÔNG copy toàn bộ dữ liệu bên trong, mà nó chỉ copy địa chỉ tham chiếu (Reference).
  * Kết quả là copy.specs và product.specs đang cùng trỏ về một ô nhớ. Khi bạn thay đổi copy.specs.ram, thuộc tính của product cũng bị thay đổi theo.
 */
```

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Refactor Code

```javascript
const processOrders = (orders) => orders
    .filter(o => o.status === "completed" && o.total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9 // finalTotal = total - discount (tức là 90% của total)
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Câu C2 (10đ) — Thiết kế API

```javascript
const miniArray = {
    // 1. Mô phỏng Array.prototype.map
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // map() truyền 3 tham số vào callback: (element, index, originalArray)
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // 2. Mô phỏng Array.prototype.filter
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // filter() cũng truyền 3 tham số. Nếu fn trả về true thì nhét phần tử vào mảng kết quả
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // 3. Mô phỏng Array.prototype.reduce
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;

        // Nếu người dùng KHÔNG truyền initialValue, lấy phần tử đầu tiên làm giá trị khởi tạo
        if (initialValue === undefined) {
            if (arr.length === 0) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            accumulator = arr[0];
            startIndex = 1; // Bắt đầu vòng lặp từ phần tử thứ 2
        }

        // Lặp qua mảng và cập nhật biến accumulator
        for (let i = startIndex; i < arr.length; i++) {
            // reduce() truyền 4 tham số: (accumulator, currentValue, currentIndex, originalArray)
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

// ==========================================
// TEST CASES (Chạy thử)
// ==========================================
console.log("=== MAP ===");
console.log(miniArray.map([1, 2, 3], x => x * 2));

console.log("\n=== FILTER ===");
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // → [3,4]

console.log("\n=== REDUCE ===");
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10
```