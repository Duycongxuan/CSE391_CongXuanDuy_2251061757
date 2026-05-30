function createCart() {
    let items = [];
    let currentDiscountCode = null;

    // ==========================================
    // PUBLIC METHODS (API của Giỏ hàng)
    // ==========================================
    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            // Tìm xem sản phẩm đã có trong giỏ chưa
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity; // Nếu có rồi thì cộng dồn số lượng
            } else {
                // Nếu chưa có, copy object product và thêm thuộc tính quantity vào
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId); // Nếu số lượng <= 0 thì xóa luôn
                return;
            }

            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // 4. Tính tổng tiền (Có tính kèm giảm giá)
        getTotal() {
            // Tính tổng tiền gốc (Subtotal)
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let total = subtotal;

            // Áp dụng logic mã giảm giá
            if (currentDiscountCode === "SALE10") {
                total = subtotal * 0.9;
            } else if (currentDiscountCode === "SALE20") {
                total = subtotal * 0.8;
            } else if (currentDiscountCode === "FREESHIP") {
                total = Math.max(0, subtotal - 30000); // Không cho phép tổng tiền bị âm
            }

            return total;
        },

        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                currentDiscountCode = code;
            } else {
                console.log(`⚠️ Mã giảm giá '${code}' không hợp lệ!`);
            }
        },

        // 6. Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // 7. Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            currentDiscountCode = null;
        },

        // 8. In giỏ hàng dạng bảng Console
        printCart() {
            if (items.length === 0) {
                console.log("🛒 Giỏ hàng đang trống!");
                return;
            }

            // Hàm phụ trợ để format số tiền và căn lề chữ
            const formatVND = (num) => num.toLocaleString('vi-VN');
            const padR = (str, len) => String(str).padEnd(len, ' '); // Căn trái
            const padL = (str, len) => String(str).padStart(len, ' '); // Căn phải

            console.log("\n┌────────────────────────────────────────────────────────┐");
            console.log(`│ ${padR("#", 2)} │ ${padR("Sản phẩm", 15)} │ ${padL("SL", 3)} │ ${padL("Đơn giá", 11)} │ ${padL("Tổng", 13)} │`);
            console.log("├────────────────────────────────────────────────────────┤");
            
            let subtotal = 0;
            
            // In từng dòng sản phẩm
            items.forEach((item, index) => {
                const lineTotal = item.price * item.quantity;
                subtotal += lineTotal;
                
                const line = `│ ${padR(index + 1, 2)} │ ${padR(item.name, 15)} │ ${padL(item.quantity, 3)} │ ${padL(formatVND(item.price), 11)} │ ${padL(formatVND(lineTotal), 13)} │`;
                console.log(line);
            });

            console.log("├────────────────────────────────────────────────────────┤");
            
            const finalTotal = this.getTotal();
            const discountAmount = subtotal - finalTotal;

            // Nếu có mã giảm giá, in thêm dòng thể hiện mức giảm
            if (currentDiscountCode) {
                console.log(`│ Tạm tính: ${padL(formatVND(subtotal) + "đ", 43)} │`);
                console.log(`│ Mã giảm (${currentDiscountCode}): ${padL("-" + formatVND(discountAmount) + "đ", 35)} │`);
            }
            
            // In dòng Tổng cộng cuối cùng
            console.log(`│ Tổng cộng: ${padL(formatVND(finalTotal) + "đ", 42)} │`);
            console.log("└────────────────────────────────────────────────────────┘\n");
        }
    };
}

// ==========================================
// TEST CASES (Chạy thử theo yêu cầu đề bài)
// ==========================================

const cart = createCart();

// Thêm sản phẩm
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Trùng iPhone 16 -> kỳ vọng Quantity lên 2

// In ra lúc đầu
console.log("=== LÚC CHƯA CÓ MÃ GIẢM GIÁ ===");
cart.printCart();

// Áp mã giảm giá
console.log("=== SAU KHI ÁP MÃ 'SALE10' ===");
cart.applyDiscount("SALE10");
cart.printCart();

// Kiểm tra đếm số lượng và Xóa
console.log("Số SP trong giỏ:", cart.getItemCount()); // Kỳ vọng: 4 (2 iPhone + 2 AirPods)

cart.removeItem(3); // Xóa AirPods Pro (id: 3)
console.log("Số SP sau khi xóa AirPods:", cart.getItemCount()); // Kỳ vọng: 2 (Chỉ còn 2 iPhone)

// Thử Update số lượng
cart.updateQuantity(1, 5); // Đổi iPhone lên 5 cái
console.log("Số SP sau khi cập nhật lại số lượng iPhone:", cart.getItemCount()); // Kỳ vọng: 5