# PHIẾU BÀI TẬP 02

## HTML5 Forms & Media — Biểu mẫu, Validation & Đa phương tiện

---

### Phần A — Kiểm tra đọc hiểu

#### Câu 1: Input Types (10 input types trong HTML5)

| STT | Type       | Giao diện hiển thị                              | Validation tự   động                                                   | Use case trong E-Commerce                               |
| --- | ---------- | ----------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | `email`    | Ô nhập text thông thường                        | Kiểm tra định dạng email (phải có `@` và domain hợp lệ)              | Form đăng ký tài khoản, nhận thông báo khuyến mãi       |
| 2   | `password` | Ô nhập text, ký tự hiển thị dạng dấu chấm / sao | Không validation mặc định (thường kết hợp `minlength`, `pattern`)    | Form đăng nhập, đăng ký tài khoản                       |
| 3   | `tel`      | Ô nhập text thông thường                        | Không validation mặc định (thường kết hợp `pattern` để kiểm tra SĐT) | Form nhập số điện thoại giao hàng, liên hệ              |
| 4   | `number`   | Ô nhập có nút tăng/giảm giá trị (spinner)       | Kiểm tra là số, có thể kết hợp `min`, `max`, `step`                  | Nhập số lượng sản phẩm, nhập mã giảm giá số             |
| 5   | `date`     | Date picker hiển thị lịch                       | Kiểm tra định dạng ngày hợp lệ (YYYY-MM-DD)                          | Chọn ngày giao hàng, ngày sinh nhật nhận ưu đãi         |
| 6   | `search`   | Ô nhập text có nút xóa (clear button) bên phải  | Không validation mặc định                                            | Thanh tìm kiếm sản phẩm trên website                    |
| 7   | `url`      | Ô nhập text thông thường                        | Kiểm tra định dạng URL hợp lệ (có `http://` hoặc `https://`)         | Nhập link website cửa hàng, link sản phẩm tham khảo     |
| 8   | `color`    | Color picker hiển thị bảng chọn màu             | Kiểm tra giá trị màu hợp lệ (hex color)                              | Chọn màu sắc sản phẩm (quần áo, giày dép, điện thoại)   |
| 9   | `range`    | Thanh trượt (slider) chọn giá trị trong khoảng  | Giá trị nằm trong khoảng `min` - `max`                               | Lọc sản phẩm theo khoảng giá (0đ - 50 triệu)            |
| 10  | `file`     | Nút chọn file từ máy tính                       | Kiểm tra định dạng file nếu có `accept`                              | Upload ảnh đánh giá sản phẩm, upload hóa đơn thanh toán |

---

#### Câu 2: Validation Attributes

**Dự đoán kết quả khi bấm Submit:**

| Trường hợp | Code                                                     | Dự đoán                                                                                 | Giải thích                                                                                                  |
| ---------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1          | `<input type="text" required value="">`                  | **Form không submit**, hiển thị lỗi "Please fill out this field"                        | Thuộc tính `required` bắt buộc trường này phải có giá trị.                                                  |
| 2          | `<input type="email" value="abc">`                       | **Form không submit**, hiển thị lỗi "Please include an '@' in the email address"        | `type="email"` tự động kiểm tra định dạng email.                                                            |
| 3          | `<input type="number" min="1" max="10" value="15">`      | **Form không submit**, hiển thị lỗi "Value must be less than or equal to 10"            | `type="number"` kết hợp `max="10"`, giá trị `15` vượt quá giới hạn trên nên validation fail.                |
| 4          | `<input type="text" pattern="[0-9]{10}" value="abc123">` | **Form không submit**, hiển thị lỗi "Please match the requested format"                 | `pattern="[0-9]{10}"` yêu cầu chuỗi gồm đúng 10 chữ số. `"abc123"` chỉ có 6 ký tự và chứa chữ cái nên fail. |
| 5          | `<input type="password" minlength="8" value="123">`      | **Form không submit**, hiển thị lỗi "Please lengthen this text to 8 characters or more" | `minlength="8"` yêu cầu mật khẩu tối thiểu 8 ký tự.                                           .             |

