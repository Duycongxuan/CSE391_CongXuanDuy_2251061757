// ================= PHÂN TÍCH THÀNH PHẦN DOM =================
const taskListElement = document.getElementById('task-list');
const modalOverlay = document.getElementById('modal-overlay');
const taskForm = document.getElementById('task-form');
const modalTitle = document.getElementById('modal-title');

// Nút
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');

// Form Inputs
const inputId = document.getElementById('task-id');
const inputTitle = document.getElementById('task-title-input');
const inputDesc = document.getElementById('task-desc-input');
const inputDate = document.getElementById('task-date-input');
const inputPriority = document.getElementById('task-priority-input');

// Thống kê
const countTotal = document.getElementById('count-total');
const countDone = document.getElementById('count-done');
const countPending = document.getElementById('count-pending');

// Thông báo
const toastMsg = document.getElementById('toast-msg');

// ================= QUẢN LÝ DỮ LIỆU (LOCAL STORAGE) =================
const LOCAL_STORAGE_KEY = 'PERSONAL_TASKS';
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

// Lưu mảng vào LocalStorage
function saveTasksToStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}

// ================= CÁC LUỒNG XỬ LÝ (FLOWS) =================

// A. Cập nhật thống kê và Hiển thị danh sách (Render)
function renderTasks() {
    // Cập nhật thống kê
    const total = tasks.length;
    const done = tasks.filter(t => t.isCompleted).length;
    const pending = total - done;

    countTotal.innerText = total;
    countDone.innerText = done;
    countPending.innerText = pending;

    // Render giao diện
    taskListElement.innerHTML = '';

    if (tasks.length === 0) {
        taskListElement.innerHTML = '<div class="empty-state">Chưa có công việc nào. Hãy thêm mới!</div>';
        return;
    }

    // Render từng card công việc
    tasks.forEach(task => {
        let priorityClass = 'priority-tb';
        if (task.priority === 'Cao') priorityClass = 'priority-cao';
        if (task.priority === 'Thấp') priorityClass = 'priority-thap';

        const card = document.createElement('div');
        card.className = `task-card ${task.isCompleted ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div class="task-info">
                <div class="task-title">
                    ${task.title}
                    <span class="priority-badge ${priorityClass}">${task.priority}</span>
                </div>
                <div class="task-desc">${task.desc || 'Không có mô tả'}</div>
                <div class="task-date">📅 Hạn: ${formatDate(task.dueDate)}</div>
            </div>
            <div class="task-actions">
                <label class="checkbox-container">
                    <input type="checkbox" onchange="toggleComplete('${task.id}')" ${task.isCompleted ? 'checked' : ''}>
                    Xong
                </label>
                <button class="btn-edit" onclick="openEditModal('${task.id}')">Sửa</button>
                <button class="btn-delete" onclick="deleteTask('${task.id}')">Xóa</button>
            </div>
        `;
        taskListElement.appendChild(card);
    });
}

// Hàm format lại ngày hiển thị cho đẹp
function formatDate(dateString) {
    if (!dateString) return 'Không có';
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Hiển thị thông báo Toast
function showNotification(message) {
    toastMsg.innerText = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
        toastMsg.classList.remove('show');
    }, 2500);
}

// B. Mở & Đóng Form
function openModal() {
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
    taskForm.reset();
    inputId.value = ''; // Reset ID ẩn
    modalTitle.innerText = "Thêm công việc mới";
}

// C. Thêm hoặc Sửa Công Việc (Submit Form)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn load lại trang

    const newTask = {
        id: inputId.value || Date.now().toString(), // Nếu có ID là sửa, không có là tạo mới
        title: inputTitle.value.trim(),
        desc: inputDesc.value.trim(),
        dueDate: inputDate.value,
        priority: inputPriority.value,
        isCompleted: false
    };

    if (inputId.value) {
        // Chế độ: Sửa
        const index = tasks.findIndex(t => t.id === inputId.value);
        newTask.isCompleted = tasks[index].isCompleted; // Giữ nguyên trạng thái hoàn thành cũ
        tasks[index] = newTask;
        showNotification('Đã cập nhật công việc!');
    } else {
        // Chế độ: Thêm mới
        tasks.unshift(newTask); // Thêm lên đầu danh sách
        showNotification('Đã thêm công việc mới!');
    }

    saveTasksToStorage();
    renderTasks();
    closeModal();
});

// Mở form chế độ Sửa (đẩy dữ liệu cũ lên form)
window.openEditModal = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    modalTitle.innerText = "Sửa công việc";
    inputId.value = task.id;
    inputTitle.value = task.title;
    inputDesc.value = task.desc;
    inputDate.value = task.dueDate;
    inputPriority.value = task.priority;

    openModal();
};

// D. Xóa công việc
window.deleteTask = function(id) {
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa công việc này không?");
    if (isConfirm) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasksToStorage();
        renderTasks();
        showNotification('Đã xóa công việc!');
    }
};

// E. Đổi trạng thái hoàn thành
window.toggleComplete = function(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index].isCompleted = !tasks[index].isCompleted;
        saveTasksToStorage();
        renderTasks(); // Render lại giao diện và thống kê
    }
};

// ================= SỰ KIỆN LẮNG NGHE (EVENT LISTENERS) =================
btnOpenModal.addEventListener('click', () => {
    taskForm.reset();
    inputId.value = ''; // Đảm bảo ID trống khi thêm mới
    modalTitle.innerText = "Thêm công việc mới";
    openModal();
});

btnCloseModal.addEventListener('click', closeModal);

// Đóng popup khi click ra ngoài vùng xám (overlay)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// ================= KHỞI CHẠY LẦN ĐẦU =================
renderTasks();