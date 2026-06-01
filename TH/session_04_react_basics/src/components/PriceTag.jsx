function PriceTag({ originalPrice, salePrice }) {
    // Tính phần trăm giảm giá (Tuỳ chọn thêm cho sinh động)
    const discount = Math.round((1 - salePrice / originalPrice) * 100);

    return (
        <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "8px", width: "200px" }}>
            {/* Giá gốc bị gạch ngang */}
            <p style={{ margin: 0, color: "gray", textDecoration: "line-through", fontSize: "14px" }}>
                Giá gốc: {originalPrice.toLocaleString("vi-VN")}đ
            </p>
            {/* Giá khuyến mãi in đậm + màu đỏ */}
            <p style={{ margin: "5px 0 0 0", color: "#e74c3c", fontWeight: "bold", fontSize: "18px" }}>
                Chỉ còn: {salePrice.toLocaleString("vi-VN")}đ
            </p>
            {/* Tag giảm giá */}
            <span style={{ 
                background: "#ffeaa7", color: "#d35400", padding: "2px 6px", 
                borderRadius: "4px", fontSize: "12px", fontWeight: "bold"
            }}>
                Giảm {discount}%
            </span>
        </div>
    );
}

export default PriceTag;