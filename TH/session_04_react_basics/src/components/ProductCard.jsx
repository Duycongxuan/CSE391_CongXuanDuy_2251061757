// Nhận thêm isHot và stock từ cha truyền xuống
function ProductCard({ name, price, image, isHot, stock }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            padding: "15px",
            width: "220px", // Cố định chiều rộng cho đẹp
            position: "relative" // Quan trọng: Để neo tem HOT ở góc
        }}>
            
            {/* 1. HIỂN THỊ CÓ ĐIỀU KIỆN (Dùng &&): Hiện tem HOT nếu isHot = true */}
            {isHot && (
                <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "red",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    zIndex: 1
                }}>
                    🔥 HOT
                </div>
            )}

            <img src={image} alt={name} style={{ width: "100%", borderRadius: "4px" }} />
            <h3>{name}</h3>
            <p style={{ color: "#e74c3c", fontWeight: "bold" }}>{price}đ</p>
            
            {/* 2. HIỂN THỊ CÓ ĐIỀU KIỆN (Dùng 3 ngôi): Đổi trạng thái Nút bấm */}
            <button 
                // Vô hiệu hóa nút nếu hết hàng
                disabled={stock === 0} 
                
                style={{ 
                    width: "100%",
                    // Đổi màu nền: Nếu stock = 0 thì Xám, ngược lại Xanh
                    background: stock === 0 ? "#bdc3c7" : "#3498db", 
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "4px",
                    // Đổi hình con trỏ chuột
                    cursor: stock === 0 ? "not-allowed" : "pointer" 
                }}
            >
                {/* Đổi chữ: Nếu stock = 0 thì báo Hết hàng, ngược lại Thêm vào giỏ */}
                {stock === 0 ? "Đã hết hàng" : "Thêm vào giỏ"}
            </button>

            {/* Hiển thị thêm số lượng tồn kho (Tuỳ chọn) */}
            <p style={{ fontSize: "12px", color: "gray", textAlign: "center", marginTop: "10px" }}>
                Kho: {stock} sản phẩm
            </p>
        </div>
    );
}

export default ProductCard;