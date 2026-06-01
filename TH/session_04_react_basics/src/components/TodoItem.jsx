import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    // 🚀 NÂNG CẤP: State quản lý việc sửa (Level 2)
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    function handleSave() {
        if (editText.trim() === "") return;
        onEdit(todo.id, editText);
        setIsEditing(false); // Thoát chế độ sửa
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") {
            setEditText(todo.text); // Khôi phục chữ cũ
            setIsEditing(false);
        }
    }

    return (
        <div style={{ 
            display: "flex", alignItems: "center", padding: "12px", margin: "8px 0",
            background: todo.done ? "#f0fff0" : "#fff",
            border: "1px solid #eee", borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            transition: "all 0.2s"
        }}>
            <input 
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: "12px", width: "18px", height: "18px", cursor: "pointer" }}
            />
            
            {/* 🚀 NÂNG CẤP: Chuyển đổi giữa Xem và Sửa */}
            {isEditing ? (
                <input 
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave} // Bấm ra ngoài là tự lưu
                    autoFocus
                    style={{ flex: 1, padding: "6px", fontSize: "16px", border: "1px solid #3498db", borderRadius: "4px", outline: "none" }}
                />
            ) : (
                <div 
                    // Sự kiện Double Click để bật chế độ sửa
                    onDoubleClick={() => !todo.done && setIsEditing(true)} 
                    style={{ flex: 1, cursor: todo.done ? "default" : "text", opacity: todo.done ? 0.6 : 1 }}
                >
                    <div style={{ 
                        textDecoration: todo.done ? "line-through" : "none",
                        fontSize: "16px", fontWeight: todo.done ? "normal" : "500"
                    }}>
                        {todo.text}
                    </div>
                    {/* Hiển thị ngày tạo */}
                    <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
                        Tạo lúc: {todo.createdAt}
                    </div>
                </div>
            )}

            {!isEditing && (
                <div style={{ display: "flex", gap: "5px" }}>
                    {!todo.done && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            title="Sửa (Double-click vào chữ)"
                            style={{ background: "transparent", color: "#f39c12", border: "none", cursor: "pointer", fontSize: "16px" }}
                        >
                            ✏️
                        </button>
                    )}
                    <button 
                        onClick={() => onDelete(todo.id)}
                        title="Xóa"
                        style={{ background: "transparent", color: "#e74c3c", border: "none", cursor: "pointer", fontSize: "16px" }}
                    >
                        🗑️
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoItem;