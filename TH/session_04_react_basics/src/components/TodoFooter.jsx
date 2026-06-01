function TodoFooter({ total, active }) {
    if (total === 0) return null; // Không hiện Footer nếu chưa có việc nào

    return (
        <div style={{ 
            display: "flex", justifyContent: "space-between", marginTop: "15px", 
            padding: "12px", background: "#f8f9fa", borderRadius: "4px", 
            fontSize: "14px", fontWeight: "bold", color: "#555" 
        }}>
            <span>Còn {active} việc cần làm</span>
            <span>Tổng: {total} việc</span>
        </div>
    );
}

export default TodoFooter;