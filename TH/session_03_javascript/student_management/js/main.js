// 1. LẤY DỮ LIỆU TỪ LOCAL STORAGE (Nếu không có thì khởi tạo mảng rỗng)
let students = JSON.parse(localStorage.getItem('studentData')) || [];

let isEditing = false;
let currentEditId = null;

// DOM Elements
const studentBody = document.getElementById('studentBody');
const modal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const notification = document.getElementById('notification');

// --- HÀM LƯU VÀO LOCAL STORAGE ---
function saveData() {
    localStorage.setItem('studentData', JSON.stringify(students));
}

// Hàm Xóa bỏ các cảnh báo lỗi trên form
function clearErrors() {
    const inputs = document.querySelectorAll('#studentForm input');
    const errors = document.querySelectorAll('.error-msg');
    inputs.forEach(input => input.classList.remove('input-error'));
    errors.forEach(error => error.textContent = '');
}

// Hàm Hiển thị lỗi cho từng input
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(`error-${inputId}`);
    input.classList.add('input-error');
    errorSpan.textContent = message;
}

// Hàm Kiểm tra dữ liệu (Validate Form)
function validateForm() {
    let isValid = true;
    clearErrors();

    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('className').value.trim();
    const gpa = document.getElementById('gpa').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!id) {
        showError('studentId', 'Vui lòng nhập mã sinh viên');
        isValid = false;
    } else if (!/SV*/.test(id)) {
        showError('studentId', 'Sai định dạng mã sinh viên');
        isValid = false;
    }

    if (!name) {
        showError('fullName', 'Vui lòng nhập họ và tên');
        isValid = false;
    } else if (name.length < 3) {
        showError('fullName', 'Họ tên phải có ít nhất 3 ký tự');
        isValid = false;
    }

    if (!dob) {
        showError('dob', 'Vui lòng chọn ngày sinh');
        isValid = false;
    } else {
        const today = new Date();
        const selectedDate = new Date(dob);
        if (selectedDate >= today) {
            showError('dob', 'Ngày sinh phải nhỏ hơn ngày hiện tại');
            isValid = false;
        }
    }

    if (!className) {
        showError('className', 'Vui lòng nhập tên lớp');
        isValid = false;
    }

    if (!gpa) {
        showError('gpa', 'Vui lòng nhập điểm trung bình');
        isValid = false;
    } else {
        const gpaNum = parseFloat(gpa);
        if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 10) {
            showError('gpa', 'Điểm trung bình phải từ 0 đến 10');
            isValid = false;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'Vui lòng nhập email');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Email không đúng định dạng');
        isValid = false;
    }

    return isValid;
}

// Mở Modal
document.getElementById('btn-toggle-add-student').addEventListener('click', () => {
    isEditing = false;
    currentEditId = null;
    modalTitle.textContent = "Thêm Sinh Viên Mới";
    studentForm.reset();
    clearErrors();
    document.getElementById('studentId').readOnly = false;
    modal.classList.add('active');
});

// Đóng Modal
document.getElementById('closeModal').addEventListener('click', closeModal);

function closeModal() {
    modal.classList.remove('active');
    studentForm.reset();
    clearErrors();
}

// Submit Form (Thêm / Sửa)
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('className').value.trim();
    const gpa = parseFloat(document.getElementById('gpa').value.trim());
    const email = document.getElementById('email').value.trim();

    if (!isEditing) {
        const isExist = students.some(sv => sv.id === id);
        if (isExist) {
            showError('studentId', 'Mã sinh viên này đã tồn tại!');
            return;
        }
        students.push({ id, name, dob, className, gpa, email });
        
        saveData(); // <-- GỌI LƯU DỮ LIỆU
        
        showNotification("Thêm sinh viên thành công!", "success");
    } else {
        const index = students.findIndex(sv => sv.id === currentEditId);
        if (index !== -1) {
            students[index] = { id: currentEditId, name, dob, className, gpa, email };
            
            saveData(); // <-- GỌI LƯU DỮ LIỆU
            
            showNotification("Cập nhật thông tin thành công!", "success");
        }
    }

    closeModal();
    renderTable();
});

// Cập nhật (Edit)
function editStudent(id) {
    const student = students.find(sv => sv.id === id);
    if (student) {
        isEditing = true;
        currentEditId = id;
        modalTitle.textContent = "Cập Nhật Thông Tin";
        
        clearErrors();

        document.getElementById('studentId').value = student.id;
        document.getElementById('studentId').readOnly = true;
        document.getElementById('fullName').value = student.name;
        document.getElementById('dob').value = student.dob;
        document.getElementById('className').value = student.className;
        document.getElementById('gpa').value = student.gpa;
        document.getElementById('email').value = student.email;

        modal.classList.add('active');
    }
}

// Xóa (Delete)
function deleteStudent(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên mã ${id}?`)) {
        students = students.filter(sv => sv.id !== id);
        
        saveData(); // <-- GỌI LƯU DỮ LIỆU SAU KHI XÓA
        
        showNotification("Đã xóa sinh viên!", "success");
        renderTable();
    }
}

// Thông báo
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification notif-${type}`;
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Hiển thị ra bảng
function renderTable() {
    studentBody.innerHTML = '';
    let totalGpa = 0;

    // KIỂM TRA NẾU CHƯA CÓ SINH VIÊN NÀO
    if (students.length === 0) {
        studentBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #777; padding: 20px;">
                    Chưa có dữ liệu sinh viên nào. Hãy thêm sinh viên mới!
                </td>
            </tr>
        `;
        
        document.getElementById('totalStudents').textContent = "0";
        document.getElementById('averageGPA').textContent = "0.00";
        return;
    }
    students.forEach((sv) => {
        totalGpa += sv.gpa;
        
        const dobArr = sv.dob.split('-');
        const formattedDob = `${dobArr[2]}/${dobArr[1]}/${dobArr[0]}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sv.id}</td>
            <td>${sv.name}</td>
            <td>${formattedDob}</td>
            <td>${sv.className}</td>
            <td>${sv.gpa.toFixed(1)}</td>
            <td>${sv.email}</td>
            <td class="action-btns">
                <button class="btn btn-warning" onclick="editStudent('${sv.id}')">Sửa</button>
                <button class="btn btn-danger" onclick="deleteStudent('${sv.id}')">Xóa</button>
            </td>
        `;
        studentBody.appendChild(tr);
    });

    // Cập nhật thống kê khi có dữ liệu
    const total = students.length;
    document.getElementById('totalStudents').textContent = total;
    
    const avg = (totalGpa / total).toFixed(2);
    document.getElementById('averageGPA').textContent = avg;
}

// Khởi chạy khi load trang
renderTable();