import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
    if (todos.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "40px", color: "#999", fontStyle: "italic", minHeight: "150px" }}>
                Chưa có hoặc không tìm thấy công việc nào! 📝
            </div>
        );
    }

    return (
        <div style={{ minHeight: "150px" }}>
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggle={onToggle} 
                    onDelete={onDelete} 
                    onEdit={onEdit} 
                />
            ))}
        </div>
    );
}

export default TodoList;