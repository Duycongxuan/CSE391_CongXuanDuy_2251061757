import { useState } from "react";

function KeyboardEvents() {
    // --- STATE THỬ THÁCH 1 (GAME ĐOÁN PHÍM) ---
    const [targetKey, setTargetKey] = useState("a"); // Phím cần bấm
    const [score, setScore] = useState(0);           // Điểm số

    // --- STATE THỬ THÁCH 2 (DI CHUYỂN Ô VUÔNG) ---
    // Dùng object để lưu tọa độ X (ngang), Y (dọc)
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // --- STATE THỬ THÁCH 3 (ĐỔI MÀU NỀN CTRL+D) ---
    const [isDarkMode, setIsDarkMode] = useState(false);

    // ==========================================
    // TỔNG HỢP XỬ LÝ PHÍM (Bắt mọi phím bấm)
    // ==========================================
    function handleKeyDown(e) {
        // --- Logic Thử thách 1 ---
        // Nếu phím bấm vào trùng với phím mục tiêu
        if (e.key.toLowerCase() === targetKey) {
            setScore(score + 1);
            // Tạo phím ngẫu nhiên mới từ a-z
            const chars = "abcdefghijklmnopqrstuvwxyz";
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            setTargetKey(randomChar);
        }

        // --- Logic Thử thách 2 ---
        const step = 20; // Mỗi lần bấm di chuyển 20px
        if (e.key === "ArrowUp") {
            // Giữ nguyên x (...position), chỉ trừ y đi 20 (đi lên)
            setPosition({ ...position, y: position.y - step });
            e.preventDefault(); // Chặn cuộn trang web
        }
        if (e.key === "ArrowDown") {
            setPosition({ ...position, y: position.y + step });
            e.preventDefault();
        }
        if (e.key === "ArrowLeft") {
            setPosition({ ...position, x: position.x - step });
        }
        if (e.key === "ArrowRight") {
            setPosition({ ...position, x: position.x + step });
        }

        // --- Logic Thử thách 3 ---
        // Bắt tổ hợp phím Ctrl + D (hoặc Cmd + D trên Mac)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
            e.preventDefault(); // QUAN TRỌNG: Chặn trình duyệt mở cửa sổ Bookmark
            setIsDarkMode(!isDarkMode); // Đổi Theme
        }
    }

    return (
        <div 
            // tabIndex={0} giúp thẻ div có thể bắt được sự kiện phím khi click vào
            tabIndex={0} 
            onKeyDown={handleKeyDown}
            style={{ 
                minHeight: "100vh",
                padding: "20px", 
                fontFamily: "sans-serif",
                outline: "none", // Xóa viền đen khi focus
                // Thử thách 3: Đổi màu nền dựa vào isDarkMode
                backgroundColor: isDarkMode ? "#2c3e50" : "#f8f9fa",
                color: isDarkMode ? "#ecf0f1" : "#2c3e50",
                transition: "all 0.3s ease"
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h1>Thử thách 5.3: Bàn phím Ma thuật ⌨️</h1>
                <p style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "18px" }}>
                    👉 CLICK CHUỘT VÀO VÙNG TRẮNG NÀY ĐỂ BẮT ĐẦU NHẬN PHÍM 👈
                </p>
                <p><strong>Thử thách 3:</strong> Nhấn tổ hợp <kbd>Ctrl</kbd> + <kbd>D</kbd> để đổi giao diện Sáng/Tối.</p>
            </div>

            <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
                
                {/* THỬ THÁCH 1: GAME ĐOÁN PHÍM */}
                <div style={{ border: "2px dashed #bdc3c7", padding: "20px", borderRadius: "10px", textAlign: "center", width: "250px" }}>
                    <h2>Game Nhập Phím</h2>
                    <p>Hãy nhấn phím:</p>
                    <div style={{ fontSize: "60px", fontWeight: "bold", color: "#3498db", textTransform: "uppercase" }}>
                        {targetKey}
                    </div>
                    <p style={{ fontSize: "20px" }}>Điểm của bạn: <strong>{score}</strong></p>
                </div>

                {/* THỬ THÁCH 2: DI CHUYỂN Ô VUÔNG */}
                <div style={{ border: "2px dashed #bdc3c7", padding: "20px", borderRadius: "10px", width: "300px", height: "300px", overflow: "hidden", position: "relative" }}>
                    <h2 style={{ textAlign: "center", margin: "0 0 10px 0" }}>Lái Xe (↑ ↓ ← →)</h2>
                    
                    {/* KHỐI VUÔNG DI CHUYỂN ĐƯỢC */}
                    <div style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#e74c3c",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        // Dùng CSS Transform để đẩy vị trí khối vuông
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        // Hiệu ứng di chuyển mượt
                        transition: "transform 0.1s linear"
                    }}>
                        🚗
                    </div>
                </div>

            </div>
        </div>
    );
}

export default KeyboardEvents;