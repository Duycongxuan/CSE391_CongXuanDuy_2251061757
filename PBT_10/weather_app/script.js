// Các DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const historyList = document.getElementById('historyList');

// Các khung UI cho 3 trạng thái
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const weatherState = document.getElementById('weatherState');

//  Quản lý 3 States (Loading / Success / Error)
function showState(state) {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    weatherState.classList.add('hidden');

    if (state === 'loading') loadingState.classList.remove('hidden');
    if (state === 'error') errorState.classList.remove('hidden');
    if (state === 'success') weatherState.classList.remove('hidden');
}

//  Gọi API fetch thành công + parse JSON
async function fetchWeather(city) {
    if (!city.trim()) return;

    showState('loading'); // Chuyển sang trạng thái Loading

    try {
        // wttr.in trả về format JSON
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) {
            throw new Error('Lỗi mạng hoặc server!');
        }

        const data = await response.json(); // Thử parse JSON
        
        // Lấy dữ liệu cần thiết từ JSON của wttr.in
        const current = data.current_condition[0];
        const temp = current.temp_C;
        const humidity = current.humidity;
        const desc = current.weatherDesc[0].value;

        // Cập nhật UI
        document.getElementById('cityName').textContent = city.toUpperCase();
        document.getElementById('temperature').textContent = `${temp}°C`;
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('description').textContent = desc;
        
        // Render icon đơn giản dựa trên mô tả
        const iconEl = document.getElementById('weatherIcon');
        if (desc.toLowerCase().includes('rain')) iconEl.textContent = '🌧️';
        else if (desc.toLowerCase().includes('cloud')) iconEl.textContent = '☁️';
        else if (desc.toLowerCase().includes('clear') || desc.toLowerCase().includes('sun')) iconEl.textContent = '☀️';
        else iconEl.textContent = '🌤️';

        showState('success'); // Chuyển sang Success
        saveToHistory(city);  // Lưu lịch sử nếu thành công

    } catch (error) {
        console.error("Lỗi:", error);
        // Bắt lỗi JSON parse error khi wttr.in trả về HTML (do sai tên thành phố)
        document.getElementById('errorMsg').textContent = `Không thể lấy dữ liệu cho "${city}". Vui lòng kiểm tra lại!`;
        showState('error'); // Chuyển sang Error
    }
}

//Lịch sử + LocalStorage (5 thành phố)
function getHistory() {
    return JSON.parse(localStorage.getItem('weatherHistory')) || [];
}

function saveToHistory(city) {
    let history = getHistory();
    // Xóa tên thành phố nếu đã tồn tại để đẩy lên đầu
    history = history.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    history.unshift(city); // Thêm vào đầu
    
    if (history.length > 5) {
        history.pop(); // Giữ tối đa 5 thành phố
    }
    
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = getHistory();
    historyList.innerHTML = ''; // Xóa cũ
    
    history.forEach(city => {
        const span = document.createElement('span');
        span.className = 'history-item';
        span.textContent = city;
        // Click vào lịch sử -> tìm lại
        span.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyList.appendChild(span);
    });
}

// Lắng nghe sự kiện click nút tìm kiếm
searchBtn.addEventListener('click', () => {
    fetchWeather(cityInput.value);
});

// Hỗ trợ ấn Enter để tìm
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather(cityInput.value);
    }
});

// Khởi chạy: Load lịch sử khi vừa mở web
renderHistory();