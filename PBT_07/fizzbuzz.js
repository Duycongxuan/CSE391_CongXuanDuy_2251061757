// ==========================================
// VERSION 1: CLASSIC FIZZBUZZ (1 - 100)
// ==========================================
function classicFizzBuzz() {
    console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===");
    for (let i = 1; i <= 100; i++) {
        let result = "";

        // Nếu chia hết cho 3 thì ghép chữ "Fizz" vào
        if (i % 3 === 0) result += "Fizz";
        
        // Nếu chia hết cho 5 thì ghép thêm chữ "Buzz" vào
        if (i % 5 === 0) result += "Buzz";

        // Nếu result rỗng (tức là không chia hết cho 3 và 5), in ra chính số đó
        console.log(result || i);
    }
}

// Chạy thử Version 1
classicFizzBuzz();


// ==========================================
// VERSION 2: CUSTOM FIZZBUZZ
// ==========================================
function customFizzBuzz(n, rules) {
    console.log(`\n=== VERSION 2: CUSTOM FIZZBUZZ (1 đến ${n}) ===`);
    
    // Lặp từ 1 đến n
    for (let i = 1; i <= n; i++) {
        let result = "";

        // Lặp qua từng rule trong mảng rules
        for (let j = 0; j < rules.length; j++) {
            let rule = rules[j];
            
            // Nếu số hiện tại (i) chia hết cho divisor của rule
            if (i % rule.divisor === 0) {
                // Cộng dồn word tương ứng vào chuỗi
                result += rule.word;
            }
        }

        // In ra kết quả (hoặc in số i nếu result vẫn là chuỗi rỗng)
        let output = result ? result : i;
        console.log(`${i} = ${output}`);
    }
}

customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);