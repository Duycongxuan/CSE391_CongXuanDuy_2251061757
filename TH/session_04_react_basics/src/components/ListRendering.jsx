function ListRendering() {
    // 1. Dữ liệu: Danh sách 5 sản phẩm
    // Luôn luôn nên có trường 'id' để làm 'key' khi render
    const products = [
        { id: 1, name: "Bàn phím cơ Logitech", price: 1500000 },
        { id: 2, name: "Chuột không dây", price: 450000 },
        { id: 3, name: "Màn hình Dell 24 inch", price: 3200000 },
        { id: 4, name: "Lót chuột cỡ lớn", price: 150000 },
        { id: 5, name: "Tai nghe Gaming", price: 1200000 }
    ];

    // 3. Tính tổng giá tất cả sản phẩm
    // Dùng hàm reduce() của Javascript để cộng dồn giá tiền
    const total = products.reduce((sum, product) => sum + product.price, 0);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Giải quyết Thử thách 2.3 🛒</h1>
            <hr />

            <h2>Danh sách Sản phẩm</h2>
            
            {/* THỬ THÁCH 1 & 2: Render danh sách và đổi màu */}
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {products.map((product) => (
                    <li 
                        key={product.id} 
                        style={{ 
                            padding: "10px", 
                            borderBottom: "1px solid #ccc",
                            // Thử thách 2: Nếu giá > 1 triệu thì chữ màu đỏ, ngược lại màu đen
                            color: product.price > 1000000 ? "red" : "black",
                            fontWeight: product.price > 1000000 ? "bold" : "normal"
                        }}
                    >
                        {/* Dùng .toLocaleString("vi-VN") để format tiền tệ có dấu chấm (VD: 1.500.000) */}
                        {product.name} — {product.price.toLocaleString("vi-VN")} đ
                    </li>
                ))}
            </ul>

            {/* THỬ THÁCH 3: Hiển thị tổng tiền */}
            <div style={{ 
                marginTop: "20px", 
                padding: "15px", 
                background: "#f8f9fa", 
                borderRadius: "8px",
                fontSize: "18px"
            }}>
                <strong>Tổng thanh toán: </strong> 
                <span style={{ color: "blue" }}>{total.toLocaleString("vi-VN")} đ</span>
            </div>

        </div>
    );
}

export default ListRendering;