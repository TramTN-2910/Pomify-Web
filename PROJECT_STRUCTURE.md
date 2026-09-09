# POMIFY WEB PROJECT STRUCTURE (FEATURE-DRIVEN & ATOMIC DESIGN)

Based on the technical specification of the **Pomify Web Application** (React / JavaScript, `@react-three/fiber` for 3D Robot rendering, `framer-motion`, `gsap`), the directory structure follows a **Feature-Driven Modular Architecture** combined with an **Atomic Component Layout**.

This structure ensures:
- Clear separation of concerns between Landing Page/Content and Customize Studio/E-commerce.
- Neat management and reuse of 3D assets (`.gltf`/`.glb`), 3D Canvas elements, and specialized Motion effects.
- Clean scalability, maintainability, and seamless team collaboration.

---

## 📁 Directory Structure Overview

```text
pomify-web/
├── public/
├── src/
│   ├── assets/
│   │   ├── logo.png               # Brand logo asset used for floating launcher button
│   │   ├── models/                # 3D Assets (.gltf, .glb, textures)
│   │   │   ├── pomify-base.glb    # Original Pomify 3D Model
│   │   │   ├── accessories/       # Studio Accessories (hats, glasses, headphones)
│   │   │   └── textures/          # Material color textures
│   │   ├── animations/            # Rive / Lottie vector files (.json, .riv)
│   │   ├── audio/                 # Sound effects (hover.mp3, click.mp3, voice-reply.mp3)
│   │   └── images/                # Static banners, team photos
│   │
│   ├── components/                # Shared UI Components (Atomic Design)
│   │   ├── ui/                    # Core UI Elements (Glass Cards, Buttons, Inputs, Badges)
│   │   │   ├── Button.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── SpeechBubble.jsx
│   │   │   └── Badge.jsx
│   │   ├── layout/                # Layout Wrappers & Navigation
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   └── ScrollToTop.jsx
│   │   └── 3d/                    # Shared 3D Canvas Elements
│   │       ├── CanvasViewer.jsx   # Shared R3F Canvas Wrapper
│   │       ├── Lighting.jsx       # Studio 3D Lighting setup
│   │       └── Environment.jsx    # Soft pastel background lighting
│   │
│   ├── features/                  # FEATURE-DRIVEN MODULES
│   │   │
│   │   ├── robot-companion/       # [Shared Core Robot Logic]
│   │   │   ├── components/
│   │   │   │   ├── PomifyRobot3D.jsx     # Primary 3D model with head/eye movement
│   │   │   │   ├── RobotExpressions.jsx  # Facial expressions (Smile, Blink, Thinking)
│   │   │   │   └── MouseTracker3D.jsx    # Cursor tracking rotation logic
│   │   │   ├── hooks/
│   │   │   │   └── useRobotAnimation.js  # Robot emotion state hook
│   │   │   └── store/
│   │   │       └── robotStore.js         # Zustand store for Robot Emotion state
│   │   │
│   │   ├── landing/               # [Landing & Marketing Content]
│   │   │   ├── components/
│   │   │   │   ├── HeroSection.jsx       # Home Hero with 3D canvas
│   │   │   │   ├── WhatIsPomify.jsx      # Split layout interactive story
│   │   │   │   ├── CapabilitiesGrid.jsx  # Interactive feature demos
│   │   │   │   ├── WhyPomifyTimeline.jsx # ScrollTrigger timeline reveal
│   │   │   │   ├── HardwareAnatomy.jsx   # Callout lines 3D hardware reveal
│   │   │   │   ├── FeaturesCatalog.jsx   # Feature grid & micro-animations
│   │   │   │   └── TeamGrid.jsx          # About Us team roster
│   │   │   └── hooks/
│   │   │       └── useLandingScroll.js   # GSAP ScrollTrigger timeline hook
│   │   │
│   │   ├── chat-widget/           # [Floating AI Assistant]
│   │   │   ├── components/
│   │   │   │   ├── FloatingChatBox.jsx    # Pomify Logo Launcher & Mistral AI Chat Box
│   │   │   │   └── VoiceInputWaveform.jsx# Web Speech voice waveform indicator
│   │   │   ├── services/
│   │   │   │   └── mistralService.js     # Mistral AI API integration & Fallback Knowledge Engine
│   │   │   └── hooks/
│   │   │       └── useVoiceRecognition.js# Web Speech API handler
│   │   │
│   │   ├── customize-studio/      # [3D Customizer Studio]
│   │   │   ├── components/
│   │   │   │   ├── StudioLayout.jsx      # 3-Column Studio Layout
│   │   │   │   ├── ControlPanel.jsx      # Color, material & accessory selection
│   │   │   │   ├── CustomizerRobot3D.jsx # Real-time 3D model viewer
│   │   │   │   └── LiveSpecPreview.jsx   # Live specs preview & Save Design CTA
│   │   │   └── store/
│   │   │       └── customizerStore.js    # Customized robot model state
│   │   │
│   │   └── shop/                  # [E-commerce & Store Suite]
│   │       ├── components/
│   │       │   ├── ShopHero.jsx
│   │       │   ├── ProductViewer3D.jsx   # Interactive 3D Product Viewer (360° Rotate, Zoom)
│   │       │   ├── HardwareSpecs.jsx
│   │       │   └── ProductBuyBox.jsx
│   │       └── store/
│   │           └── cartStore.js          # Cart items state management
│   │
│   ├── pages/                     # Main Route Pages
│   │   ├── HomePage.jsx           # Home / Meet Pomify
│   │   ├── RobotPage.jsx          # Our Robot Anatomy
│   │   ├── FeaturesPage.jsx       # Features Catalog
│   │   ├── AboutPage.jsx          # About Us
│   │   ├── CustomizePage.jsx      # Customize Studio
│   │   ├── ShopPage.jsx           # Store Hub
│   │   ├── ProductDetailPage.jsx  # Product Specs & Buy Box
│   │   ├── CartPage.jsx           # Cart Itemized Summary
│   │   ├── CheckoutPage.jsx       # Shipping Form & Guest Checkout
│   │   ├── LoginPage.jsx          # User Sign In
│   │   ├── RegisterPage.jsx       # User Registration
│   │   ├── ForgotPasswordPage.jsx # Password Recovery
│   │   └── OrderHistoryPage.jsx   # Order Status Dashboard
│   │
│   ├── routes/                    # Route Setup
│   │   └── AppRouter.jsx          # React Router DOM configuration
│   │
│   ├── styles/                    # Global CSS & Design Tokens
│   │   ├── glassmorphism.css
│   │   └── index.css
│   │
│   ├── App.jsx                    # Root Application Component
│   └── main.jsx                   # React Entry Point
│
├── index.html                     # HTML Template with SEO metadata
├── package.json
└── vite.config.js
```

---

## 🎯 Architecture Rationale

1. **Feature-Driven Modular Directory (`features/`):**
   * Keeps related UI components, services, and hooks co-located within their logical module.
   * `chat-widget` isolates the Pomify logo floating button, Mistral AI integration, quick suggestions, and voice input logic cleanly.

2. **Core Companion Decoupling (`robot-companion/`):**
   * The 3D Pomify model, facial expression states, and mouse tracking logic are shared across multiple pages (Home, About Us, Customize, Shop) without code duplication.

3. **Intelligent Fallback Architecture:**
   * AI completions seamlessly fall back to an offline product knowledge engine when an API key is absent, ensuring reliability during testing and demos.
