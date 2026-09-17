# POMIFY — WEB APPLICATION & UI/UX SPECIFICATION

> **Project:** Pomify Web Application  
> **Platform:** React / React Native for Web / Vite (JavaScript)  
> **Purpose:** Comprehensive UI/UX Design System, Motion Specification, and Technical Stack Reference for **Pomify Web**.

---

## 🌟 1. Design Strategy & Aesthetics

### 1.1. Brand Personality
* **Core Message:** Smart Tech. Cute Vibe.
* **Avoid:** Cyberpunk, excessive gaming neon lights, cold industrial AI, rigid industrial robot styles.
* **Experience Pillars:** Smart 🤖, Cute 💜, Premium ✨, Relaxing 🌱, Friendly 💬, Caring 🫶, Personalized 🎨.

### 1.2. Visual Direction
* **Background:** Clean / Off-white / Soft Cream (`#F9F9FB`, `#F5F3FF`).
* **Primary Palette:** Pastel Purple (`#A78BFA`), Baby Blue (`#93C5FD`).
* **Secondary Palette:** Pastel Pink (`#FBCFE8`), Mint (`#A7F3D0`).
* **Text & Icons:** Deep Navy / Soft Charcoal (`#1E1B4B`, `#0F172A`).
* **UI Elements:** Extra rounded corners (`Border Radius: 20–32px`), smooth gradients, soft glassmorphism shadows (`shadow-soft-glass`, `shadow-cute-float`).
* **Central Character:** Pomify 3D companion robot acting as the guiding brand representative throughout the user journey.

### 1.3. Motion Philosophy
* **Principle:** Robot = Character | Motion = Personality | Interaction = Conversation.
* **Requirement:** Smooth, subtle, purposeful motion. Avoid erratic bounces, rapid emotion switches, or cluttering particle effects.
* **Flow:** Subtle micro-interaction -> Meaningful feedback -> Relaxed resting idle state.

---

## 🛠️ 2. Tech Stack & Libraries

The **Pomify Website** leverages modern React libraries and WebGL graphics for interactive 3D robot rendering:

### 2.1. Core & 3D Web Graphics
1. **`react` & `react-dom`**: Frontend UI framework.
2. **`three`**: Core WebGL 3D graphics engine.
3. **`@react-three/fiber`**: React renderer for Three.js managing 3D Robot models (`.gltf` / `.glb`).
4. **`@react-three/drei`**: Useful helpers for `@react-three/fiber` (model loading, studio lighting, OrbitControls, environment).
5. **`@rive-app/react-canvas` / `lottie-react`**: Vector facial animations (Blink, Smile, Thinking, Sleepy) optimized for web performance.

### 2.2. Motion & Interaction Stack
6. **`framer-motion`**: Animation library for page transitions, floating widgets, micro-interactions, and hover feedback.
7. **`gsap` & `ScrollTrigger`**: Smooth scroll timelines and 3D parallax scroll effects.
8. **`lucide-react`**: Modern, clean icon suite.

### 2.3. Styling & State Management
9. **`tailwindcss`**: Utility-first CSS framework with custom pastel design tokens.
10. **`zustand`**: State management for robot emotions, customizer selections, and cart items.
11. **`mistral-ai`**: Cloud completion API for the Pomify Virtual Assistant (`https://api.mistral.ai/v1/chat/completions`) with intelligent offline knowledge fallback.

---

## 💻 3. Page Specifications

### 3.1. Home Page (`/`)
* **Features:** Hero section featuring Pomify ("Smart Tech Cute Vibe — That's Pomify."), 3D interactive model following mouse pointer, call-to-action buttons ([Explore Pomify], [Create Your Pomify]), and floating Pomify Logo AI Launcher Widget.
* **Floating Chat Widget:** Floating button at the bottom-right corner displaying the Pomify logo image. Clicking toggles the Mistral AI Assistant chat box.

### 3.2. What is Pomify? Page (`/#what-is-pomify`)
* **Features:** Split layout comparing traditional tools with Pomify's caring AI companion model. Interactive hover stories for calendar, task planning, and reminders.

### 3.3. Capabilities & Demos Page (`/features`)
* **Features:** Interactive grid illustrating 4 key pillars: 🔔 Smart Reminders, 📅 Calendar Planning, 💡 AI Suggestions, 💬 Voice & Chat Interaction.

