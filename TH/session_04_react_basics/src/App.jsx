import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

function App() {
    // 1. Quản lý Data
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("my_todos");
        return saved ? JSON.parse(saved) : [];
    });
    const [filter, setFilter] = useState("all");

    // 2. Lưu Data tự động
    useEffect(() => {
        localStorage.setItem("my_todos", JSON.stringify(todos));
    }, [todos]);

    // 3. Các hàm xử lý nghiệp vụ (CRUD)
    const handleAddTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            done: false,
            createdAt: new Date().toLocaleTimeString("vi-VN")
        };
        setTodos([newTodo, ...todos]); // Thêm lên đầu danh sách
    };

    const handleToggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    const handleDelete = (id) => setTodos(todos.filter(t => t.id !== id));
    const handleEdit = (id, newText) => setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));

    // 4. Các biến tính toán (Computed Values)
    const filteredTodos = todos.filter(t => {
        if (filter === "active") return !t.done;
        if (filter === "completed") return t.done;
        return true;
    });
    const activeCount = todos.filter(t => !t.done).length;

    // 5. RENDER GIAO DIỆN CHÍNH
    return (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", fontFamily: "Arial", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📋 Todo List PRO</h1>
            
            {/* Lắp ráp các mảnh Lego */}
            <TodoForm onAdd={handleAddTodo} />
            
            <TodoFilter filter={filter} onFilterChange={setFilter} />
            
            <TodoList 
                todos={filteredTodos} 
                onToggle={handleToggle} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
            />
            
            <TodoFooter total={todos.length} active={activeCount} />
        </div>
    );
}

export default App;