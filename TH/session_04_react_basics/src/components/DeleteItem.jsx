import { useState, useRef } from "react";

function DeleteItem() {
    // 1. State quản lý danh sách
    const [items, setItems] = useState([
        { id: 1, name: "Nguyễn Văn Minh" },
        { id: 2, name: "Trần Thị An" },
        { id: 3, name: "Lê Thùy Linh" }
    ]);
    
    // 2. State quản lý thông tin phần tử vừa bị xóa (để làm chức năng Hoàn tác)
    // Lưu cả item và vị trí (index) để khi hoàn tác nó quay về đúng chỗ cũ
    const [deletedInfo, setDeletedInfo] = useState(null); 
    
    // useRef dùng để lưu lại ID của bộ đếm thời gian (timer), giúp ta hủy nó khi cần
    const timerRef = useRef(null);

    // ==========================================
    // HÀM XỬ LÝ XÓA & HOÀN TÁC
    // ==========================================
    
    function handleDelete(itemToDelete, index) {
        // THỬ THÁCH 3: Xác nhận trước khi xóa
        const isConfirm = window.confirm(`Bạn có chắc chắn muốn xóa "${itemToDelete.name}" không?`);
        if (!isConfirm) return; // Nếu chọn Cancel thì dừng hàm luôn

        // Thực hiện xóa (Lọc ra những người có ID KHÁC với ID bị xóa)
        setItems(items.filter(item => item.id !== itemToDelete.id));

        // Chuẩn bị cho THỬ THÁCH 1 & 2 (Hoàn tác)
        // 1. Lưu lại thông tin người vừa xóa
        setDeletedInfo({ item: itemToDelete, index: index });

        // 2. Xóa bộ đếm cũ (nếu người dùng bấm xóa liên tục nhiều người)
        if (timerRef.current) clearTimeout(timerRef.current);

        // 3. Đặt bộ đếm mới: Sau đúng 5000ms (5 giây) thì ẩn thông báo đi
        timerRef.current = setTimeout(() => {
            setDeletedInfo(null);
        }, 5000);
    }

    function handleUndo() {
        if (!deletedInfo) return;

        // Kỹ thuật chèn phần tử về đúng vị trí cũ trong mảng
        const newItems = [...items]; 
        newItems.splice(deletedInfo.index, 0, deletedInfo.item); 
        
        setItems(newItems);       // Cập nhật lại danh sách
        setDeletedInfo(null);     // Ẩn thông báo "Đã xóa"
        clearTimeout(timerRef.current); // Dừng bộ đếm thời gian 5 giây lại
    }

    // ==========================================
    // GIAO DIỆN (RENDER)
    // ==========================================
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Quản lý Sinh viên 🧑‍🎓</h2>
            
            {/* THỬ THÁCH 1 & 2: Hiển thị thông báo "Đã xóa" và nút "Hoàn tác" */}
            {deletedInfo && (
                <div style={{ 
                    background: "#333", color: "white", padding: "10px 15px", 
                    borderRadius: "4px", marginBottom: "15px",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                    <span>Đã xóa <strong>{deletedInfo.item.name}</strong></span>
                    <button 
                        onClick={handleUndo}
                        style={{ background: "#f39c12", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer", fontWeight: "bold" }}
                    >
                        ↩ Hoàn tác
                    </button>
                </div>
            )}

            <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                {items.length === 0 ? (
                    <p style={{ padding: "20px", textAlign: "center", color: "#999", margin: 0 }}>
                        Danh sách trống
                    </p>
                ) : (
                    items.map((item, index) => (
                        <div key={item.id} style={{ 
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "12px 15px", borderBottom: "1px solid #eee", background: "#fff"
                        }}>
                            <span>{index + 1}. {item.name}</span>
                            <button 
                                // Truyền cả item và index vào hàm để chuẩn bị cho việc Undo
                                onClick={() => handleDelete(item, index)}
                                style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                            >
                                🗑 Xóa
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DeleteItem;