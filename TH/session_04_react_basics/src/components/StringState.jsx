import { useState } from "react";

function StringState() {
    // Khởi tạo các state để lưu trữ giá trị ô nhập
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // State quản lý việc Ẩn/Hiện mật khẩu (kiểu Boolean)
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h1>Thử thách 4.2: Xử lý Input ⌨️</h1>
            <hr />

            {/* THỬ THÁCH 1: Đếm số ký tự (Họ tên) */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold" }}>Họ và tên:</label><br />
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100} // Ngăn không cho nhập quá 100 ký tự
                    placeholder="Nhập họ tên của bạn..."
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
                <div style={{ 
                    textAlign: "right", 
                    fontSize: "12px", 
                    // Đổi màu đỏ nếu chạm mốc 100 ký tự
                    color: name.length === 100 ? "red" : "gray" 
                }}>
                    {name.length}/100
                </div>
            </div>

            {/* THỬ THÁCH 2: Kiểm tra ký tự @ (Email) */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold" }}>Email:</label><br />
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
                {/* Chỉ hiển thị thông báo khi người dùng đã nhập ít nhất 1 ký tự */}
                {email.length > 0 && (
                    <div style={{ fontSize: "14px", marginTop: "5px" }}>
                        {email.includes("@") 
                            ? <span style={{ color: "green" }}>✅ Email hợp lệ</span> 
                            : <span style={{ color: "red" }}>❌ Thiếu ký tự "@"</span>
                        }
                    </div>
                )}
            </div>

            {/* THỬ THÁCH 3: Ô nhập mật khẩu có nút Ẩn/Hiện */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold" }}>Mật khẩu:</label><br />
                <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                    <input 
                        // Mấu chốt: Thay đổi type giữa "text" và "password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        style={{ flex: 1, padding: "8px" }}
                    />
                    <button 
                        // Logic đảo ngược trạng thái: Đang true thành false, đang false thành true
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ padding: "8px 15px", cursor: "pointer" }}
                    >
                        {showPassword ? "🙈 Ẩn" : "👁️ Hiện"}
                    </button>
                </div>
            </div>

        </div>
    );
}

export default StringState;