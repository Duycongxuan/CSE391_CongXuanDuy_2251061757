import { useState } from "react";

function TodoForm({ onAdd }) {
    const [inputValue, setInputValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); // Ngăn reload trang khi nhấn Enter trong Form
        if (inputValue.trim() === "") return;
        
        onAdd(inputValue); // Bắn dữ liệu lên cho App.jsx
        setInputValue(""); // Xóa trắng ô nhập
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", marginBottom: "20px" }}>
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập công việc mới..."
                style={{ flex: 1, padding: "10px", fontSize: "16px", border: "2px solid #3498db", borderRadius: "4px 0 0 4px", outline: "none" }}
            />
            <button 
                type="submit"
                style={{ padding: "10px 20px", fontSize: "16px", background: "#3498db", color: "white", border: "none", borderRadius: "0 4px 4px 0", cursor: "pointer" }}
            >
                Thêm
            </button>
        </form>
    );
}

export default TodoForm;