### 3.4. Our Robot Anatomy (`/robot`)
* **Features:** Hardware breakdown showcase of the physical Pomify desk companion with callout lines pointing to the OLED face, spatial speaker, touch sensors, and AI chip.

### 3.5. 3D Customize Studio (`/customize`)
* **Features:** 3-column studio layout for real-time 3D model customization (materials, accessories, expression presets) with live 360° orbit view and design save options.

### 3.6. Shop & E-commerce Suite (`/shop`, `/cart`, `/checkout`, `/orders`)
* **Shop Landing (`/shop`)**: Product showcase, customization pre-selection, and purchase options.
* **Cart & Checkout (`/cart`, `/checkout`)**: Item breakdown, coupon codes, Guest Checkout support, shipping address forms, VietQR / COD / Credit Card payment methods, and instant email confirmation.
* **Order History (`/orders`)**: Customer dashboard tracking order shipping status (`Processing` 🚚 -> `Shipping` 📦 -> `Delivered` 🎉).

### 3.7. Admin Management Portal (`/admin/login`, `/admin/dashboard`, `/admin/orders`, `/admin/inventory`)
* **Theme Synchronization & Dark/Light Mode**: Shared brand color palette (Pastel Purple `#A78BFA`, Soft Glassmorphism, Rounded 24px) with instant Light Mode / Dark Mode toggle saved in `localStorage`.
* **Exclusion of AI Companion Chatbot**: AI Chatbot launcher widget (`FloatingChatBox`) is automatically hidden on all Admin portal routes.
* **Admin Authentication (`/admin/login`)**: Secure JWT authentication console with full English language interface.
* **Sales Dashboard (`/admin/dashboard`)**: Analytics dashboard displaying Total Revenue, Total Orders, Pending Orders count, Low Stock Alerts, interactive revenue growth bar chart, top-selling products, and live order feed.
* **Admin Order Management (`/admin/orders`)**: 
  - Status filtering (`Pending`, `Processing`, `Shipping`, `Delivered`, `Cancelled`).
  - **Strict Order Workflow Rules**: Irreversible status transitions once an order reaches `Cancelled` or `Delivered`.
  - **Cancellation Business Logic**: Requires selecting a **Cancellation Reason** (`Out of Stock`, `Customer Request`, `Payment Failed`, `Invalid Address`, `Other`).
  - **Automatic Stock Restoration**: When an order is `Cancelled`, item quantities are automatically restored back to warehouse inventory.
* **Inventory & Warehouse Management (`/admin/inventory`)**: Stock level tracking, variant stock counts, reorder thresholds, visual stock status badges (`In Stock` 🟢, `Low Stock` 🟡, `Out of Stock` 🔴), and inline stock quantity / pricing editor.
* **Notification Center**: Live Notification Bell dropdown fetching system alerts (`New Order Placed`, `Order Cancelled`, `Low Stock Warning`) via backend API with unread counter and mark-as-read controls.

---

## 📦 4. Environment & API Services Configuration

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Mistral AI Assistant API Configuration
VITE_MISTRAL_API_KEY=your_mistral_api_key_here

# Email Confirmation Service (.env)
VITE_EMAIL_SERVICE_USER=oroka150@gmail.com
VITE_EMAIL_SERVICE_PASS=zcxdwjjmwkdskujd
```

---

## ⚙️ 5. Backend Architecture & API Specification

The **Pomify Backend Service** operates independently to power e-commerce operations, order tracking, notification feeds, and inventory control.

### 5.1. Tech Stack
* **Runtime & Framework:** Node.js (ESM) + Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JWT (JSON Web Tokens) with bcrypt password hashing
* **CORS & Middleware:** Full CORS support for Vite frontend web applications

### 5.2. Core API Endpoints
* `POST /api/v1/auth/admin-login` — Admin authentication & JWT token generation
* `GET /api/v1/admin/dashboard/stats` — Sales analytics & stock alerts
* `GET /api/v1/admin/orders` — List & filter customer orders
* `PUT /api/v1/admin/orders/:id/status` — Update order status, record cancellation reason, auto-restock inventory
* `GET /api/v1/admin/inventory` — Retrieve inventory items & stock levels
* `PUT /api/v1/admin/inventory/:id` — Update stock quantities & reorder thresholds
* `GET /api/v1/admin/notifications` — Fetch real-time system notifications
* `PUT /api/v1/admin/notifications/read` — Mark notifications as read


