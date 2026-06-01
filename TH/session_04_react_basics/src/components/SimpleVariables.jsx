function SimpleVariables() {
    // ==========================================
    // PHẦN 1: KHAI BÁO BIẾN VÀ XỬ LÝ LOGIC
    // ==========================================

    // 1. Thông tin cá nhân
    const ten = "Trần Văn A";
    const tuoi = 21;
    const queQuan = "Hồ Chí Minh";

    // 2. Lấy giờ hiện tại và xác định lời chào
    const gioHienTai = new Date().getHours();
    let loiChao;
    
    // Xử lý if/else ở bên ngoài JSX
    if (gioHienTai < 12) {
        loiChao = "Chào buổi sáng 🌅";
    } else if (gioHienTai < 18) {
        loiChao = "Chào buổi chiều 🌇";
    } else {
        loiChao = "Chào buổi tối 🌙";
    }

    // 3. Thông tin để tính BMI
    const canNang = 65; // Tính bằng kg
    const chieuCao = 1.75; // Tính bằng mét (m)
    // Tính BMI trước, hoặc tính trực tiếp trong JSX đều được
    const bmi = canNang / (chieuCao * chieuCao);

    // ==========================================
    // PHẦN 2: HIỂN THỊ (RENDER)
    // ==========================================
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Giải quyết Thử thách 2.1 🚀</h1>
            
            <hr />
            
            {/* Thử thách 1 */}
            <h2>1. Thông tin cá nhân</h2>
            <p><strong>Tên:</strong> {ten}</p>
            <p><strong>Tuổi:</strong> {tuoi}</p>
            <p><strong>Quê quán:</strong> {queQuan}</p>

            {/* Thử thách 2 */}
            <h2>2. Lời chào theo thời gian</h2>
            <p>Bây giờ là {gioHienTai} giờ. <strong>{loiChao}!</strong></p>
            
            {/* Cách viết trực tiếp bằng toán tử ba ngôi (Ternary Operator) trong JSX */}
            <p>
                <i>Cách viết tắt trong JSX:</i> {" "}
                {gioHienTai < 12 ? "Chào buổi sáng" : gioHienTai < 18 ? "Chào buổi chiều" : "Chào buổi tối"}
            </p>

            {/* Thử thách 3 */}
            <h2>3. Tính chỉ số BMI</h2>
            <p><strong>Cân nặng:</strong> {canNang} kg</p>
            <p><strong>Chiều cao:</strong> {chieuCao} m</p>
            {/* Sử dụng .toFixed(2) để làm tròn đến 2 chữ số thập phân */}
            <p><strong>Chỉ số BMI của bạn là:</strong> {bmi.toFixed(2)}</p>
            
            {/* Hoặc có thể tính toán trực tiếp bên trong {} */}
            <p><strong>Tính trực tiếp trong JSX:</strong> {(canNang / Math.pow(chieuCao, 2)).toFixed(2)}</p>
        </div>
    );
}

export default SimpleVariables;