import { useState } from "react";

function InputEvents() {
    // State lưu trữ dữ liệu
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    
    // State phụ trợ để làm hiệu ứng (Bonus)
    const [isTyping, setIsTyping] = useState(false);

    // ==========================================
    // TÍNH TOÁN DỮ LIỆU (Derived State)
    // ==========================================
    // Thử thách 3: Đếm số từ. 
    // Dùng regex /\s+/ để tách khoảng trắng, tab, xuống dòng...
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    // Thử thách 1: Validate email (có @ không)
    const isEmailValid = email.includes("@");

    // ==========================================
    // HÀM XỬ LÝ SỰ KIỆN (Event Handlers)
    // ==========================================
    function handleEmailKeyDown(e) {
        if (e.key === "Enter") {
            alert(`Bạn vừa nhấn Enter! Email của bạn là: ${email}`);
        }
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h1>Thử thách 5.2: Bậc thầy Ô nhập liệu ⌨️</h1>
            <hr />

            {/* THỬ THÁCH 1: Ô nhập Email + Validate + Nhấn Enter */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold" }}>Email của bạn:</label><br />
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEmailKeyDown} // Bắt sự kiện phím Enter
                    placeholder="Nhập email và nhấn Enter..."
                    style={{ 
                        width: "100%", 
                        padding: "10px", 
                        marginTop: "5px",
                        // Viền đỏ nếu đã nhập mà thiếu @, viền xanh nếu đúng
                        border: email.length === 0 ? "1px solid #ccc" : (isEmailValid ? "2px solid green" : "2px solid red"),
                        outline: "none"
                    }}
                />
                {/* Thông báo lỗi */}
                {email.length > 0 && !isEmailValid && (
                    <span style={{ color: "red", fontSize: "12px" }}>⚠️ Email phải chứa ký tự "@"</span>
                )}
            </div>

            {/* THỬ THÁCH 3: Ô nhập Text + Đếm từ + Focus/Blur */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold" }}>Giới thiệu bản thân:</label><br />
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setIsTyping(true)}   // Khi click chuột vào ô
                    onBlur={() => setIsTyping(false)}   // Khi click chuột ra ngoài
                    placeholder="Viết vài dòng về bạn..."
                    rows="4"
                    style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
                
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "gray" }}>
                    <span>
                        {isTyping ? "✍️ Bạn đang gõ..." : "Nhấp vào để viết tiếp"}
                    </span>
                    <span><strong>{wordCount}</strong> từ</span>
                </div>
            </div>

            <hr style={{ margin: "20px 0" }} />

            {/* THỬ THÁCH 2: Preview Realtime */}
            <h2>Màn hình Preview 👀</h2>
            <div style={{ 
                background: "#f8f9fa", 
                borderLeft: "4px solid #3498db", 
                padding: "15px", 
                borderRadius: "4px" 
            }}>
                <p style={{ margin: "0 0 10px 0" }}>
                    <strong>📧 Email liên hệ:</strong> {email || "(Chưa có email)"}
                </p>
                <p style={{ margin: 0, fontStyle: "italic", color: "#2c3e50" }}>
                    {text || "Nội dung giới thiệu sẽ hiển thị ở đây..."}
                </p>
            </div>

        </div>
    );
}

export default InputEvents;