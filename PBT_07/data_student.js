// file: student_data.js

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Biến lưu trữ cho các yêu cầu
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;
let totalMath = 0, totalPhysics = 0, totalCS = 0;
let sumMale = 0, countMale = 0;
let sumFemale = 0, countFemale = 0;

// 1 & 2: Tính điểm TB và Xếp loại cho mỗi sinh viên
for (let i = 0; i < students.length; i++) {
    // Tính trung bình (Làm tròn 1 chữ số thập phân để tránh lỗi Float của JS)
    let avg = (students[i].math * 0.4) + (students[i].physics * 0.3) + (students[i].cs * 0.3);
    students[i].avg = Math.round(avg * 10) / 10; 

    // Phân loại
    if (students[i].avg >= 8.0) {
        students[i].grade = "Giỏi";
        countGioi++;
    } else if (students[i].avg >= 6.5) {
        students[i].grade = "Khá";
        countKha++;
    } else if (students[i].avg >= 5.0) {
        students[i].grade = "Trung bình";
        countTB++;
    } else {
        students[i].grade = "Yếu";
        countYeu++;
    }

    // Cộng dồn điểm từng môn cho bước 6
    totalMath += students[i].math;
    totalPhysics += students[i].physics;
    totalCS += students[i].cs;

    // Phân loại giới tính cho bước 7
    if (students[i].gender === "M") {
        sumMale += students[i].avg;
        countMale++;
    } else {
        sumFemale += students[i].avg;
        countFemale++;
    }
}

// 3. In bảng kết quả
console.log("3. BẢNG KẾT QUẢ HỌC TẬP:");
console.log("| STT | Tên      | TB   | Xếp loại    |");
console.log("|-----|----------|------|-------------|");
for (let i = 0; i < students.length; i++) {
    // Dùng hàm padEnd() của String để căn chỉnh khoảng trắng cho bảng đẹp hơn
    let stt = String(i + 1).padEnd(3);
    let name = students[i].name.padEnd(8);
    // Hàm toFixed(1) đảm bảo luôn in ra 1 số sau dấu phẩy (vd: 8.0 thay vì 8)
    let avgStr = students[i].avg.toFixed(1).padEnd(4); 
    let grade = students[i].grade.padEnd(11);
    
    console.log(`| ${stt} | ${name} | ${avgStr} | ${grade} |`);
}
console.log("---------------------------------------");

// 4. Đếm số lượng sinh viên mỗi loại
console.log("\n4. THỐNG KÊ XẾP LOẠI:");
console.log(`- Giỏi: ${countGioi}`);
console.log(`- Khá: ${countKha}`);
console.log(`- Trung bình: ${countTB}`);
console.log(`- Yếu: ${countYeu}`);

// 5. Tìm sinh viên có điểm TB cao nhất và thấp nhất
let maxStudent = students[0];
let minStudent = students[0];

for (let i = 1; i < students.length; i++) {
    if (students[i].avg > maxStudent.avg) {
        maxStudent = students[i];
    }
    if (students[i].avg < minStudent.avg) {
        minStudent = students[i];
    }
}
console.log("\n5. SINH VIÊN XUẤT SẮC / YẾU KÉM NHẤT:");
console.log(`- Cao nhất: ${maxStudent.name} (${maxStudent.avg.toFixed(1)} điểm)`);
console.log(`- Thấp nhất: ${minStudent.name} (${minStudent.avg.toFixed(1)} điểm)`);

// 6. Tính điểm TB toàn lớp cho từng môn
let n = students.length;
console.log("\n6. ĐIỂM TRUNG BÌNH MÔN CỦA TOÀN LỚP:");
console.log(`- Toán: ${(totalMath / n).toFixed(2)}`);
console.log(`- Lý: ${(totalPhysics / n).toFixed(2)}`);
console.log(`- Tin: ${(totalCS / n).toFixed(2)}`);

// 7. Bonus: Tính điểm TB theo giới tính
console.log("\n7. THỐNG KÊ THEO GIỚI TÍNH:");
// Cần kiểm tra xem có sinh viên nào trong nhóm không để tránh chia cho 0
let avgMale = countMale > 0 ? (sumMale / countMale).toFixed(2) : 0;
let avgFemale = countFemale > 0 ? (sumFemale / countFemale).toFixed(2) : 0;

console.log(`- Nam (M): ${avgMale} điểm`);
console.log(`- Nữ (F): ${avgFemale} điểm`);