function startGame() {
    // 1. Máy random số từ 1 đến 100
    // Math.random() trả về từ 0 -> 0.999...
    // * 100 sẽ thành 0 -> 99.999...
    // Math.floor làm tròn xuống thành 0 -> 99
    // + 1 để dịch khoảng thành 1 -> 100
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    
    const maxAttempts = 7;
    let attempts = 0;
    
    // Mảng lưu trữ các số người dùng đã đoán để kiểm tra trùng lặp
    let guessedHistory = []; 

    alert("Chào mừng đến với Game Đoán Số!\nMáy đã nghĩ ra một số từ 1 đến 100. Bạn có 7 lượt đoán.");

    // Dùng vòng lặp while chạy cho đến khi hết lượt đoán
    while (attempts < maxAttempts) {
        let remaining = maxAttempts - attempts;
        
        // 2. Lấy input của user
        let input = prompt(`Lượt thứ ${attempts + 1} (Còn ${remaining} lượt).\nNhập con số bạn đoán (1-100):`);
        
        // Xử lý nếu người dùng bấm "Cancel" trên hộp thoại prompt
        if (input === null) {
            alert("Bạn đã thoát game!");
            return; // Kết thúc hàm luôn
        }

        // Ép kiểu chữ người dùng nhập thành số nguyên
        let guess = parseInt(input);

        // --- YÊU CẦU THÊM: VALIDATION ---
        
        // Validate 1: Kiểm tra xem có phải là số hợp lệ từ 1-100 không
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("⚠️ Lỗi: Chỉ chấp nhận số nguyên từ 1 đến 100. Vui lòng nhập lại!");
            continue; // Bỏ qua phần dưới, quay lại đầu vòng lặp (không tính lượt này)
        }

        // Validate 2: Kiểm tra số đã đoán chưa
        if (guessedHistory.includes(guess)) {
            alert(`⚠️ Bạn đã đoán số ${guess} này rồi! Hãy thử số khác.`);
            continue; // Không tính lượt này
        }

        // --------------------------------

        // Nếu input hợp lệ, thêm vào lịch sử và tăng số lượt đoán
        guessedHistory.push(guess);
        attempts++;

        // 3 & 4. Kiểm tra kết quả
        if (guess === targetNumber) {
            alert(`🎉 ĐÚNG RỒI! 🎉\nBạn đã đoán chính xác con số ${targetNumber} sau ${attempts} lần!`);
            return; // Thắng cuộc -> Kết thúc game
        } else if (guess < targetNumber) {
            alert(`Lớn hơn! (Số máy nghĩ > ${guess})`);
        } else if (guess > targetNumber) {
            alert(`Nhỏ hơn! (Số máy nghĩ < ${guess})`);
        }
    }

    // 5. Nếu vòng lặp kết thúc mà code không bị return (nghĩa là đã hết 7 lượt và không đoán trúng)
    alert(` GAME OVER!\nBạn đã hết ${maxAttempts} lượt đoán.\nCon số bí mật là: ${targetNumber}`);
}