**So sánh dự đoán với thực tế (validation_test.html):**

- Kết quả thực tế khớp hoàn toàn với dự đoán.

---

#### Câu 3: Accessibility

**1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?**

- `<label>` tạo liên kết văn bản với input thông qua thuộc tính `for` (trùng với `id` của input).

- Khi người khiếm thị dùng screen reader focus vào input, máy sẽ đọc nội dung của `<label>` để họ biết ô nhập này dùng để làm gì.

- Ngoài ra, click vào `<label>` cũng focus vào input.

**2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.**

- Dùng khi cần **nhóm nhiều input liên quan** thành một nhóm có ý nghĩa, giúp screen reader thông báo ngữ cảnh cho người dùng.

- **Ví dụ cụ thể:** Form thanh toán với nhiều phương thức thanh toán:

```html
<fieldset>
  <legend>Phương thức thanh toán</legend>
  <input type="radio" name="payment" id="cod" value="cod" />
  <label for="cod">Thanh toán khi nhận hàng (COD)</label><br />
  <input type="radio" name="payment" id="card" value="card" />
  <label for="card">Thẻ tín dụng / Ghi nợ</label><br />
  <input type="radio" name="payment" id="momo" value="momo" />
  <label for="momo">Ví điện tử MoMo</label>
</fieldset>
```

Screen reader sẽ đọc: _"Phương thức thanh toán, group. Thanh toán khi nhận hàng, radio button..."_ — giúp người dùng hiểu các option này thuộc về cùng một nhóm lựa chọn.

**3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng khi đã có `<label>`?**

- **`aria-label` dùng khi nào:**

  - Khi cần mô tả một phần tử tương tác nhưng **không có văn bản hiển thị trực quan** trên màn hình.

```html
<button aria-label="Đóng cửa sổ">&times;</button>
```

