# POMIFY — WEB APPLICATION & UI/UX SPECIFICATION

> **Dự án:** Pomify Web Application  
> **Nền tảng:** React / React Native for Web / Next.js (JavaScript)  
> **Mục đích:** Tài liệu quy chuẩn thiết kế UI/UX, Motion Specification và Hệ thống Thư viện Kỹ thuật dành riêng cho **Website Pomify**.

---

## 🌟 1. Định Hướng Thiết Kế (Design Strategy & Aesthetics)

### 1.1. Cá Tính Thương Hiệu (Brand Personality)
* **Thông điệp cốt lõi:** Smart Tech. Cute Vibe (Công nghệ thông minh, Phong cách dễ thương).
* **Nói không với:** Cyberpunk, Gaming, Đèn Neon quá mức, AI lạnh lẽo, Phong cách Robot công nghiệp thô cứng.
* **Định hướng trải nghiệm:** Thông minh 🤖, Đáng yêu 💜, Cao cấp ✨, Thư thái 🌱, Thân thiện 💬, Quan tâm 🫶, Cá nhân hóa 🎨.

### 1.2. Định Hướng Trực Quan (Visual Direction)
* **Nền (Background):** Trắng / Off-white / Cream nhạt (`#F9F9FB`, `#F5F3FF`).
* **Màu chính (Primary):** Tím Pastel (`#A78BFA`), Xanh Baby Blue (`#93C5FD`).
* **Màu phụ (Secondary):** Hồng Pastel (`#FBCFE8`), Mint (`#A7F3D0`).
* **Màu chữ & Icon:** Xanh Navy đậm / Gần đen (`#1E1B4B`, `#0F172A`).
* **Thành phần UI:** Bán kính bo góc lớn (`Border Radius: 20–32px`), Gradient mềm mại, Shadow đổ bóng nổi nhẹ nhàng kiểu Glassmorphism / Soft-Neumorphism.
* **Nhân vật trung tâm:** Robot Pomify đóng vai trò là nhân vật đại diện xuyên suốt trải nghiệm trang web.

### 1.3. Triết Lý Chuyển Động (Motion Philosophy)
* **Nguyên tắc:** Robot = Nhân vật | Hoạt ảnh = Cá tính | Tương tác = Giao tiếp.
* **Yêu cầu:** Mượt mà, tinh tế và có mục đích. Tránh nhảy liên tục, nhún liên hồi, chuyển đổi cảm xúc quá nhanh hoặc quá nhiều hạt hiệu ứng rườm rà.
* **Luồng chuyển động:** Cử động nhỏ -> Tương tác có ý nghĩa -> Trạng thái nghỉ thư thái.

---

## 🛠️ 2. Danh Sách Thư Viện Kỹ Thuật (Tech Stack & Libraries)

Để xây dựng **Website Pomify** bằng **JavaScript (React / React Native for Web)** với mô hình Robot 3D tương tác theo con trỏ chuột, hiệu ứng Parallax mượt mà và giao diện chuẩn cao cấp, hệ thống sử dụng các thư viện chuyên dụng sau:

### 2.1. Thư Viện Cốt Lõi & Đồ Họa 3D (Core & 3D Web Graphics)
1. **`react` & `react-dom`**: Core framework xây dựng giao diện Website.
2. **`three`**: Thư viện đồ họa 3D WebGL cốt lõi.
3. **`@react-three/fiber`**: React renderer cho Three.js, giúp quản lý và hiển thị mô hình Robot 3D (`.gltf` / `.glb`) trong React.
4. **`@react-three/drei`**: Thư viện tiện ích mở rộng cho `@react-three/fiber` (hỗ trợ load model, ánh sáng, đổ bóng, điều khiển OrbitControls, camera).
5. **`@rive-app/react-canvas`** hoặc **`lottie-react`**: Dùng cho các hoạt ảnh biếu cảm khuôn mặt Robot 2D/Vector (Blink, Smile, Thinking, Sleepy) với hiệu năng tối ưu trên Browser.

### 2.2. Animation UI, Scroll & Parallax (Web Motion)
6. **`framer-motion`**: Thư viện hiệu ứng chuyển động mạnh mẽ cho Web React (xuất sắc cho Hover, Entrance animation, Transition giữa các trang và micro-interactions).
7. **`gsap` (GreenSock) & `ScrollTrigger`**: Quản lý các hiệu ứng cuộn trang Parallax, Robot cuộn xoay theo màn hình và animation phức tạp theo chuỗi timeline.
8. **`lucide-react`** hoặc **`react-icons`**: Bộ icon hiện đại, tối giản cho Website.

