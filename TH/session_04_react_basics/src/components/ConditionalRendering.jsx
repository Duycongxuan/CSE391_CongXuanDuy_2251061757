function ConditionalRendering() {
    // === CÁC BIẾN GIẢ LẬP TRẠNG THÁI ===
    const isOnline = true;       // Đổi thành false để xem thay đổi
    const isLoggedIn = true;     // Đổi thành false để ẩn menu
    const stock = 0;             // Đổi thành số > 0 để xem trạng thái còn hàng

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Giải quyết Thử thách 2.2 🎯</h1>
            <hr />

            {/* THỬ THÁCH 1: Hiển thị icon 🔴/🟢 dựa vào trạng thái online/offline */}
            {/* Dùng toán tử 3 ngôi vì có 2 trường hợp thay thế nhau */}
            <h2>1. Trạng thái User</h2>
            <p>
                Trạng thái hiện tại: {" "}
                <strong>{isOnline ? "🟢 Online" : "🔴 Offline"}</strong>
            </p>

            <hr />

            {/* THỬ THÁCH 2: Hiện/ẩn menu dựa vào isLoggedIn */}
            {/* Dùng && vì chúng ta chỉ muốn "HIỆN KHI ĐÚNG", nếu sai thì không hiện gì cả */}
            <h2>2. Menu điều hướng</h2>
            {isLoggedIn && (
                <div style={{ background: "#f0f0f0", padding: "10px", borderRadius: "8px" }}>
                    <ul style={{ margin: 0 }}>
                        <li>👤 Hồ sơ cá nhân</li>
                        <li>⚙️ Cài đặt</li>
                        <li>🚪 Đăng xuất</li>
                    </ul>
                </div>
            )}
            
            {/* Dùng thêm ! (NOT) để thông báo khi chưa đăng nhập (Tuỳ chọn thêm) */}
            {!isLoggedIn && (
                <p style={{ color: "gray" }}>Vui lòng đăng nhập để xem menu.</p>
            )}

            <hr />

            {/* THỬ THÁCH 3: Hiển thị "Hết hàng" khi stock = 0 */}
            <h2>3. Trạng thái kho hàng</h2>
            <p>Số lượng trong kho: {stock}</p>
            
            {/* Cách 1: Dùng && nếu chỉ quan tâm việc báo Hết hàng */}
            {stock === 0 && (
                <p style={{ color: "red", fontWeight: "bold" }}>🚨 Hết hàng!</p>
            )}

            {/* Cách 2: Dùng 3 ngôi nếu muốn báo cả 2 trạng thái Còn/Hết */}
            <p>
                Trạng thái: {" "}
                {stock === 0 ? (
                    <span style={{ color: "red" }}>Ngừng bán</span>
                ) : (
                    <span style={{ color: "green" }}>Đang bán</span>
                )}
            </p>

        </div>
    );
}

export default ConditionalRendering;