- **Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`:**

  - `<label>` là **native HTML**, được tất cả trình duyệt và screen reader hỗ trợ tốt nhất.

  - `aria-label` là **ARIA attribute** (bổ sung), có thể không được hỗ trợ đầy đủ trên một số screen reader cũ hoặc trình duyệt cũ.

  - Nếu dùng cả hai, screen reader có thể đọc lặp lại hoặc ưu tiên `aria-label` mà bỏ qua `<label>`, gây nhầm lẫn.

  - Quy tắc vàng: **Ưu tiên native HTML trước ARIA**. Chỉ dùng ARIA khi native không đáp ứng được.

---

#### Câu 4: Media

**1. Thuộc tính `loading="lazy"` trên `<img>`**

- **Hoạt động:** Hình ảnh chỉ được tải khi người dùng cuộn (scroll) đến gần vị trí của nó trên màn hình hiển thị, thay vì tải ngay từ đầu.

- **Cải thiện:**

  - Giảm **thời gian tải trang ban đầu**.

  - Giảm **dung lượng dữ liệu** tiêu thụ.

  - Giảm tải cho server, tiết kiệm băng thông.

- **Khi nào KHÔNG nên dùng:**

  - Ảnh **above the fold** (nằm trong vùng nhìn thấy đầu tiên khi load trang, ví dụ: banner hero, logo). Dùng `loading="eager"` (mặc định) để tải ngay.

  - Ảnh **quan trọng, cần hiển thị ngay lập tức** (ví dụ: ảnh sản phẩm chính trong trang chi tiết).

  - Trình duyệt cũ không hỗ trợ (IE11, Safari < 15), cần có fallback.

**2. Tại sao nên cung cấp nhiều `<source>` trong `<video>`?**

- Các trình duyệt khác nhau hỗ trợ các **video codec/format khác nhau**.

- Cung cấp nhiều `<source>` với các format khác nhau giúp trình duyệt chọn format mà nó **hỗ trợ tốt nhất**.

- Nếu trình duyệt không hỗ trợ format đầu tiên, nó sẽ thử format tiếp theo trong danh sách.

**3 format video web phổ biến:**

| Format      | Codec           | Trình duyệt hỗ trợ                     |
| ----------- | --------------- | -------------------------------------- |
| MP4 (H.264) | H.264 / AAC     | Hầu hết tất cả trình duyệt (universal) |
| WebM        | VP9 / Vorbis    | Chrome, Firefox, Edge, Opera           |
| Ogg (OGV)   | Theora / Vorbis | Firefox, Chrome, Opera                 |

**3. Thuộc tính `alt` trên `<img>` dùng để làm gì?**

- `alt` (alternative text) cung cấp **mô tả văn bản thay thế** cho hình ảnh khi:

  - Hình ảnh không tải được (lỗi đường dẫn, mạng chậm).

  - Người dùng dùng screen reader (người khiếm thị).
  
  - Trình duyệt chế độ text-only.

**Viết `alt` tốt cho 3 trường hợp:**

| Trường hợp                    | `alt` tốt                                                                                                                                         | Giải thích                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Ảnh sản phẩm iPhone 16        | `alt="iPhone 16 màu đen, 128GB, mặt trước hiển thị màn hình Dynamic Island"`                                                                      | Mô tả chi tiết sản phẩm: tên, màu sắc, dung lượng, điểm nổi bật. Giúp người khiếm thị hình dung sản phẩm.            |
| Ảnh trang trí (decorative)    | `alt=""` (chuỗi rỗng)                                                                                                                             | Ảnh chỉ mang tính trang trí, không chứa thông tin. Screen reader sẽ bỏ qua, không làm phiền người dùng.              |
| Ảnh biểu đồ doanh thu Q1/2026 | `alt="Biểu đồ cột doanh thu quý 1/2026: Tháng 1 đạt 500 triệu, Tháng 2 đạt 750 triệu, Tháng 3 đạt 1 tỷ đồng. Tăng trưởng 100% so với quý trước."` | Tóm tắt dữ liệu chính từ biểu đồ vì người khiếm thị không thể nhìn thấy hình ảnh. Cần truyền đạt insight quan trọng. |

---

#### Câu A5: So sánh `<figure>` vs `<img>`

|                  | Cách 1: `<img>` đơn giản                              | Cách 2: `<figure>` + `<figcaption>`                                              |
| ---------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Code**         | `<img src="product.jpg" alt="iPhone">`                | `<figure><img src="product.jpg" alt="..."><figcaption>...</figcaption></figure>` |
| **Khi nào dùng** | Khi hình ảnh **không cần chú thích/caption** bổ sung. | Khi hình ảnh **cần chú thích** đi kèm (tên, mô tả, nguồn, giá...).               |

**2 ví dụ thực tế cho Cách 1 (`<img>` đơn giản):**

1. **Avatar người dùng trong header:** `<img src="avatar.jpg" alt="Ảnh đại diện của tôi">` — chỉ cần hiển thị ảnh đại diện, không cần caption.
2. **Icon mạng xã hội trong footer:** `<img src="facebook-icon.svg" alt="Facebook">` — icon nhỏ, chỉ mang tính liên kết, không cần chú thích.

**2 ví dụ thực tế cho Cách 2 (`<figure>` + `<figcaption>`):**

1. **Ảnh sản phẩm trong trang chi tiết:**

```html
<figure>
  <img src="iphone16.jpg" alt="iPhone 16 Pro Max màu Titan tự nhiên, 256GB" />
  <figcaption>
    iPhone 16 Pro Max 256GB — Giá: 29.990.000đ | Bảo hành 12 tháng
  </figcaption>
</figure>
```

2. **Ảnh minh họa bài viết blog review sản phẩm:**

```html
<figure>
  <img
    src="unboxing.jpg"
    alt="Hộp đựng iPhone 16 mở ra với phụ kiện bên trong"
  />
  <figcaption>
    Hình 1: Mở hộp iPhone 16 — Bên trong gồm máy, cáp USB-C, que chọc SIM.
  </figcaption>
</figure>
```
