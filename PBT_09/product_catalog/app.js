// --- 1. DỮ LIỆU SẢN PHẨM (12 sản phẩm, 4 Categories) ---
const products = [
    { id: 1, name: "iPhone 15 Pro Max", price: 29990000, category: "phone", image: "https://placehold.co/200x200?text=iPhone", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 25990000, category: "phone", image: "https://placehold.co/200x200?text=Samsung", rating: 4.6, inStock: true },
    { id: 3, name: "Xiaomi 14", price: 19990000, category: "phone", image: "https://placehold.co/200x200?text=Xiaomi", rating: 4.2, inStock: true },
    { id: 4, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/200x200?text=MacBook", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 35000000, category: "laptop", image: "https://placehold.co/200x200?text=Dell+XPS", rating: 4.7, inStock: false },
    { id: 6, name: "Asus ROG Zephyrus", price: 42990000, category: "laptop", image: "https://placehold.co/200x200?text=Asus+ROG", rating: 4.5, inStock: true },
    { id: 7, name: "Lenovo ThinkPad", price: 21990000, category: "laptop", image: "https://placehold.co/200x200?text=ThinkPad", rating: 4.4, inStock: true },
    { id: 8, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200x200?text=iPad+Pro", rating: 4.8, inStock: true },
    { id: 9, name: "Samsung Galaxy Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/200x200?text=Tab+S9", rating: 4.5, inStock: true },
    { id: 10, name: "Apple Watch Series 9", price: 9990000, category: "accessory", image: "https://placehold.co/200x200?text=Apple+Watch", rating: 4.6, inStock: true },
    { id: 11, name: "AirPods Pro 2", price: 5990000, category: "accessory", image: "https://placehold.co/200x200?text=AirPods", rating: 4.7, inStock: true },
    { id: 12, name: "Sony WH-1000XM5", price: 7990000, category: "accessory", image: "https://placehold.co/200x200?text=Sony+Headphone", rating: 4.9, inStock: false }
];

// --- 2. GLOBAL STATE (Biến trạng thái) ---
let currentProducts = [...products]; // Danh sách đang hiển thị
let cartCount = 0;

// Format tiền tệ VNĐ
const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// --- 3. CÁC HÀM CHÍNH (Core Functions) ---

// Yêu cầu: renderProducts() bằng createElement
function renderProducts(items) {
    const grid = document.querySelector('#productGrid');
    grid.innerHTML = ''; // Xóa sạch grid cũ

    if (items.length === 0) {
        grid.innerHTML = '<h3 style="grid-column: 1/-1; text-align:center;">Không tìm thấy sản phẩm!</h3>';
        return;
    }

    items.forEach(product => {
        // Tạo Card
        const card = document.createElement('div');
        card.className = 'card';
        // Click vào card -> mở Modal
        card.addEventListener('click', () => showModal(product));

        // Hình ảnh
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        // Tên sản phẩm
        const title = document.createElement('h3');
        title.textContent = product.name;

        // Giá
        const price = document.createElement('p');
        price.textContent = formatPrice(product.price);

        // Rating
        const rating = document.createElement('div');
        rating.className = 'rating';
        rating.textContent = '⭐'.repeat(Math.round(product.rating)) + ` (${product.rating})`;

        // Nút thêm giỏ hàng
        const btn = document.createElement('button');
        btn.textContent = product.inStock ? 'Thêm vào giỏ' : 'Hết hàng';
        btn.disabled = !product.inStock;
        if (!product.inStock) btn.style.background = '#ccc';
        
        // Sự kiện thêm giỏ hàng (stopPropagation để không mở modal)
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            addToCart();
        });

        // Append vào Card -> Append vào Grid
        card.append(img, title, price, rating, btn);
        grid.appendChild(card);
    });
}

// Yêu cầu: searchProducts() - Tìm kiếm Realtime
function searchProducts(e) {
    const keyword = e.target.value.toLowerCase();
    // Lọc trên mảng gốc, giữ nguyên điều kiện category nếu đang chọn
    const activeCategory = document.querySelector('#categoryFilters .active').dataset.category;
    
    currentProducts = products.filter(p => {
        const matchName = p.name.toLowerCase().includes(keyword);
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        return matchName && matchCat;
    });
    
    // Sort lại theo dropdown hiện tại trước khi render
    sortProducts(document.querySelector('#sortSelect').value);
}

// Yêu cầu: filterByCategory()
function filterByCategory(category) {
    const keyword = document.querySelector('#searchInput').value.toLowerCase();
    
    currentProducts = products.filter(p => {
        const matchCat = category === 'all' || p.category === category;
        const matchName = p.name.toLowerCase().includes(keyword);
        return matchCat && matchName;
    });

    sortProducts(document.querySelector('#sortSelect').value);
}

// Yêu cầu: sortProducts()
function sortProducts(sortType) {
    // Sort trực tiếp trên mảng currentProducts
    currentProducts.sort((a, b) => {
        if (sortType === 'price-asc') return a.price - b.price;
        if (sortType === 'price-desc') return b.price - a.price;
        if (sortType === 'name-asc') return a.name.localeCompare(b.name);
        if (sortType === 'rating-desc') return b.rating - a.rating;
        return a.id - b.id; // default
    });
    renderProducts(currentProducts);
}

// Yêu cầu: Modal chi tiết sản phẩm tạo bằng JS
function showModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Đóng modal khi click ra ngoài
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    const content = document.createElement('div');
    content.className = 'modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '✖';
    closeBtn.addEventListener('click', () => overlay.remove());

    const img = document.createElement('img');
    img.src = product.image;
    img.style.width = '100%';
    img.style.marginBottom = '20px';

    const title = document.createElement('h2');
    title.textContent = product.name;

    const price = document.createElement('h3');
    price.textContent = formatPrice(product.price);
    price.style.color = 'var(--primary)';
    price.style.margin = '10px 0';

    const status = document.createElement('p');
    status.textContent = product.inStock ? "Còn hàng" : "Hết hàng";
    
    content.append(closeBtn, img, title, price, status);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
}

// Chức năng: Thêm vào giỏ hàng
function addToCart() {
    cartCount++;
    document.querySelector('#cartBadge').textContent = cartCount;
}

// --- 4. GẮN SỰ KIỆN (Event Listeners) ---

// Sự kiện Tìm kiếm (input = Realtime)
document.querySelector('#searchInput').addEventListener('input', searchProducts);

// Sự kiện Filter (Event Delegation cho các nút category)
document.querySelector('#categoryFilters').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        // Đổi màu nút active
        document.querySelectorAll('#categoryFilters button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        // Chạy filter
        filterByCategory(e.target.dataset.category);
    }
});

// Sự kiện Sort (Dropdown)
document.querySelector('#sortSelect').addEventListener('change', (e) => {
    sortProducts(e.target.value);
});

// Sự kiện Dark Mode Toggle
document.querySelector('#themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.querySelector('#themeToggle').textContent = isDark ? 'Light Mode' : 'Dark Mode';
});

// --- 5. KHỞI CHẠY LẦN ĐẦU ---
renderProducts(currentProducts);