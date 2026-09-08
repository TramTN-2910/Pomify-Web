# KIẾN TRÚC CÂY THƯ MỤC DỰ ÁN WEBSITE POMIFY (FEATURE-DRIVEN & ATOMIC DESIGN)

Dựa trên yêu cầu kĩ thuật của dự án **Pomify Web Application** (React / JavaScript, `@react-three/fiber` cho Robot 3D, `framer-motion`, `gsap`), kiến trúc thư mục được thiết kế theo mô hình **Feature-driven Modular Architecture** kết hợp với **Atomic Component Layout**.

Mô hình này giúp:
- Tách biệt rõ ràng phần việc của **Bảo** (Landing & Content) và **Trâm** (Customize Studio & Shop/Ecommerce).
- Quản lý và tái sử dụng các assets 3D (`.gltf`/`.glb`), Canvas 3D và các hiệu ứng Motion chuyên biệt một cách ngăn nắp.
- Dễ dàng mở rộng, bảo trì và hạn chế conflict khi làm việc nhóm.

---

## 📁 Cây Thư Mục Tổng Quan (Directory Structure)

```text
pomify-web/
├── public/
├── src/
│   ├── assets/
│   │   ├── models/                # File 3D (.gltf, .glb, textures)
│   │   │   ├── pomify-base.glb    # Model Robot gốc
│   │   │   ├── accessories/       # Phụ kiện cho Studio (mũ, kính, tai nghe...)
│   │   │   └── textures/          # Material textures đổi màu
│   │   ├── animations/            # File Rive / Lottie (.json, .riv)
│   │   ├── audio/                 # Sound effects (hover.mp3, click.mp3, voice-reply.mp3)
│   │   ├── icons/                 # SVG Icons custom
│   │   └── images/                # Team photos, static banners
│   │
│   ├── components/                # Shared / Common UI Components (Atomic Design)
│   │   ├── ui/                    # Core UI Elements (Glassmorphism Cards, Buttons, Inputs)
│   │   │   ├── Button.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── SpeechBubble.jsx
│   │   │   └── Badge.jsx
│   │   ├── layout/                # Layout Wrappers
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageContainer.jsx
│   │   └── 3d/                    # Shared 3D Canvas Elements
│   │       ├── CanvasViewer.jsx   # R3F Canvas Wrapper chung
│   │       ├── Lighting.jsx       # Ánh sáng Studio 3D
│   │       └── Environment.jsx    # Soft pastel glow background
│   │
│   ├── features/                  # MÔ-ĐUN THEO TÍNH NĂNG (FEATURE-DRIVEN)
│   │   │
│   │   ├── robot-companion/       # [Dùng chung / Core Robot Logic]
│   │   │   ├── components/
│   │   │   │   ├── PomifyRobot3D.jsx     # Model 3D chính với chuyển động đầu/mắt
│   │   │   │   ├── RobotExpressions.jsx  # Rive/Lottie khuôn mặt (Smile, Blink, Thinking)
│   │   │   │   └── MouseTracker3D.jsx    # Logic xoay robot theo con trỏ chuột
│   │   │   ├── hooks/
│   │   │   │   └── useRobotAnimation.js  # Hook điều khiển cảm xúc/trạng thái Robot
│   │   │   └── store/
│   │   │       └── robotStore.js         # Zustand/Redux quản lý trạng thái Cảm xúc
│   │   │
│   │   ├── landing/               # [Phụ trách: BẢO] - Các trang Landing & Nội dung
│   │   │   ├── components/
│   │   │   │   ├── HeroSection.jsx       # Home Hero
│   │   │   │   ├── WhatIsPomify.jsx      # Split layout interactive story
│   │   │   │   ├── CapabilitiesGrid.jsx  # Interactive demos (Reminder, Plan, Voice)
│   │   │   │   ├── WhyPomifyTimeline.jsx # ScrollTrigger timeline reveal
│   │   │   │   ├── HardwareAnatomy.jsx   # Callout lines 3D hardware reveal
│   │   │   │   ├── FeaturesCatalog.jsx   # Feature grid & micro-animations
│   │   │   │   └── TeamGrid.jsx          # About Us team roster hover effects
│   │   │   └── hooks/
│   │   │       └── useLandingScroll.js   # GSAP ScrollTrigger timeline management
│   │   │
│   │   ├── chat-widget/           # [Phụ trách: BẢO] - Floating AI Chatbot
│   │   │   ├── components/
│   │   │   │   ├── FloatingChatBox.jsx
│   │   │   │   ├── TypingIndicator.jsx
│   │   │   │   └── VoiceInputWaveform.jsx
│   │   │   └── hooks/
│   │   │       └── useVoiceRecognition.js# Hook xử lý Web Speech API
│   │   │
│   │   ├── customize-studio/      # [Phụ trách: TRÂM] - Trình Tùy Chỉnh 3D
│   │   │   ├── components/
│   │   │   │   ├── StudioLayout.jsx      # 3-Column Studio Layout
│   │   │   │   ├── ColorPickerPanel.jsx  # Chọn màu vật liệu
│   │   │   │   ├── ExpressionSelector.jsx# Chọn biểu cảm mặt
│   │   │   │   ├── AccessoryPanel.jsx    # Thêm phụ kiện 3D
│   │   │   │   └── LiveSpecPreview.jsx   # Panel xem trước thông số & Save Design
│   │   │   ├── hooks/
│   │   │   │   └── use3DCustomizer.js    # Logic thay đổi material/mesh 3D thời gian thực
│   │   │   └── store/
│   │   │       └── customizerStore.js    # State lưu trữ phiên bản Robot custom
│   │   │
│   │   └── shop/                  # [Phụ trách: TRÂM] - Cửa hàng & Chi tiết sản phẩm
│   │       ├── components/
│   │       │   ├── ShopHero.jsx
│   │       │   ├── ProductViewer3D.jsx   # 3D Viewer tương tác (Rotate 360, Zoom)
│   │       │   ├── ColorSwatches.jsx
│   │       │   ├── HardwareSpecs.jsx
│   │       │   └── CheckoutBar.jsx       # Floating Purchase CTA
│   │       └── store/
│   │           └── cartStore.js          # State giỏ hàng
│   │
│   ├── pages/                     # Màn hình chính (Route Components)
│   │   ├── HomePage.jsx           # BẢO (Home, What is, Capabilities, Why Pomify)
│   │   ├── RobotPage.jsx          # BẢO (Our Robot Anatomy)
│   │   ├── FeaturesPage.jsx       # BẢO (Features suite)
│   │   ├── AboutPage.jsx          # BẢO (About Us)
│   │   ├── CustomizePage.jsx      # TRÂM (Customize Studio)
│   │   ├── ShopPage.jsx           # TRÂM (Shop Hub)
│   │   └── ProductDetailPage.jsx  # TRÂM (Product Detail)
│   │
│   ├── routes/                    # Routing Configuration
│   │   └── AppRouter.jsx          # React Router DOM setup
│   │
│   ├── styles/                    # Global Styles & Design Tokens
│   │   ├── variables.css          # Token màu Pastel, Spacing, Typography
│   │   ├── glassmorphism.css      # CSS hiệu ứng mờ kính & shadow
│   │   └── global.css             # Base reset & font setup (Inter/Outfit)
│   │
│   ├── utils/                     # Helper functions
│   │   ├── soundPlayer.js         # Howler.js helper phát âm thanh hover/click
│   │   ├── constants.js           # Hằng số toàn cục
│   │   └── formatters.js          # Format giá tiền, tiền tệ
│   │
│   ├── App.jsx                    # Root App Component
│   └── main.jsx                   # Entry point
│
├── package.json
└── vite.config.js / next.config.js
```

