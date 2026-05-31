const gallery = document.getElementById('gallery');
const loadTrigger = document.getElementById('load-trigger');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxLoading = document.getElementById('lightbox-loading');
const closeBtn = document.querySelector('.close-btn');

// State
let currentPage = 1;
const limit = 20;
let isLoading = false;

// ==========================================
// 1. OBSERVER CHO LAZY LOADING ẢNH
// ==========================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Nếu khung ảnh lọt vào màn hình viewport
        if (entry.isIntersecting) {
            const img = entry.target;
            // Thay src thực tế từ data-src
            img.src = img.dataset.src;
            
            // Khi ảnh tải xong, thêm class để chạy CSS Fade-in
            img.onload = () => img.classList.add('loaded');
            
            // Tải xong thì ngừng theo dõi thẻ img này
            observer.unobserve(img);
        }
    });
}, { rootMargin: "50px 0px" }); // Bắt đầu load trước khi cuộn tới 50px

// ==========================================
// 2. FETCH API VÀ RENDER
// ==========================================
async function loadMorePhotos() {
    if (isLoading) return; // Tránh gọi API liên tục khi đang tải
    isLoading = true;
    loadTrigger.classList.add('active'); // Hiện "đang tải thêm..."

    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        const photos = await response.json();

        photos.forEach(photo => {
            // Tạo container
            const item = document.createElement('div');
            item.className = 'photo-item';
            
            // Tạo ảnh (chưa gắn src ngay)
            const img = document.createElement('img');
            // Dùng API resize của Picsum để lấy ảnh thumbnail (vd 400x400) cho nhẹ
            img.dataset.src = `https://picsum.photos/id/${photo.id}/400/400`; 
            img.alt = `Photo by ${photo.author}`;
            
            // Lưu id ảnh để lấy ảnh gốc chất lượng cao cho Lightbox
            img.dataset.full = `https://picsum.photos/id/${photo.id}/1200/800`;

            item.appendChild(img);
            gallery.appendChild(item);

            // Bắt đầu theo dõi ảnh này cho Lazy Loading
            imageObserver.observe(img);
        });

        currentPage++; // Tăng trang cho lần cuộn tiếp theo
    } catch (error) {
        console.error("Lỗi fetch data:", error);
    } finally {
        isLoading = false;
        loadTrigger.classList.remove('active'); // Tắt loading
    }
}

// ==========================================
// 3. OBSERVER CHO INFINITE SCROLL
// ==========================================
const scrollObserver = new IntersectionObserver((entries) => {
    // Nếu thẻ trigger (dưới cùng) xuất hiện trên màn hình
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, { rootMargin: "100px" }); // Kích hoạt sớm khi còn cách đáy 100px

// Bắt đầu theo dõi thẻ dưới cùng trang
scrollObserver.observe(loadTrigger);

// ==========================================
// 4. LIGHTBOX LOGIC (Event Delegation)
// ==========================================
gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        lightbox.classList.remove('hidden');
        lightboxImg.style.display = 'none';
        lightboxLoading.style.display = 'block'; // Bật spinner lightbox
        
        // Gắn link ảnh chất lượng cao vào modal
        lightboxImg.src = e.target.dataset.full;
        
        lightboxImg.onload = () => {
            lightboxLoading.style.display = 'none'; // Tắt spinner
            lightboxImg.style.display = 'block'; // Hiện ảnh
        };
    }
});

// Đóng lightbox
const closeLightbox = () => lightbox.classList.add('hidden');
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    // Chỉ đóng nếu click vào nền đen, không đóng nếu click vào ảnh
    if (e.target === lightbox) closeLightbox();
});
// Hỗ trợ phím ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
});