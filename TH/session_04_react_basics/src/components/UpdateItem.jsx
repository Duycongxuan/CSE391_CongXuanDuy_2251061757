import { useState, useRef } from "react";

function UpdateItem() {
    // 1. State danh sách dữ liệu
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    // 2. Các State phục vụ cho việc chỉnh sửa
    const [editingId, setEditingId] = useState(null); // Lưu ID của người đang được sửa
    const [editName, setEditName] = useState("");     // Lưu tên tạm thời lúc đang gõ
    const [editAge, setEditAge] = useState("");       // Lưu tuổi tạm thời lúc đang gõ
    
    // Thử thách 3: State lưu thông báo thành công
    const [successMsg, setSuccessMsg] = useState("");
    const timerRef = useRef(null); // Quản lý thời gian tắt thông báo

    // ==========================================
    // CÁC HÀM XỬ LÝ (ACTIONS)
    // ==========================================

    // Bật chế độ sửa
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
        setSuccessMsg(""); // Ẩn thông báo cũ (nếu có)
    }
    
    // Lưu lại dữ liệu mới
    function saveEdit() {
        // THỬ THÁCH 2: Validate - Không cho lưu nếu tên trống
        if (editName.trim() === "") {
            alert("⚠️ Tên sinh viên không được để trống!");
            return;
        }
        if (editAge === "" || Number(editAge) <= 0) {
            alert("⚠️ Vui lòng nhập tuổi hợp lệ!");
            return;
        }
        
        // Cập nhật lại mảng (Tuyệt chiêu dùng MAP)
        setItems(items.map(item => 
            // Nếu tìm thấy đúng cái ID đang sửa, thì tạo Object mới đè dữ liệu lên
            item.id === editingId 
                ? { ...item, name: editName.trim(), age: Number(editAge) }
                // Nếu ID khác (không bị sửa), thì giữ nguyên item cũ
                : item
        ));
        
        const savedName = editName; // Lưu tạm cái tên để in ra thông báo
        setEditingId(null); // Thoát chế độ sửa (Quay về chế độ xem)

        // THỬ THÁCH 3: Hiển thị thông báo "Đã lưu!"
        setSuccessMsg(`✅ Đã cập nhật thành công thông tin của "${savedName}"!`);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setSuccessMsg(""), 3000); // Tự tắt sau 3 giây
    }
    
    // Hủy sửa
    function cancelEdit() {
        setEditingId(null);
    }
    
    // Cho phép dùng bàn phím để Lưu hoặc Hủy
    function handleKeyDown(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") cancelEdit();
    }
    
    // ==========================================
    // GIAO DIỆN (RENDER)
    // ==========================================
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h2>Chỉnh sửa dữ liệu ✏️</h2>
            <hr />

            {/* Thông báo thành công (Thử thách 3) */}
            {successMsg && (
                <div style={{ background: "#d4edda", color: "#155724", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
                    {successMsg}
                </div>
            )}
            
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                {items.map(item => (
                    <div key={item.id} style={{ 
                        padding: "15px", 
                        borderBottom: "1px solid #eee",
                        // Đổi màu nền của cả khung nếu đang ở chế độ sửa
                        background: editingId === item.id ? "#f1f8ff" : "#fff",
                        transition: "background 0.3s"
                    }}>
                        
                        {/* KIỂM TRA ĐIỀU KIỆN ĐỂ ĐỔI GIAO DIỆN */}
                        {editingId === item.id ? (
                            // --- CHẾ ĐỘ SỬA (EDIT MODE) ---
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input 
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus // Tự động đưa con trỏ chuột vào ô này
                                    style={{ 
                                        padding: "8px", 
                                        flex: 1, 
                                        // THỬ THÁCH 1: Highlight input khi đang sửa
                                        border: "2px solid #3498db",
                                        borderRadius: "4px",
                                        outline: "none", // Bỏ viền đen mặc định của trình duyệt
                                        fontWeight: "bold"
                                    }}
                                />
                                <input 
                                    type="number"
                                    value={editAge}
                                    onChange={(e) => setEditAge(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    style={{ 
                                        padding: "8px", width: "60px", 
                                        border: "2px solid #3498db", borderRadius: "4px", outline: "none" 
                                    }}
                                />
                                <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
                                    Lưu
                                </button>
                                <button onClick={cancelEdit} style={{ background: "#95a5a6", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
                                    Hủy
                                </button>
                            </div>
                        ) : (
                            // --- CHẾ ĐỘ XEM (VIEW MODE) ---
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>
                                    <strong>{item.name}</strong> 
                                    <span style={{ color: "gray", fontSize: "14px", marginLeft: "10px" }}>{item.age} tuổi</span>
                                </span>
                                <button onClick={() => startEdit(item)} style={{ background: "#f39c12", color: "white", border: "none", padding: "6px 15px", borderRadius: "4px", cursor: "pointer" }}>
                                    ✏️ Sửa
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <p style={{ color: "gray", fontSize: "12px", marginTop: "10px" }}>
                * Mẹo: Khi đang sửa, nhấn <kbd>Enter</kbd> để Lưu, nhấn <kbd>ESC</kbd> để Hủy.
            </p>
        </div>
    );
}

export default UpdateItem;