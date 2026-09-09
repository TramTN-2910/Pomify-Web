import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RobotPage from '../pages/RobotPage';
import FeaturesPage from '../pages/FeaturesPage';
import AboutPage from '../pages/AboutPage';

// Placeholder for Trâm's Customize & Shop features
const StudioPlaceholder = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
    <div className="w-16 h-16 rounded-3xl bg-purple-100 text-pomify-purple flex items-center justify-center text-3xl">🎨</div>
    <h2 className="text-2xl font-bold text-pomify-navy">Customize Studio 3D (Trâm's Module)</h2>
    <p className="text-sm text-pomify-subtext max-w-md">3-Column Studio Layout with Real-time 3D Material Swap & Accessories selection.</p>
  </div>
);

const ShopPlaceholder = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
    <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl">🛍️</div>
    <h2 className="text-2xl font-bold text-pomify-navy">Pomify Shop Landing (Trâm's Module)</h2>
    <p className="text-sm text-pomify-subtext max-w-md">Interactive 3D Product Viewer, Swatches & Order Checkout Flow.</p>
  </div>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/robot" element={<RobotPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/customize" element={<StudioPlaceholder />} />
      <Route path="/shop" element={<ShopPlaceholder />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
