// --- 1. DOM ELEMENTS ---
const form = document.getElementById('regForm');
const btnSubmit = document.getElementById('submitBtn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const phoneInput = document.getElementById('phone');

// --- 2. TRẠNG THÁI FORM (Để kiểm tra nút Submit) ---
const formValid = { name: false, email: false, password: false, confirm: false, phone: false };

// Hàm kiểm tra tổng thể để Enable/Disable nút Submit
function checkFormOverall() {
    // Nút submit chỉ bật khi TẤT CẢ các field đều true
    const isAllValid = Object.values(formValid).every(val => val === true);
    btnSubmit.disabled = !isAllValid;
}

// Hàm hỗ trợ UI đổi class valid/invalid
function setValid(input, isValid, errorElement = null) {
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        if (errorElement) errorElement.classList.remove('show');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        if (errorElement) errorElement.classList.add('show');
    }
}

// --- 3. XỬ LÝ VALIDATION REAL-TIME ---

// 1. Valid Tên (2-50 ký tự)
nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    const icon = document.getElementById('nameIcon');
    
    if (val.length >= 2 && val.length <= 50) {
        icon.textContent = '✅';
        formValid.name = true;
        setValid(nameInput, true);
    } else {
        icon.textContent = val.length > 0 ? '❌' : '';
        formValid.name = false;
        setValid(nameInput, false);
    }
    checkFormOverall();
});

// 2. Valid Email (Regex)
emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(val);
    
    formValid.email = isValid;
    setValid(emailInput, isValid, document.getElementById('emailError'));
    checkFormOverall();
});

// 3. Valid Mật khẩu (Strength Meter)
passInput.addEventListener('input', (e) => {
    const val = e.target.value;
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    
    let strength = 0;
    
    // Điều kiện đánh giá
    const hasLetters = /[a-zA-Z]/.test(val);
    const hasNumbers = /[0-9]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    if (val.length === 0) {
        bar.style.width = '0%';
        text.textContent = 'Độ mạnh: Chưa nhập';
        formValid.password = false;
    } 
    else if (val.length < 8) {
        bar.style.width = '30%';
        bar.style.backgroundColor = '#dc3545'; // Đỏ (Yếu)
        text.textContent = 'Độ mạnh: Yếu (Cần ít nhất 8 ký tự)';
        formValid.password = false; // Yếu thì không cho submit
    } 
    else if (val.length >= 8 && hasUpper && hasLower && hasNumbers && hasSpecial) {
        bar.style.width = '100%';
        bar.style.backgroundColor = '#28a745'; // Xanh lá (Mạnh)
        text.textContent = 'Độ mạnh: Mạnh';
        formValid.password = true;
    } 
    else if (val.length >= 8 && hasLetters && hasNumbers) {
        bar.style.width = '65%';
        bar.style.backgroundColor = '#ffc107'; // Vàng (Trung bình)
        text.textContent = 'Độ mạnh: Trung bình';
        formValid.password = true; // Trung bình vẫn được coi là hợp lệ
    } else {
        // Trường hợp >= 8 ký tự nhưng chỉ có mỗi số hoặc mỗi chữ
        bar.style.width = '40%';
        bar.style.backgroundColor = '#fd7e14'; // Cam
        text.textContent = 'Độ mạnh: Yếu (Cần thêm chữ và số)';
        formValid.password = false;
    }

    setValid(passInput, formValid.password);

    // Kích hoạt lại kiểm tra "Confirm password" vì pass gốc đã đổi
    if (confirmInput.value.length > 0) {
        confirmInput.dispatchEvent(new Event('input'));
    }
    checkFormOverall();
});

// 4. Valid Confirm Password (Khớp)
confirmInput.addEventListener('input', (e) => {
    const val = e.target.value;
    const isValid = val === passInput.value && val.length > 0;
    
    formValid.confirm = isValid;
    setValid(confirmInput, isValid, document.getElementById('confirmError'));
    checkFormOverall();
});

// 5. Valid Số điện thoại & Tự động format gạch ngang
phoneInput.addEventListener('input', (e) => {
    // Chỉ lấy các ký tự là số, giới hạn tối đa 10 số
    let cleanVal = e.target.value.replace(/\D/g, '').substring(0, 10);
    
    // Logic tự động chèn dấu gạch (xxxx-xxx-xxx)
    let formatted = cleanVal;
    if (cleanVal.length > 7) {
        formatted = `${cleanVal.substring(0,4)}-${cleanVal.substring(4,7)}-${cleanVal.substring(7,10)}`;
    } else if (cleanVal.length > 4) {
        formatted = `${cleanVal.substring(0,4)}-${cleanVal.substring(4,7)}`;
    }
    
    // Gán lại giá trị đã format cho input
    e.target.value = formatted;
    
    // Kiểm tra hợp lệ (đủ 10 số gốc)
    const isValid = cleanVal.length === 10;
    formValid.phone = isValid;
    setValid(phoneInput, isValid, document.getElementById('phoneError'));
    checkFormOverall();
});

// --- 4. XỬ LÝ SUBMIT & MODAL ---
const modal = document.getElementById('modal');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Chặn tải lại trang

    // Hiển thị thông tin lên Modal
    const modalData = document.getElementById('modalData');
    modalData.innerHTML = `
        <strong>Tên:</strong> ${nameInput.value}<br>
        <strong>Email:</strong> ${emailInput.value}<br>
        <strong>Phone:</strong> ${phoneInput.value}
    `;
    
    modal.style.display = 'flex'; // Mở modal
});

// Đóng modal
document.getElementById('closeModal').addEventListener('click', () => {
    modal.style.display = 'none';
    form.reset(); // Xóa trắng form sau khi đk thành công
    
    // Reset lại UI
    Object.keys(formValid).forEach(key => formValid[key] = false);
    document.querySelectorAll('input').forEach(input => input.classList.remove('valid'));
    document.getElementById('nameIcon').textContent = '';
    document.getElementById('strengthBar').style.width = '0%';
    document.getElementById('strengthText').textContent = 'Độ mạnh: Chưa nhập';
    btnSubmit.disabled = true;
});