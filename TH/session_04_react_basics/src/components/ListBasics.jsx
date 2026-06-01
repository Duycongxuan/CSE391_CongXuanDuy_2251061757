import { useState } from "react";

function ListBasics() {
    // Dữ liệu mảng trái cây (Cố định, không dùng ID)
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);
    
    // Dữ liệu mảng sinh viên (Có ID rõ ràng)
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 },
        { id: 4, name: "Hoa", age: 22 } // Thêm 1 người để số trung bình tính ra lẻ cho sinh động
    ]);

    // ==========================================
    // TÍNH TOÁN TRƯỚC KHI RENDER
    // ==========================================
    
    // Thử thách 3: Tính tuổi trung bình
    // B1: Tính tổng tuổi bằng reduce()
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    // B2: Chia trung bình và làm tròn 1 chữ số thập phân
    const avgAge = (totalAge / students.length).toFixed(1);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h1>Thử thách 6.1: Hiển thị Danh sách 📋</h1>
            <hr />

            <h2>Danh sách trái cây</h2>
            <ul style={{ paddingLeft: "20px" }}>
                {fruits.map((fruit, index) => (
                    // Với mảng đơn giản (string, number), có thể dùng index làm key
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <hr style={{ margin: "20px 0" }} />
            
            <h2>Danh sách sinh viên</h2>
            {/* 
                THỬ THÁCH 1: Lấy thêm biến 'index' từ hàm map() để làm STT 
            */}
            {students.map((student, index) => (
                <div 
                    key={student.id} // BẮT BUỘC: Dùng ID làm key với mảng Object
                    style={{ 
                        padding: "10px", 
                        margin: "8px 0",
                        background: "#f8f9fa",
                        borderLeft: "4px solid #ccc",
                        borderRadius: "4px",
                        
                        // THỬ THÁCH 2: Đổi màu xanh nếu tuổi >= 20
                        color: student.age >= 20 ? "#27ae60" : "#2c3e50",
                        fontWeight: student.age >= 20 ? "bold" : "normal",
                        borderColor: student.age >= 20 ? "#27ae60" : "#ccc" // Thêm border cho đẹp
                    }}
                >
                    {/* STT là index + 1 (vì index bắt đầu từ 0) */}
                    <span>{index + 1}. </span> 
                    <span><strong>{student.name}</strong> - {student.age} tuổi</span>
                    
                    {/* Label gắn thêm cho rõ ràng */}
                    {student.age >= 20 && <span style={{ marginLeft: "10px", fontSize: "12px", background: "#e8f8f5", padding: "2px 6px", borderRadius: "10px" }}>Đủ tuổi</span>}
                </div>
            ))}

            {/* THỬ THÁCH 3: Hiển thị tuổi trung bình */}
            <div style={{ 
                marginTop: "20px", 
                padding: "15px", 
                background: "#e3f2fd", 
                borderRadius: "8px",
                color: "#1565c0",
                fontSize: "18px"
            }}>
                <strong>📊 Tuổi trung bình của lớp: </strong> {avgAge}
            </div>
        </div>
    );
}

export default ListBasics;