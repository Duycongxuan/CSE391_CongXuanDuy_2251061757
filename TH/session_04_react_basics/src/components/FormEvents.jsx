import { useState } from "react";

function FormEvents() {
    // 1. Quản lý TOÀN BỘ dữ liệu form bằng 1 Object duy nhất
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "" // Thử thách 2: Thêm trường Xác nhận mật khẩu
    });

    // 2. Quản lý trạng thái Lỗi (Errors) cho Real-time validation
    const [errors, setErrors] = useState({
        email: "",
        confirmPassword: ""
    });

    const [submitted, setSubmitted] = useState(false);

    // ==========================================
    // HÀM XỬ LÝ SỰ KIỆN THAY ĐỔI Ô NHẬP (Real-time)
    // ==========================================
    function handleChange(event) {
        // Lấy 'name' và 'value' từ ô input vừa được gõ
        const { name, value } = event.target;
        
        // Tạo object dữ liệu mới
        const newFormData = {
            ...formData,
            [name]: value
        };
        setFormData(newFormData); // Cập nhật state dữ liệu

        // --- THỬ THÁCH 1 & 3: VALIDATE REALTIME ---
        let newErrors = { ...errors }; // Copy lại object lỗi cũ

        // Kiểm tra Email
        if (name === "email") {
            if (value.length > 0 && !value.includes("@")) {
                newErrors.email = "Email bắt buộc phải chứa ký tự '@'";
            } else {
                newErrors.email = ""; // Xóa lỗi nếu đúng
            }
        }

        // Kiểm tra Xác nhận mật khẩu (So sánh password và confirmPassword)
        if (name === "password" || name === "confirmPassword") {
            if (newFormData.confirmPassword.length > 0 && newFormData.password !== newFormData.confirmPassword) {
                newErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";
            } else {
                newErrors.confirmPassword = "";
            }
        }

        setErrors(newErrors); // Cập nhật state lỗi lên màn hình
    }

    // ==========================================
    // HÀM XỬ LÝ SUBMIT FORM
    // ==========================================
    function handleSubmit(event) {
        // QUAN TRỌNG NHẤT: Ngăn trình duyệt tự động reload trang web
        event.preventDefault(); 

        // Kiểm tra chốt chặn cuối cùng trước khi gửi
        if (!formData.name || !formData.email.includes("@") || formData.password !== formData.confirmPassword) {
            alert("⚠️ Vui lòng điền đầy đủ và chính xác thông tin!");
            return;
        }

        // Nếu mọi thứ OK -> Chuyển sang màn hình thành công
        setSubmitted(true);
    }

    function handleReset() {
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setErrors({ email: "", confirmPassword: "" });
        setSubmitted(false);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h2>Đăng Ký Tài Khoản 🚀</h2>
            <hr style={{ marginBottom: "20px" }} />

            {!submitted ? (
                // THẺ <form> LUÔN ĐI KÈM onSubmit
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    
                    {/* Trường Họ Tên */}
                    <div>
                        <label>Họ và tên: </label>
                        <input 
                            type="text"
                            name="name" // CỰC KỲ QUAN TRỌNG: Phải khớp với key trong formData
                            value={formData.name}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                            required
                        />
                    </div>

                    {/* Trường Email */}
                    <div>
                        <label>Email: </label>
                        <input 
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ 
                                width: "100%", padding: "8px", marginTop: "5px",
                                border: errors.email ? "1px solid red" : "1px solid #ccc" 
                            }}
                        />
                        {/* Hiển thị lỗi Realtime */}
                        {errors.email && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.email}</div>}
                    </div>

                    {/* Trường Mật khẩu */}
                    <div>
                        <label>Mật khẩu: </label>
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                            required
                        />
                    </div>

                    {/* Trường Xác nhận mật khẩu */}
                    <div>
                        <label>Xác nhận mật khẩu: </label>
                        <input 
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{ 
                                width: "100%", padding: "8px", marginTop: "5px",
                                border: errors.confirmPassword ? "1px solid red" : "1px solid #ccc"
                            }}
                            required
                        />
                        {/* Hiển thị lỗi Realtime */}
                        {errors.confirmPassword && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.confirmPassword}</div>}
                    </div>

                    {/* 
                        LƯU Ý: Nút này sẽ tự động kích hoạt onSubmit của thẻ <form> 
                        Tuyệt đối KHÔNG viết: <button onClick={handleSubmit}>
                    */}
                    <button type="submit" style={{ padding: "10px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                        Đăng Ký
                    </button>
                    
                    <button type="button" onClick={handleReset} style={{ padding: "10px", background: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        Nhập lại từ đầu
                    </button>

                </form>
            ) : (
                // MÀN HÌNH THÀNH CÔNG
                <div style={{ background: "#d4edda", padding: "20px", borderRadius: "8px", color: "#155724" }}>
                    <h3 style={{ marginTop: 0 }}>✅ Đăng ký thành công!</h3>
                    <p><strong>Tên:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><em>(Mật khẩu đã được mã hóa và ẩn đi)</em></p>
                    <button onClick={handleReset} style={{ marginTop: "15px", padding: "8px 15px", cursor: "pointer" }}>
                        Đăng xuất / Quay lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default FormEvents;