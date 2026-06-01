import { useState } from "react";

function ClickEvents() {
    // --- STATE CHO THỬ THÁCH 1 ---
    const [bgColor, setBgColor] = useState("#f0f0f0");

    // --- STATE CHO THỬ THÁCH 2 ---
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    // --- STATE CHO THỬ THÁCH 3 ---
    const [isLiked, setIsLiked] = useState(false);

    // ==========================================
    // HÀM XỬ LÝ (Handlers)
    // ==========================================
    
    // Hàm tạo màu ngẫu nhiên (Thử thách 1)
    function handleRandomColor() {
        // Thuật toán tạo mã màu HEX ngẫu nhiên (VD: #ff0055)
        const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setBgColor(randomHex);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h1>Thử thách 5.1: Xử lý Sự kiện Click 🖱️</h1>
            <hr />

            {/* THỬ THÁCH 1: Nút "Đổi màu ngẫu nhiên" */}
            <h2>1. Đổi màu Box</h2>
            <div style={{ 
                backgroundColor: bgColor, 
                padding: "30px", 
                textAlign: "center",
                borderRadius: "8px",
                transition: "background-color 0.3s ease" // Hiệu ứng chuyển màu mượt
            }}>
                <p style={{ margin: "0 0 15px 0", fontWeight: "bold" }}>Màu hiện tại: {bgColor}</p>
                {/* Truyền tên hàm, KHÔNG CÓ dấu () */}
                <button 
                    onClick={handleRandomColor}
                    style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}
                >
                    Đổi màu ngẫu nhiên 🎨
                </button>
            </div>

            <hr style={{ margin: "20px 0" }} />

            {/* THỬ THÁCH 2: Đếm số lần click riêng biệt */}
            <h2>2. Bộ đếm độc lập</h2>
            <div style={{ display: "flex", gap: "20px" }}>
                {/* Dùng Arrow function inline vì logic rất ngắn gọn */}
                <button 
                    onClick={() => setCountA(countA + 1)}
                    style={{ padding: "10px", flex: 1, cursor: "pointer", background: "#3498db", color: "white", border: "none", borderRadius: "5px" }}
                >
                    Nút A (Đã bấm: {countA})
                </button>
                
                <button 
                    onClick={() => setCountB(countB + 1)}
                    style={{ padding: "10px", flex: 1, cursor: "pointer", background: "#e67e22", color: "white", border: "none", borderRadius: "5px" }}
                >
                    Nút B (Đã bấm: {countB})
                </button>
            </div>

            <hr style={{ margin: "20px 0" }} />

            {/* THỬ THÁCH 3: Nút Like với icon Toggle */}
            <h2>3. Nút Thích (Toggle)</h2>
            <button 
                onClick={() => setIsLiked(!isLiked)}
                style={{ 
                    padding: "10px 20px", 
                    fontSize: "18px", 
                    cursor: "pointer",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "20px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
            >
                {/* Giao diện thay đổi dựa trên state */}
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>

        </div>
    );
}

export default ClickEvents;