---

## 🎯 Giải Thích Lý Do Lựa Chọn Kiến Trúc Này

1. **Thư mục `features/` tách biệt nhiệm vụ (Feature-Driven):**
   * **Bảo (`features/landing`, `features/chat-widget`):** Quản lý toàn bộ các phần Landing Page, hiệu ứng cuộn GSAP ScrollTrigger, phân giải giải phẫu 3D `HardwareAnatomy` và Widget Chat giọng nói.
   * **Trâm (`features/customize-studio`, `features/shop`):** Tập trung hoàn toàn vào Bố cục Studio 3 cột, logic đổi màu/material 3D thời gian thực, trình xoay xem 3D sản phẩm và luồng mua hàng.

2. **Tách riêng core `robot-companion`:**
   * Model Robot 3D (`PomifyRobot3D.jsx`), biểu cảm Rive (`RobotExpressions.jsx`) và logic theo dõi con trỏ chuột (`MouseTracker3D.jsx`) được dùng ở nhiều trang khác nhau (Home, About Us, Customize, Shop). Việc đưa vào `robot-companion/` giúp tái sử dụng linh hoạt mà không bị lặp code.

3. **Thư mục `assets/` chuẩn hóa tài nguyên 3D & Âm thanh:**
   * Các file 3D nặng (`.glb`/`.gltf`) và file âm thanh tương tác (`howler.js`) được gom vào một nơi giúp dễ dàng tối ưu nén (Asset Optimization).

4. **Kiến trúc Clean & Scalable:**
   * Khi cần bổ sung thêm trang mới hoặc nâng cấp tính năng AI Chat, người phụ trách chỉ cần thao tác trong đúng thư mục feature của mình mà không sợ ảnh hưởng đến phần khác.
