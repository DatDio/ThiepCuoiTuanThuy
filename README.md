# Thiệp Cưới Online Tuấn & Thúy 💍
> Phong cách: **Song Hỷ Xanh (Trắng Kem & Xanh Forest Green Sang Trọng)**  
> Công nghệ: **Next.js 14, TypeScript, Vanilla CSS Tokens**  
> Độc lập 100% **KHÔNG CẦN DATABASE** • Deploy **Miễn phí trọn đời trên Vercel**

---

## 🌟 Các Tính Năng Nổi Bật

1. **Cá nhân hóa Tên Khách Mời theo URL:**
   - Mỗi khách nhận link riêng: `https://ten-du-an.vercel.app/anh-nam` hoặc `https://ten-du-an.vercel.app/?to=Anh+Nam+va+Nguoi+Thuong`.
   - Hiển thị trang trọng ngay trên thiệp: *"Trân Trọng Kính Mời: Anh Nam & Người Thương"*.
   - Khung xem trước (OpenGraph) trên Zalo/Messenger tự động hiển thị tên khách mời.
2. **Trang Tạo Link & Quản Lý Khách Mời (`/danh-sach`):**
   - Thêm từng khách hoặc **dán hàng loạt từ file Excel** (hàng trăm khách chỉ trong 1 giây).
   - Nút **"Copy Link"** 1 chạm.
   - Nút **"Copy Lời Mời Zalo"** 1 chạm (kèm sẵn mẫu câu chúc và link thiệp chuẩn chỉnh).
   - Lưu trữ trực tiếp trong `localStorage` trình duyệt (an toàn, bảo mật, không lo mất dữ liệu khi dùng cùng máy tính/điện thoại).
   - Hỗ trợ xuất file Excel/CSV danh sách khách mời.
3. **Giao diện chuẩn Song Hỷ Xanh (Khớp 100% mẫu thiết kế):**
   - Vòm cong bán nguyệt ngược màu xanh rêu (`#1A3D2F`) in chữ "WELCOME TO OUR WEDDING" & "囍".
   - Khung ảnh vòm cung (Arch) với dòng chữ uốn cong *"✦ LOVE NEVER FAILS ✦"*.
   - Hiệu ứng cánh hoa trắng rơi nhẹ nhàng lãng mạn.
   - Nhạc nền cưới tự động phát với icon đĩa than quay tinh tế.
   - Đồng hồ đếm ngược đến ngày cưới 30/07/2026.
   - Thông tin Lễ Cưới (Ceremony) với 2 họ Nhà Trai - Nhà Gái.
   - Album ảnh cưới 2x2 kèm Lightbox phóng to xem toàn màn hình.
   - Thông tin Tiệc Cưới & Widget Lịch tháng 7/2026 khoanh tròn ngày 30.
   - Nút "Thêm vào lịch Google" tiện dụng.
   - Bản đồ chỉ đường Google Maps dẫn đến Gala Center.
   - Bảng quy định trang phục (Dress Code) với 3 vòng tròn màu chuẩn.
   - Lịch trình ngày cưới (Timeline mốc giờ).
   - Hộp mừng cưới Online tích hợp mã **VietQR** (tự động nhận diện ngân hàng cho cả Chú rể và Cô dâu kèm nút sao chép STK nhanh).
   - Sổ lưu bút (Guestbook) gửi lời chúc kèm pháo giấy rực rỡ.
   - Form xác nhận tham dự (RSVP).

---

## 🛠️ Hướng Dẫn Chỉnh Sửa Thông Tin Đám Cưới

Tất cả thông tin tiệc cưới được quản lý tập trung tại một file duy nhất:
👉 `data/weddingConfig.ts`

Bạn có thể mở file này để thay đổi:
- **Tên cô dâu, chú rể và bố mẹ hai bên**
- **Địa chỉ nhà trai, nhà gái và nơi tổ chức tiệc cưới**
- **Ngày giờ âm lịch, dương lịch**
- **Số tài khoản & mã VietQR mừng cưới**
- **Danh sách link ảnh cưới (Gallery)**
- **Nhạc nền cưới**

---

## 🚀 Cách Chạy Thử Trên Máy Tính (Local)

1. Mở Terminal tại thư mục dự án và chạy:
   ```bash
   npm run dev
   ```
2. Truy cập trình duyệt:
   - Thiệp cưới chính: [http://localhost:3000](http://localhost:3000)
   - Thiệp mẫu cho khách: [http://localhost:3000/anh-tuan](http://localhost:3000/anh-tuan)
   - Trang Tạo & Quản lý Link: [http://localhost:3000/danh-sach](http://localhost:3000/danh-sach)

---

## 🌐 Hướng Dẫn Deploy Lên Vercel Miễn Phí (Free 100%)

### Cách 1: Deploy qua GitHub (Khuyên dùng - Cập nhật tự động)
1. Tạo một repository mới trên [GitHub.com](https://github.com) (chọn chế độ Private hoặc Public tùy ý).
2. Đẩy toàn bộ mã nguồn lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "Thiệp cưới Tuấn & Thúy"
   git branch -M main
   git remote add origin <link-github-cua-ban>
   git push -u origin main
   ```
3. Truy cập [vercel.com](https://vercel.com) -> Đăng nhập bằng tài khoản GitHub.
4. Bấm **Add New...** -> **Project** -> Chọn repository vừa tải lên.
5. Bấm nút **Deploy**.
6. Sau 1 phút, Vercel sẽ cung cấp cho bạn một đường link miễn phí dạng `https://thiep-cuoi-tuan-thuy.vercel.app`!

### Cách 2: Deploy trực tiếp bằng Vercel CLI (Không cần GitHub)
1. Chạy lệnh:
   ```bash
   npx vercel
   ```
2. Làm theo hướng dẫn đăng nhập trên màn hình -> Web sẽ tự động được đưa lên Vercel.
