import { useState } from "react";

function MultipleStates() {
    // 1. Quản lý toàn bộ state của Form
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Thử thách 1: Thêm state Email
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    
    // State để chuyển đổi giao diện giữa Form và Màn hình thành công
    const [submitted, setSubmitted] = useState(false);
    
    // 2. Hàm xử lý khi bấm nút Đăng ký
    function handleSubmit() {
        // Kiểm tra rỗng (dùng .trim() để chặn trường hợp user chỉ gõ toàn dấu cách)
        if (name.trim() === "" || email.trim() === "" || age === "") {
            alert("Vui lòng nhập đầy đủ thông tin (Tên, Email, Tuổi)!");
            return; // Dừng hàm lại, không chạy tiếp code bên dưới
        }

        // Thử thách 2: Validate tuổi (> 0 và < 100)
        // Chuyển 'age' từ chuỗi sang số để so sánh chính xác
        const ageNumber = Number(age); 
        if (ageNumber <= 0 || ageNumber >= 100) {
            alert("Lỗi: Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
            return; // Dừng hàm lại
        }
        
        // Nếu vượt qua mọi bài kiểm tra (validate) ở trên thì cho phép submit
        setSubmitted(true);
    }
    
    // 3. Hàm xử lý khi bấm nút Đăng ký lại
    function handleReset() {
        setName("");
        setEmail(""); // Nhớ reset cả email
        setAge("");
        setIsStudent(false);
        setSubmitted(false); // Quay lại màn hình form
    }
    
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Form đăng ký thành viên 📝</h2>
            <hr style={{ marginBottom: "20px" }} />
            
            {/* Sử dụng toán tử 3 ngôi để chuyển đổi 2 màn hình */}
            {!submitted ? (
                // --- MÀN HÌNH 1: HIỂN THỊ FORM ---
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    
                    <div>
                        <label style={{ fontWeight: "bold" }}>Họ và tên: </label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập họ tên..."
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>

                    {/* Thử thách 1: Thêm input Email */}
                    <div>
                        <label style={{ fontWeight: "bold" }}>Email: </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ fontWeight: "bold" }}>Tuổi: </label>
                        <input 
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Nhập tuổi..."
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                            <input 
                                type="checkbox"
                                // Chú ý: Checkbox dùng 'checked' thay vì 'value'
                                checked={isStudent}
                                // Chú ý: Checkbox dùng 'e.target.checked' thay vì 'e.target.value'
                                onChange={(e) => setIsStudent(e.target.checked)}
                                style={{ width: "18px", height: "18px" }}
                            />
                            Tôi là sinh viên
                        </label>
                    </div>
                    
                    <button 
                        onClick={handleSubmit}
                        style={{ padding: "10px", background: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}
                    >
                        Đăng ký ngay
                    </button>
                </div>
            ) : (
                // --- MÀN HÌNH 2: HIỂN THỊ KẾT QUẢ THÀNH CÔNG ---
                <div style={{ background: "#d4edda", padding: "20px", borderRadius: "8px", border: "1px solid #c3e6cb" }}>
                    <h2 style={{ color: "#155724", marginTop: 0 }}>✅ Đăng ký thành công!</h2>
                    
                    {/* Thử thách 3: Hiển thị lời chào */}
                    <h3 style={{ color: "#2c3e50" }}>Xin chào {name}! 👋</h3>
                    
                    <p><strong>Email của bạn:</strong> {email}</p>
                    <p><strong>Tuổi:</strong> {age}</p>
                    <p><strong>Đối tượng:</strong> {isStudent ? "Sinh viên 🎓" : "Người đi làm 💼"}</p>
                    
                    <button 
                        onClick={handleReset}
                        style={{ marginTop: "15px", padding: "8px 15px", background: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        Trở lại / Đăng ký mới
                    </button>
                </div>
            )}
        </div>
    );
}

export default MultipleStates;