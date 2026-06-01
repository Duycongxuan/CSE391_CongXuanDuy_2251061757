import { useState } from "react";

function BooleanState() {
    // Khởi tạo 3 state kiểu boolean cho 3 thử thách
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h1>Thử thách 4.3: Kỹ thuật Toggle 🔄</h1>
            <hr />

            {/* THỬ THÁCH 1: Ẩn/Hiện mật khẩu */}
            <h2>1. Form Mật khẩu</h2>
            <div style={{ display: "flex", gap: "10px" }}>
                <input 
                    // Dùng toán tử 3 ngôi để đổi type
                    type={showPassword ? "text" : "password"} 
                    placeholder="Nhập mật khẩu bí mật..."
                    style={{ flex: 1, padding: "8px" }}
                />
                <button 
                    // Đảo ngược trạng thái (từ false -> true, true -> false)
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ padding: "8px 12px", cursor: "pointer" }}
                >
                    {showPassword ? "Ẩn 🙈" : "Hiện 👁️"}
                </button>
            </div>

            <hr style={{ margin: "20px 0" }} />

            {/* THỬ THÁCH 2: Accordion (Đóng/Mở nội dung) */}
            <h2>2. Accordion Câu hỏi thường gặp</h2>
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                {/* Phần Tiêu đề (Click vào đây để toggle) */}
                <div 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ 
                        background: "#f8f9fa", 
                        padding: "15px", 
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold"
                    }}
                >
                    <span>React có khó học không?</span>
                    <span>{isOpen ? "🔼" : "🔽"}</span>
                </div>
                
                {/* Phần Nội dung (Dùng && để chỉ hiện khi isOpen = true) */}
                {isOpen && (
                    <div style={{ padding: "15px", borderTop: "1px solid #ddd", background: "#fff" }}>
                        <p style={{ margin: 0 }}>
                            Không hề khó! Bạn chỉ cần nắm vững Javascript cơ bản, 
                            hiểu về tư duy Component và cách quản lý State là có thể 
                            làm chủ được React.
                        </p>
                    </div>
                )}
            </div>

            <hr style={{ margin: "20px 0" }} />

            {/* THỬ THÁCH 3: Nút Bật/Tắt bóng đèn */}
            <h2>3. Công tắc đèn</h2>
            <div style={{ 
                // Thay đổi màu nền của khung chứa dựa vào state isLightOn
                background: isLightOn ? "#fff3cd" : "#2c3e50", 
                padding: "30px", 
                textAlign: "center",
                borderRadius: "8px",
                transition: "background 0.3s" // Tạo hiệu ứng chuyển màu mượt mà
            }}>
                <div style={{ fontSize: "60px", marginBottom: "15px" }}>
                    {isLightOn ? "💡" : "⚫"}
                </div>
                
                <button 
                    onClick={() => setIsLightOn(!isLightOn)}
                    style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        cursor: "pointer",
                        borderRadius: "20px",
                        border: "none",
                        fontWeight: "bold",
                        background: isLightOn ? "#dc3545" : "#28a745",
                        color: "white"
                    }}
                >
                    {isLightOn ? "Tắt Đèn" : "Bật Đèn"}
                </button>
            </div>

        </div>
    );
}

export default BooleanState;