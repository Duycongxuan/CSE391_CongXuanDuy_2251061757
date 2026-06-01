import { useState } from "react";

function NumberState() {
    // Khởi tạo state 'count' với giá trị ban đầu là 0
    const [count, setCount] = useState(0);

    // Xử lý logic màu sắc (Thử thách 3)
    let textColor = "black";
    if (count > 0) {
        textColor = "green";
    } else if (count < 0) {
        textColor = "red";
    }

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Thử thách 4.1: Làm chủ useState 🔢</h1>
            
            {/* Thử thách 3: Thay đổi màu chữ */}
            <h2 style={{ color: textColor, fontSize: "40px" }}>
                Bộ đếm: {count}
            </h2>

            {/* Thử thách 2: Hiển thị "Số dương", "Số âm", "Số không" */}
            <h3 style={{ color: "gray" }}>
                Đây là: {count > 0 ? "Số dương 📈" : count < 0 ? "Số âm 📉" : "Số không ⚪"}
            </h3>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
                {/* Các nút có sẵn */}
                <button onClick={() => setCount(count + 1)}>
                    Tăng (+1)
                </button>
                <button onClick={() => setCount(count - 1)}>
                    Giảm (-1)
                </button>
                <button onClick={() => setCount(0)}>
                    Reset
                </button>

                {/* Thử thách 1: Thêm nút "Tăng 5" */}
                <button onClick={() => setCount(count + 5)} style={{ background: "#3498db", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>
                    Tăng nhanh (+5)
                </button>
            </div>
        </div>
    );
}

export default NumberState;