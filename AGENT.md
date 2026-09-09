# AGENT.md — Pomify Web Application Technical Baseline & Implementation Plan

> **Project:** Pomify Web Application  
> **Branch:** `features/shop-and-customizer` (forked from `origin/features/landing-page`)  
> **Engineer:** Trâm (Modules 8, 9, 10 takeover)  

---

## 📊 1. Current State Summary (Modules 1–7 Implemented by Bảo)

| Module # | Module Name | Status | Key Files / Entry Points |
| :---: | :--- | :---: | :--- |
| **1** | Home (Meet Pomify) | Implemented | `src/pages/HomePage.jsx`, `src/features/landing/components/HeroSection.jsx` |
| **2** | What is Pomify? | Implemented | `src/features/landing/components/WhatIsPomify.jsx` |
| **3** | What Can Pomify Do? | Implemented | `src/features/landing/components/CapabilitiesGrid.jsx` |
| **4** | Why Pomify? | Implemented | `src/features/landing/components/WhyPomifyTimeline.jsx` |
| **5** | Our Robot | Implemented | `src/pages/RobotPage.jsx`, `src/features/landing/components/HardwareAnatomy.jsx` |
| **6** | Features | Implemented | `src/pages/FeaturesPage.jsx`, `src/features/landing/components/FeaturesCatalog.jsx` |
| **7** | About Us | Implemented | `src/pages/AboutPage.jsx`, `src/features/landing/components/TeamGrid.jsx` |
| **8** | Customize Studio | Completed (Trâm) | `src/pages/CustomizePage.jsx`, `src/features/customize-studio/*` |
| **9** | Shop Landing | Completed (Trâm) | `src/pages/ShopPage.jsx`, `src/features/shop/*` |
| **10** | Product Detail | Completed (Trâm) | `src/pages/ProductDetailPage.jsx`, `src/features/shop/*` |
| **11** | Auth (Login & Register) | **Design Approved (Trâm)** | `src/pages/LoginPage.jsx`, `src/pages/RegisterPage.jsx`, `src/features/auth/*` |
| **12** | OTP & Forgot Password | **Design Approved (Trâm)** | `src/pages/ForgotPasswordPage.jsx`, `src/features/auth/*` |
| **13** | Cart & Checkout | **Design Approved (Trâm)** | `src/pages/CartPage.jsx`, `src/pages/CheckoutPage.jsx`, `src/features/shop/*` |
| **14** | Order History & Profile | **Design Approved (Trâm)** | `src/pages/OrderHistoryPage.jsx`, `src/features/user/*` |

---

## 🎨 2. Design Tokens & Theme Baseline

- **Primary Colors:**
  - Pastel Purple: `#A78BFA` (`pomify-purple`)
  - Pastel Purple Light: `#C4B5FD` (`pomify-purple-light`)
  - Pastel Purple Dark: `#7C3AED` (`pomify-purple-dark`)
  - Baby Blue: `#93C5FD` (`pomify-blue`)
  - Baby Blue Light: `#BFDBFE` (`pomify-blue-light`)
- **Secondary Colors:**
  - Pastel Pink: `#FBCFE8` (`pomify-pink`)
  - Pastel Pink Light: `#FCE7F3` (`pomify-pink-light`)
  - Mint: `#A7F3D0` (`pomify-mint`)
  - Mint Light: `#D1FAE5` (`pomify-mint-light`)
- **Neutral Colors & Background:**
  - Background: `#F9F9FB` (`pomify-bg`)
  - Off-White Glass Card: `#FFFFFF` / `rgba(255, 255, 255, 0.75)`
  - Text Navy: `#1E1B4B` (`pomify-navy`)
  - Subtext Slate: `#64748B` (`pomify-subtext`)
- **Border Radii:**
  - Super Soft Cute Corner: `rounded-4xl` (`32px` / `2rem`)
  - Card Corner: `rounded-3xl` (`24px` / `1.5rem`)
  - Standard Pill: `rounded-full`
