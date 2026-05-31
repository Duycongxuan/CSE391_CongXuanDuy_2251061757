// ==========================================
// 1. API LAYER: Chỉ xử lý fetch data
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com/users",

    async request(url, options = {}) {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return await response.json();
    },

    getUsers: () => api.request(api.baseURL),
    getUser: (id) => api.request(`${api.baseURL}/${id}`),
    
    createUser: (data) => api.request(api.baseURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }),

    updateUser: (id, data) => api.request(`${api.baseURL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }),

    deleteUser: (id) => api.request(`${api.baseURL}/${id}`, {
        method: "DELETE"
    })
};

// ==========================================
// 2. UI LAYER: Chỉ xử lý DOM & Giao diện
// ==========================================
const ui = {
    grid: document.getElementById('userGrid'),
    toastBox: document.getElementById('toastContainer'),
    formTitle: document.getElementById('formTitle'),
    submitBtn: document.getElementById('submitBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    form: document.getElementById('userForm'),

    // Loading State
    showLoading() {
        this.grid.innerHTML = Array(6).fill(`
            <div class="skeleton">
                <div class="skel-line title"></div>
                <div class="skel-line short"></div>
                <div class="skel-line"></div>
                <div class="skel-line short"></div>
            </div>
        `).join('');
    },

    // Render danh sách cards
    renderUsers(users) {
        if (users.length === 0) {
            this.grid.innerHTML = '<p>Không tìm thấy người dùng nào.</p>';
            return;
        }

        this.grid.innerHTML = users.map(user => `
            <div class="user-card" data-id="${user.id}">
                <h3>${user.name}</h3>
                <p>📧 ${user.email}</p>
                <p>🏢 ${user.company?.name || 'N/A'}</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="app.editMode(${user.id})">Edit</button>
                    <button class="btn-delete" onclick="app.deleteData(${user.id})">Delete</button>
                </div>
            </div>
        `).join('');
    },

    // Toast Notifications
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${message}</span>`;
        
        this.toastBox.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    // Quản lý trạng thái form (Thêm <-> Sửa)
    setFormMode(isEdit, user = null) {
        if (isEdit && user) {
            this.formTitle.textContent = "Cập nhật User";
            this.submitBtn.textContent = "Lưu thay đổi";
            this.cancelBtn.classList.remove('hidden');
            
            document.getElementById('userId').value = user.id;
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('company').value = user.company?.name || '';
        } else {
            this.formTitle.textContent = "Thêm User Mới";
            this.submitBtn.textContent = "Tạo mới";
            this.cancelBtn.classList.add('hidden');
            this.form.reset();
            document.getElementById('userId').value = "";
        }
    }
};

// ==========================================
// 3. APP LOGIC: Gắn kết API, UI và Client State
// ==========================================
const app = {
    usersData: [], // Client-side state

    async init() {
        ui.showLoading();
        try {
            this.usersData = await api.getUsers();
            ui.renderUsers(this.usersData);
        } catch (error) {
            ui.showToast("Lỗi khi tải dữ liệu: " + error.message, "error");
            ui.grid.innerHTML = '<p>Không thể kết nối đến server.</p>';
        }
        this.setupEventListeners();
    },

    // Xử lý tạo hoặc cập nhật (Submit Form)
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const id = document.getElementById('userId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const companyName = document.getElementById('company').value;

        const userData = { name, email, company: { name: companyName } };

        try {
            if (id) {
                // UPDATE (PUT)
                const updatedUser = await api.updateUser(id, userData);
                // Cập nhật state (Client-side)
                this.usersData = this.usersData.map(u => u.id == id ? { ...u, ...updatedUser } : u);
                ui.showToast("Cập nhật thành công!");
                ui.setFormMode(false); // Trả về form thêm mới
            } else {
                // CREATE (POST)
                const newUser = await api.createUser(userData);
                // Lưu ý: JSONPlaceholder luôn trả id=11. Để UI ko bị lỗi trùng id khi xóa/sửa, tạo id fake:
                newUser.id = Date.now(); 
                
                this.usersData.unshift(newUser); // Đẩy lên đầu danh sách
                ui.showToast("Tạo user thành công!");
                ui.form.reset();
            }
            
            this.filterData(); // Render lại UI dựa trên state
            
        } catch (error) {
            ui.showToast("Lỗi thao tác: " + error.message, "error");
        }
    },

    // Chuyển sang chế độ Edit
    editMode(id) {
        const user = this.usersData.find(u => u.id === id);
        if (user) {
            ui.setFormMode(true, user);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    // Xóa (DELETE)
    async deleteData(id) {
        if (!confirm("Bạn có chắc chắn muốn xóa user này?")) return;

        try {
            await api.deleteUser(id);
            // Xóa khỏi state (Client-side)
            this.usersData = this.usersData.filter(u => u.id !== id);
            this.filterData();
            ui.showToast("Xóa thành công!");
        } catch (error) {
            ui.showToast("Lỗi khi xóa: " + error.message, "error");
        }
    },

    // Tìm kiếm (Client-side Search)
    filterData() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filtered = this.usersData.filter(u => 
            u.name.toLowerCase().includes(query) || 
            u.email.toLowerCase().includes(query)
        );
        ui.renderUsers(filtered);
    },

    // Đăng ký các sự kiện
    setupEventListeners() {
        ui.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        ui.cancelBtn.addEventListener('click', () => ui.setFormMode(false));
        
        // Bắt sự kiện gõ phím để search realtime
        document.getElementById('searchInput').addEventListener('input', () => this.filterData());
    }
};

// Khởi chạy ứng dụng
app.init();