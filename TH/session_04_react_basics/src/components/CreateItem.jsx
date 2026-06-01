import { useState } from "react";

function CreateItemChallenge() {
    // State quản lý danh sách môn học
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    
    // State quản lý ô nhập liệu
    const [newName, setNewName] = useState("");
    
    // Hàm xử lý Thêm phần tử
    function handleAdd() {
        const trimmedName = newName.trim();
        
        // 1. Kiểm tra rỗng
        if (trimmedName === "") {
            alert("Vui lòng nhập tên môn học!");
            return;
        }

        // THỬ THÁCH 1: Kiểm tra trùng lặp (dùng .some() để tìm kiếm)
        // Chuyển tất cả về chữ thường (toLowerCase) để so sánh chính xác (VD: "html" === "HTML")
        const isExist = items.some(
            item => item.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (isExist) {
            alert(`Môn học "${trimmedName}" đã tồn tại trong danh sách!`);
            return; // Dừng hàm, không cho thêm
        }
        
        // Tạo object mới với ID ngẫu nhiên không trùng lặp
        const newItem = {
            id: Date.now(),
            name: trimmedName
        };
        
        // THỬ THÁCH 2: Thêm lên đầu danh sách
        // Đặt newItem lên trước, sau đó mới rải (...items) cũ ra phía sau
        setItems([newItem, ...items]);  
        
        // Reset ô nhập liệu
        setNewName("");                  
    }
    
    // Cho phép bấm Enter để thêm
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }

    // THỬ THÁCH 3: Làm rỗng danh sách
    function handleClearAll() {
        if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách không?")) {
            setItems([]); // Truyền vào một mảng rỗng
        }
    }
    
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Quản lý môn học 📚</h2>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tên môn học..."
                    style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button 
                    onClick={handleAdd} 
                    style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                    ➕ Thêm
                </button>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
                <h3 style={{ margin: 0 }}>Danh sách ({items.length} môn):</h3>
                
                {/* Nút Xóa tất cả chỉ hiện khi danh sách có >= 1 phần tử */}
                {items.length > 0 && (
                    <button 
                        onClick={handleClearAll}
                        style={{ padding: "5px 10px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                    >
                        🗑️ Xóa tất cả
                    </button>
                )}
            </div>
            
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {items.length === 0 ? (
                    <p style={{ color: "gray", fontStyle: "italic", textAlign: "center" }}>Danh sách trống.</p>
                ) : (
                    items.map(item => (
                        <li key={item.id} style={{ 
                            padding: "12px", 
                            borderBottom: "1px solid #eee",
                            background: "#f9f9f9",
                            marginBottom: "5px",
                            borderRadius: "4px"
                        }}>
                            {item.name}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default CreateItemChallenge;