- **Shadow & Effects:**
  - `shadow-soft-glass`: `0 8px 32px 0 rgba(167, 139, 250, 0.12)`
  - `shadow-cute-float`: `0 20px 40px -15px rgba(30, 27, 75, 0.08)`
  - `shadow-glow-purple`: `0 0 25px rgba(167, 139, 250, 0.35)`
  - Glass classes: `.glass-card`, `.glass-pill`, `.glass-nav`

---

## 🛠️ 3. Shared Components & Utilities

- **UI Elements:**
  - `src/components/ui/Button.jsx`: Shared button component with variants (`primary`, `secondary`, `pink`, `glass`, `ghost`), animations via `framer-motion`, and icon support.
  - `src/components/ui/GlassCard.jsx`: Glassmorphism wrapper card.
  - `src/components/ui/SpeechBubble.jsx`: Floating bubble notification.
  - `src/components/ui/Badge.jsx`: Tag badges.
- **3D Canvas & Robot Wrappers:**
  - `src/components/3d/CanvasViewer.jsx`: `@react-three/fiber` Canvas setup with lighting and environment.
  - `src/features/robot-companion/components/PomifyRobot3D.jsx`: Core 3D Pomify model with interactive rotation, head tilt, arm sway, antenna lighting, and expression overlay.
  - `src/features/robot-companion/store/robotStore.js`: Zustand store controlling robot emotion, bubble speech text, target rotation, and micro-reaction triggers.
- **Navigation & Layout:**
  - `src/components/layout/Navbar.jsx`: Glass sticky navigation header.
  - `src/components/layout/Footer.jsx`: Shared site footer.

---

## 🚀 4. Technical Roadmap for Modules 8–14

### Module 8: Customize Studio (`/customize`) [Implemented]
- **Components:** `StudioLayout.jsx`, `ControlPanel.jsx`, `CustomizerRobot3D.jsx`, `LiveSpecPreview.jsx`, `customizerStore.js`.

### Module 9: Shop Landing (`/shop`) [Implemented]
- **Components:** `ShopHero.jsx`, `ShopFeatureCards.jsx`, `InteractivePurchaseSection.jsx`, `cartStore.js`.

### Module 10: Product Detail Page (`/shop/pomify`) [Implemented]
- **Components:** `ProductViewer3D.jsx`, `ProductBuyBox.jsx`, `HardwareSpecs.jsx`, `WhatsInTheBox.jsx`, `ProductFAQ.jsx`.

### Module 11: Authentication Suite (`/login`, `/register`) [Design Phase]
- **Components & Layout:** Separate pages `/login` & `/register` with 2-column split layout (Glassmorphism form left + 3D Robot right).
- **Robot Interaction:** Robot smiles when typing email, and plays shy/covers eyes when typing password.

### Module 12: OTP Mailer & Password Recovery (`/forgot-password`) [Design Phase]
- **Email Credentials:** `EMAIL_USER=oroka150@gmail.com` | `EMAIL_PASS=zcxdwjjmwkdskujd`
- **Flow:** User enters email -> Trigger OTP code email -> Enter 6-digit PIN -> Reset password.

### Module 13: Cart & Checkout Page (`/cart`, `/checkout`) [Design Phase]
- **Components:** Dedicated `/cart` page with item table & coupon code, and `/checkout` page with shipping form, Guest Checkout support, and 3 standard payment options (COD, QR Bank Transfer, Visa/Mastercard).

### Module 14: Order History & User Profile (`/orders`, `/profile`) [Design Phase]
- **Components:** Dedicated `/orders` page with order status timeline (`Processing` -> `Shipping` -> `Delivered`) and order itemized breakdown.

---

## 🧭 5. Language & Quality Rules
- **100% English** UI copy, tooltips, and specifications.
- Consistent cute-tech visual style (pastel colors, rounded-3xl/4xl, glassmorphism, Framer Motion transitions).
