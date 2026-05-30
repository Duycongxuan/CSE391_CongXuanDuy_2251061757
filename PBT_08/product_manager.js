const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// ==========================================
// ĐỊNH NGHĨA CÁC HÀM XỬ LÝ (Array Methods)
// ==========================================

// 1. Lọc sản phẩm còn hàng (stock > 0)
const getInStock = (products) => products.filter(p => p.stock > 0);

// 2. Lọc theo category VÀ khoảng giá
const filterProducts = (products, category, minPrice, maxPrice) => 
    products.filter(p => p.category === category && p.price >= minPrice && p.price <= maxPrice);

// 3. Sắp xếp theo giá (tăng/giảm)
// Lưu ý: Dùng [...products] để copy mảng trước khi sort, tránh mutate (làm biến đổi) mảng gốc.
const sortByPrice = (products, order = "asc") => {
    return [...products].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
};

// 4. Tìm sản phẩm rẻ nhất mỗi category
// Sử dụng reduce để tạo ra một object gom nhóm
const cheapestByCategory = (products) => {
    return products.reduce((acc, currentProduct) => {
        const cat = currentProduct.category;
        // Nếu category chưa có trong accumulator HOẶC sản phẩm hiện tại rẻ hơn sản phẩm đã lưu
        if (!acc[cat] || currentProduct.price < acc[cat].price) {
            acc[cat] = currentProduct; 
        }
        return acc;
    }, {}); // {} là giá trị khởi tạo (initial value) của accumulator
};

// 5. Tính tổng giá trị kho (price × stock cho mỗi SP)
const totalInventoryValue = (products) => {
    return products.reduce((total, p) => total + (p.price * p.stock), 0);
};

// 6. Tạo mảng chỉ chứa { name, formattedPrice }
const formatProductList = (products) => {
    return products.map(p => ({
        name: p.name,
        // Dùng toLocaleString để format số tiền
        formattedPrice: `${p.price.toLocaleString('vi-VN')}đ` 
    }));
};

// 7. Tính rating trung bình toàn bộ
const averageRating = (products) => {
    if (products.length === 0) return 0;
    const totalRating = products.reduce((sum, p) => sum + p.rating, 0);
    // Làm tròn 1 chữ số thập phân (VD: 4.47 -> 4.5)
    return Math.round((totalRating / products.length) * 10) / 10; 
};

// 8. Tìm sản phẩm theo keyword (tìm trong name, case-insensitive)
const searchProducts = (products, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lowerKeyword));
};

// ==========================================
// TEST CASES
// ==========================================

console.log("=== 1. IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== 2. PHONES TỪ 15 - 25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== 3. SẮP XẾP GIÁ (GIẢM DẦN) ===");
// Chỉ in ra id, name, price cho dễ nhìn
console.log(sortByPrice(products, "desc").map(p => ({ id: p.id, name: p.name, price: p.price })));

console.log("\n=== 4. CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== 5. TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString('vi-VN') + "đ");

console.log("\n=== 6. FORMATTED PRODUCT LIST ===");
console.log(formatProductList(products));

console.log("\n=== 7. AVERAGE RATING ===");
console.log(averageRating(products));

console.log("\n=== 8. SEARCH KEYWORD 'pro' ===");
console.log(searchProducts(products, "pro"));