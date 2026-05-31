// ==========================================
// 1. DATA & STATE
// ==========================================
const images = Array.from({ length: 9 }, (_, i) => `https://picsum.photos/seed/${i + 1}/800/600`);
const commands = [
    { id: 'theme', name: 'Đổi giao diện (Dark/Light Mode)', action: () => document.body.classList.toggle('dark') },
    { id: 'img1', name: 'Mở ảnh số 1', action: () => openGallery(0) },
    { id: 'play', name: 'Bật Slideshow tự động', action: () => { if(!isModalOpen) openGallery(0); toggleSlideshow(true); } },
    { id: 'alert', name: 'Hiện thông báo chào mừng', action: () => alert('Xin chào! Command Palette hoạt động tốt.') },
];

let currentIndex = 0;
let isModalOpen = false;
let isSlideshowPlaying = false;
let slideshowInterval;
let isPaletteOpen = false;
let selectedCmdIndex = 0; // Dùng để navigate palette bằng phím mũi tên

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const galleryGrid = document.getElementById('galleryGrid');
const galleryModal = document.getElementById('galleryModal');
const mainImage = document.getElementById('mainImage');
const slideshowStatus = document.getElementById('slideshowStatus');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeGalleryBtn = document.getElementById('closeGallery');

const paletteModal = document.getElementById('commandPalette');
const paletteInput = document.getElementById('paletteInput');
const commandList = document.getElementById('commandList');

// ==========================================
// 3. CORE LOGIC: GALLERY
// ==========================================

// Render Grid Ảnh ban đầu
images.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.className = 'thumbnail-btn';
    btn.setAttribute('aria-label', `Mở ảnh số ${index + 1}`);
    // Phục hồi focus: Lưu lại element để trả focus về khi đóng modal
    btn.dataset.index = index; 
    
    const img = document.createElement('img');
    img.src = src.replace('800/600', '200/200'); // Thumbnail nhỏ
    img.alt = `Hình thu nhỏ ${index + 1}`;
    
    btn.appendChild(img);
    btn.addEventListener('click', () => openGallery(index));
    galleryGrid.appendChild(btn);
});

function openGallery(index) {
    currentIndex = index;
    updateImage();
    galleryModal.hidden = false;
    isModalOpen = true;
    closeGalleryBtn.focus(); // A11y: Chuyển focus vào nút đóng khi mở modal
}

function closeGallery() {
    galleryModal.hidden = true;
    isModalOpen = false;
    toggleSlideshow(false); // Tắt slideshow khi đóng
    // A11y: Trả focus về nút ảnh vừa click
    document.querySelector(`[data-index="${currentIndex}"]`)?.focus();
}

function updateImage() {
    mainImage.src = images[currentIndex];
    mainImage.alt = `Ảnh phóng to số ${currentIndex + 1}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

function toggleSlideshow(forcePlay = null) {
    isSlideshowPlaying = forcePlay !== null ? forcePlay : !isSlideshowPlaying;
    if (isSlideshowPlaying) {
        slideshowInterval = setInterval(nextImage, 2000);
        slideshowStatus.textContent = 'Trạng thái: Đang phát (Nhấn Space để Dừng)';
    } else {
        clearInterval(slideshowInterval);
        slideshowStatus.textContent = 'Trạng thái: Tạm dừng (Nhấn Space để Phát)';
    }
}

// Mouse Events cho Buttons
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
closeGalleryBtn.addEventListener('click', closeGallery);

// ==========================================
// 4. CORE LOGIC: COMMAND PALETTE
// ==========================================

function openPalette() {
    paletteModal.hidden = false;
    isPaletteOpen = true;
    paletteInput.value = '';
    renderCommands(commands); // Render toàn bộ lúc đầu
    paletteInput.focus(); // A11y: Focus ngay vào ô nhập
}

function closePalette() {
    paletteModal.hidden = true;
    isPaletteOpen = false;
}

function renderCommands(list) {
    commandList.innerHTML = '';
    selectedCmdIndex = 0; // Reset index chọn

    if (list.length === 0) {
        commandList.innerHTML = '<li class="cmd-item" aria-disabled="true">Không tìm thấy lệnh nào...</li>';
        return;
    }

    list.forEach((cmd, index) => {
        const li = document.createElement('li');
        li.className = `cmd-item ${index === 0 ? 'selected' : ''}`; // Mặc định chọn dòng đầu
        li.textContent = cmd.name;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        
        // Hover bằng chuột
        li.addEventListener('mouseenter', () => updatePaletteSelection(index, list));
        // Click chuột
        li.addEventListener('click', () => { executeCommand(cmd); });

        commandList.appendChild(li);
    });
}

function updatePaletteSelection(newIndex, currentList) {
    const items = commandList.querySelectorAll('.cmd-item');
    if (!items.length || items[0].hasAttribute('aria-disabled')) return;

    items[selectedCmdIndex].classList.remove('selected');
    items[selectedCmdIndex].setAttribute('aria-selected', 'false');

    selectedCmdIndex = newIndex;
    
    items[selectedCmdIndex].classList.add('selected');
    items[selectedCmdIndex].setAttribute('aria-selected', 'true');
    items[selectedCmdIndex].scrollIntoView({ block: 'nearest' });
}

function executeCommand(cmd) {
    closePalette();
    cmd.action(); // Chạy hàm action tương ứng
}

// Lọc Command khi Gõ phím
paletteInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(keyword));
    renderCommands(filtered);
});

// ==========================================
// 5. GLOBAL KEYBOARD SHORTCUTS & EVENT DISPATCHER
// ==========================================

document.addEventListener('keydown', (e) => {
    // 1. CTRL+K (Mở Command Palette)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // Chặn focus thanh địa chỉ trình duyệt mặc định
        isPaletteOpen ? closePalette() : openPalette();
        return;
    }

    // 2. ESCAPE (Đóng Modal hiện tại)
    if (e.key === 'Escape') {
        if (isPaletteOpen) closePalette();
        else if (isModalOpen) closeGallery();
        return;
    }

    // 3. ĐIỀU KHIỂN COMMAND PALETTE (Khi đang mở)
    if (isPaletteOpen) {
        const currentList = commands.filter(c => c.name.toLowerCase().includes(paletteInput.value.toLowerCase()));
        
        if (e.key === 'ArrowDown') {
            e.preventDefault(); // Ngăn con trỏ chuột nhảy trong input
            if (selectedCmdIndex < currentList.length - 1) updatePaletteSelection(selectedCmdIndex + 1, currentList);
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (selectedCmdIndex > 0) updatePaletteSelection(selectedCmdIndex - 1, currentList);
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentList.length > 0) executeCommand(currentList[selectedCmdIndex]);
        }
        return;
    }

    // 4. ĐIỀU KHIỂN GALLERY (Khi đang mở)
    if (isModalOpen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === ' ') { 
            e.preventDefault(); // Chặn cuộn trang
            toggleSlideshow(); 
        }
    }

    // 5. BẤM SỐ 1-9 (Luôn áp dụng để nhảy nhanh đến ảnh, kể cả mở/đóng)
    if (/^[1-9]$/.test(e.key)) {
        const index = parseInt(e.key) - 1;
        if (index < images.length) {
            if (!isModalOpen) openGallery(index);
            else {
                currentIndex = index;
                updateImage();
            }
        }
    }
});