### 2.3. Styling, Design System & Gradient (UI & Design Stack)
9. **`tailwindcss`**: Thư viện styling cốt lõi (Utility-first CSS framework), định nghĩa hệ thống màu Pastel, hiệu ứng Glassmorphism (`backdrop-blur`) và bo góc bo tròn cute (`rounded-3xl`, `rounded-4xl`).
10. **`shadcn/ui` / `@radix-ui`**: Bộ UI Component unstyled, accessible (Modal Chat, Tabs Studio, Accordion Features, Tooltips).
11. **`clsx` / `tailwind-merge`**: Quản lý class CSS động linh hoạt.
12. **`lucide-react`**: Bộ icon nét mảnh, mềm mại chuẩn phong cách Cute Tech.

---

## 🛠️ 2.5. Cấu Hình Cốt Lõi TailwindCSS Cho Pomify (`tailwind.config.js`)

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pomify: {
          purple: '#A78BFA',  // Pastel Purple
          blue: '#93C5FD',    // Baby Blue
          pink: '#FBCFE8',    // Pastel Pink
          mint: '#A7F3D0',    // Mint
          bg: '#F9F9FB',      // Off-white / Cream
          navy: '#1E1B4B',    // Navy text
        }
      },
      borderRadius: {
        '4xl': '2rem',       // 32px - Bo góc cute
        '3xl': '1.5rem',     // 24px
      },
      backdropBlur: {
        glass: '16px',
      },
      boxShadow: {
        'soft-glass': '0 8px 32px 0 rgba(167, 139, 250, 0.15)',
        'cute-float': '0 20px 40px -15px rgba(30, 27, 75, 0.07)',
      }
    },
  },
  plugins: [],
}
```

---

## 💻 3. Chi Tiết Các Trang Website (Website Page Specifications)

### 3.1. Trang Chủ (Home / Meet Pomify)
* **Chức năng:** Khối Hero giới thiệu Pomify ("Smart Tech Cute Vibe — That's Pomify.", "Your AI companion for a smarter, more connected everyday life.") và nút CTA ([Explore Pomify], [Create Your Pomify]).
* **Bố cục Web:** Layout rộng rãi. Robot 3D lớn nằm ở trung tâm hoặc lệch phải trên nền pastel gradient nhẹ, xung quanh là các hình khối bay tự do và hiệu ứng ánh sáng mềm.
* **Hoạt ảnh & Tương tác:**
  * **Robot 3D theo con trỏ chuột:** Trạng thái Idle (Nhìn xung quanh) -> Rê chuột: Robot quay đầu hướng theo con trỏ chuột của người dùng.
  * **Hover CTA:** Rê chuột vào [Create Your Pomify] -> Robot nghiêng đầu tò mò (Curious); Rê chuột vào [Explore Pomify] -> Robot mỉm cười (Happy).
  * **Scroll Parallax:** Robot di chuyển nhẹ nhàng theo góc cuộn trang.
  * **Speech Bubble:** Bong bóng thoại "Hi, I'm Pomify 👋" xuất hiện sau 1 khoảng trễ, sau đó mờ dần.
  * **Floating Chat Widget:** Widget Chat AI nổi ở góc dưới trang web. Nhấp vào mở khung Chat hỗ trợ nhanh với chỉ báo gõ (...).

### 3.2. Trang "Pomify Là Gì?" (What is Pomify?)
* **Chức năng:** Tổng quan "Hơn cả công nghệ. Người bạn đồng hành biết quan tâm." Nêu bật khả năng: quản lý cuộc sống, nhắc nhở, lập kế hoạch, theo dõi công việc, gợi ý, tương tác giọng nói.
* **Bố cục Web:** Chia đôi màn hình (Split Layout) — Bên trái là nội dung dẫn dắt, bên phải là mô hình Robot 3D.
* **Hoạt ảnh & Tương tác:**
  * **Entrance:** Robot ẩn -> Trượt nhẹ lên -> Xuất hiện -> Chớp mắt -> Nhìn sang văn bản.
  * **Scroll Reaction:** Lướt màn hình khiến Robot đổi từ Idle -> Nghiêng đầu tò mò -> Mỉm cười.
  * **Hover Khái niệm:**
    * Rê chuột qua *Manage*: Robot nhìn icon Lịch.
    * Rê chuột qua *Remind*: Robot nhìn thông báo.
    * Rê chuột qua *Plan*: Robot nhìn lịch biểu.
    * Rê chuột qua *Connect*: Robot quay mắt nhìn người dùng.

### 3.3. Trang "Pomify Làm Được Gì?" (What Can Pomify Do?)
* **Chức năng:** Minh họa 4 trụ cột: 🔔 Nhắc nhở, 📅 Lập kế hoạch, 💡 Gợi ý, 💬 Tương tác (Giọng nói & Chat).
* **Bố cục Web:** Grid 4 ô tính năng tương tác với khu vực Demo trực tiếp khi gõ văn bản hoặc nói.
* **Hoạt ảnh Micro-interactions:**
  * **Nhắc nhở:** Icon lịch kích hoạt thông báo -> Robot nhìn thông báo -> Chớp mắt (Chuyển trạng thái: Neutral -> Alert -> Caring).
  * **Lập kế hoạch:** Thẻ công việc tự động sắp xếp vào lịch ngăn nắp (Robot: Thinking -> Happy).
  * **Gợi ý:** Tia sáng AI -> Trạng thái Suy nghĩ -> Bóng đèn phát sáng giải pháp -> Happy.
  * **Tương tác:** Bong bóng "Hey Pomify..." có sóng âm mượt -> Nhận dữ liệu -> Suy nghĩ -> Phản hồi.

### 3.4. Trang "Tại Sao Chọn Pomify?" (Why Pomify?)
* **Chức năng:** Giá trị "Thông minh hơn thế." 3 yếu tố: Thông minh (Lịch trình), Cá nhân (Thích nghi), Quan tâm (Biết khi nào cần nhắc, khi nào để bạn nghỉ ngơi).
* **Bố cục Web:** Các phần nội dung hiển thị nối tiếp theo chiều cuộn chuột.
* **Hoạt ảnh:**
  * **Smart:** Robot ở trạng thái Suy nghĩ với các hạt AI xung quanh.
  * **Personal:** Robot Tò mò -> Vui vẻ khi các icon hồ sơ cá nhân hiện ra.
  * **Caring:** Trạng thái Quan tâm cùng các icon trái tim mờ nổi nhẹ.

### 3.5. Trang Khám Phá Robot (Our Robot)
* **Chức năng:** Chi tiết phần cứng & giải phẫu Robot ("Gặp gỡ chú robot nhỏ hiểu bạn"). Các phần: Khuôn mặt (Biểu cảm), Giọng nói (Mic/Loa), Bộ não (Hệ thống AI), Cảm ứng (Sensors), Kết nối (Wi-Fi/Cloud).
* **Bố cục Web:** Showroom phần cứng cuộn trang. Khối 3D Robot lớn ở giữa với các đường chỉ dẫn (Callout Lines) nối tới các mô tả xung quanh.
* **Hoạt ảnh:**
  * **Hover Anatomy:** Face (Đổi biểu cảm), Voice (Sóng âm Lắng nghe -> Nói), Brain (Animation suy nghĩ), Touch (Phản ứng cảm ứng), Connectivity (Sóng kết nối).
  * **Scroll Showcase:** Robot tự động xoay nhẹ khi cuộn trang -> Các linh kiện mở rộng ra kèm đường nối chỉ dẫn.

### 3.6. Trang Tính Năng (Features)
* **Chức năng:** Danh mục tính năng đầy đủ phân theo nhóm: Năng suất, Khả năng AI, Giao tiếp, Đồng hành.
* **Bố cục Web:** Card Grid 4 cột hiện đại với hiệu ứng Hover Lift nhẹ.
* **Hoạt ảnh:** Demo micro-animations cho từng tính năng. Biểu cảm Robot tự động xoay vòng: Neutral -> Happy -> Thinking -> Sleepy.

### 3.7. Trang Tùy Chỉnh Studio (Customize)
* **Chức năng:** Trình thiết kế cá nhân hóa Robot ("Make Pomify Yours").
* **Bố cục Web:** Bố cục Studio 3 cột:
  * **Cột trái:** Panel điều khiển (Màu sắc, Biểu cảm, Phụ kiện, Style).
  * **Cột giữa:** Mô hình 3D Pomify lớn hiển thị trực quan và xoay 360°.
  * **Cột phải:** Xem trước thông số trực tiếp & Nút bấm [Save Design].
* **Hoạt ảnh:**
  * Đổi màu vật liệu mượt mà, phụ kiện xuất hiện tức thì trên mô hình 3D.
  * Khi không thao tác (Inactivity), Robot nhìn người dùng -> Chớp mắt -> Mỉm cười.
  * Khi lưu: Triggers thoại "Yep. That's me." + Robot nhún nhảy vui vẻ.

### 3.8. Trang Cửa Hàng (Shop Landing)
* **Chức năng:** Trang Hub định hướng ("Ready to Meet Your Pomify?").
* **Bố cục Web:** Hero Robot 3D hiển thị thông số cơ bản, giá bắt đầu, tùy chọn màu, nút [Purchase Pomify] và [Customize First].
* **Hoạt ảnh:** Hover [Purchase] làm Robot nhìn xuống nút -> Mỉm cười. Nhấp [Purchase] kích hoạt cử chỉ vẫy tay chào mượt mà.

### 3.9. Trang Chi Tiết Sản Phẩm (Product Detail)
* **Chức năng:** Trang chuyển đổi bán hàng ("Your Pomify. Your Companion.").
* **Bố cục Web:** Trình xem 3D tương tác (Xoay 360°, Zoom, đổi biểu cảm) bên trái + Khối đặt hàng & thông số bên phải. Cuộn xuống để xem Video phần cứng, vật phẩm đi kèm và FAQ.

### 3.10. Trang Về Chúng Tôi (About Us)
* **Chức năng:** Câu chuyện thương hiệu, Tầm nhìn, Sứ mệnh và Đội ngũ phát triển.
* **Bố cục Web:** Grid thành viên: Kim Ngọc (CEO), Mai Anh (CMO), Gia Bảo (CFO), Ngọc Trâm (CTO), Quốc Việt (CPO).
* **Hoạt ảnh:** Hover vào ảnh thành viên -> Ảnh phóng to nhẹ + Robot xuất hiện bên cạnh hướng mắt về thành viên đó.

---

## 👥 4. Phân Chia Công Việc Phát Triển Website (Web Development Allocation)

| STT | Phân Hệ / Trang Website | Người Phụ Trách | Trọng Tâm Phát Triển Web (React / JS) |
| :---: | :--- | :---: | :--- |
| **1** | Home (Meet Pomify) | **Bảo** | Landing, 3D Hero Canvas, Mouse Tracking & Chat Widget |
| **2** | What is Pomify? | **Bảo** | Split Layout, Entrance Motion & Interactive Hover Story |
| **3** | What Can Pomify Do? | **Bảo** | Feature Demos, Micro-interactions, Voice Waveform UI |
| **4** | Why Pomify? | **Bảo** | ScrollTrigger Sequential Reveal, Particles Effect |
| **5** | Our Robot | **Bảo** | 3D Model Hardware Anatomy, Callout Lines & Scroll Rotate |
| **6** | Features | **Bảo** | Features Catalog Grid, Micro-animations & Robot Emotion Cycle |
| **7** | About Us | **Bảo** | Brand Story Layout, Team Roster Hover Reactions |
| **8** | Customize | **Trâm** | 3-Column Studio Layout, 3D Model Real-time Material Swap |
| **9** | Shop | **Trâm** | Store Landing Hero, Interactive Purchase CTAs |
| **10** | Product Detail | **Trâm** | 3D Product Viewer (Rotate/Zoom Controls), E-commerce Flow |

---

## 📦 5. Hướng Dẫn Cài Đặt Package Json Cho Website (Web Stack)

Dưới đây là danh sách các gói npm cần thiết cho dự án Website React JS:

```bash
# Cài đặt TailwindCSS & Styling Utilities
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install clsx tailwind-merge lucide-react

# Cài đặt Core 3D Graphics
npm install three @react-three/fiber @react-three/drei

# Cài đặt Animation & Scroll Effects
npm install framer-motion gsap @rive-app/react-canvas lottie-react

# Cài đặt Web Speech & Utilities
npm install react-speech-recognition howler axios zustand
```

---
*Tài liệu đã được cập nhật chuẩn xác bao gồm TailwindCSS & Design System cho **Website Pomify** (React / JS).*

---
*Tài liệu đã được cập nhật chính xác cho **Website Pomify** (React / JS).*
