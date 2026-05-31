// --- 1. DOM Elements ---
const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const todoCount = document.querySelector('#todoCount');
const filters = document.querySelector('#filters');
const clearCompletedBtn = document.querySelector('#clearCompleted');

// --- 2. State Management ---
// Lấy data từ LocalStorage hoặc khởi tạo mảng rỗng
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// --- 3. Core Functions ---
// Lưu vào LocalStorage
const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos));

// Render danh sách Todo (Chỉ dùng createElement)
function render() {
    todoList.innerHTML = ''; // Clear danh sách cũ
    
    // Filter data
    let filteredTodos = todos;
    if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        // Tạo thẻ li
        const li = document.createElement('li');
        li.dataset.id = todo.id; // Gắn ID để dùng cho Event Delegation
        if (todo.completed) li.classList.add('completed');

        // Tạo Text
        const span = document.createElement('span');
        span.textContent = todo.text;
        span.className = 'todo-text';

        // Tạo Input để Edit (mặc định ẩn)
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = todo.text;
        editInput.className = 'edit-input';

        // Tạo nút Xóa
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';

        // Gắn vào DOM
        li.append(span, editInput, deleteBtn);
        todoList.appendChild(li);
    });

    // Cập nhật Count
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    
    saveTodos();
}

// --- 4. Event Listeners ---

// ADD: Thêm Todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({ id: Date.now(), text, completed: false });
    input.value = '';
    render();
});

// EVENT DELEGATION cho TodoList (Toggle, Delete, Edit)
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);

    // DELETE: Bấm nút Xóa
    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        render();
    }
    // TOGGLE: Bấm vào Text
    else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        render();
    }
});

// EDIT (Bắt đầu): Double-click vào Text
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('li');
        li.classList.add('editing');
        const editInput = li.querySelector('.edit-input');
        editInput.focus();
        // Đặt con trỏ về cuối đoạn text
        editInput.selectionStart = editInput.selectionEnd = editInput.value.length;
    }
});

// EDIT (Lưu lại): Gõ Enter khi đang sửa
todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
        const li = e.target.closest('li');
        const id = Number(li.dataset.id);
        const newText = e.target.value.trim();

        if (newText) {
            const todo = todos.find(t => t.id === id);
            todo.text = newText;
        } else {
            // Nếu xóa trắng text, thì xóa luôn todo
            todos = todos.filter(t => t.id !== id); 
        }
        li.classList.remove('editing');
        render();
    }
    // Hủy Edit nếu bấm Escape
    if (e.target.classList.contains('edit-input') && e.key === 'Escape') {
        render();
    }
});

// FILTER: Chuyển đổi bộ lọc
filters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        // Xử lý UI class 'active'
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Cập nhật logic filter
        currentFilter = e.target.dataset.filter;
        render();
    }
});

// CLEAR COMPLETED: Xóa các task đã xong
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    render();
});

// --- 5. Initial Render ---
render();