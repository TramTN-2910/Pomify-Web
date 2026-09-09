import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Palette, Sparkles, Star, ShieldCheck, Truck, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import CanvasViewer from '../../../components/3d/CanvasViewer';
import PomifyRobot3D from '../../robot-companion/components/PomifyRobot3D';
import useRobotStore from '../../robot-companion/store/robotStore';
import SpeechBubble from '../../../components/ui/SpeechBubble';

export const ShopHero = () => {
  const navigate = useNavigate();
  const { setBubbleText, triggerReaction, bubbleText, showBubble } = useRobotStore();
  const [selectedColor, setSelectedColor] = useState('purple');

  const colorSwatches = [
    { id: 'purple', name: 'Pastel Purple', hex: '#A78BFA' },
    { id: 'blue', name: 'Baby Blue', hex: '#93C5FD' },
    { id: 'pink', name: 'Sakura Pink', hex: '#FBCFE8' },
    { id: 'mint', name: 'Fresh Mint', hex: '#A7F3D0' },
  ];

  const handlePurchaseHover = () => {
    setBubbleText("Ready to come home with you! 🛍️", true);
    triggerReaction('happy');
  };

  const handleCustomizeHover = () => {
    setBubbleText("Let's create something unique! 🎨", true);
    triggerReaction('curious');
  };

  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/40 via-blue-200/30 to-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Hero Copy & Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200 text-xs font-bold text-pomify-purple-dark shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pomify-purple" />
            <span>Official Pomify Store</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-pomify-navy tracking-tight leading-tight">
            Ready to Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pomify-purple via-purple-600 to-pomify-blue">Pomify Companion?</span>
          </h1>

          <p className="text-base sm:text-lg text-pomify-subtext max-w-xl leading-relaxed">
            The next-generation AI tabletop companion that listens, plans, reminds, and brings adorable personality into your daily life.
          </p>

          {/* Quick Color Selector */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-pomify-navy/70">
              Select Color Edition: <span className="text-pomify-purple">{colorSwatches.find((c) => c.id === selectedColor)?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {colorSwatches.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setSelectedColor(swatch.id)}
                  className={`w-9 h-9 rounded-full transition-all duration-200 flex items-center justify-center border-2 ${
                    selectedColor === swatch.id
                      ? 'border-pomify-purple scale-110 shadow-md ring-2 ring-pomify-purple/30'
                      : 'border-white hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                  title={swatch.name}
                >
                  {selectedColor === swatch.id && <Check className="w-4 h-4 text-slate-800" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Rating Badge */}
          <div className="flex items-center gap-6 pt-2">
            <div>
              <div className="text-xs text-pomify-subtext font-medium">Starting Price</div>
              <div className="text-3xl font-black text-pomify-navy tracking-tight">$299 <span className="text-sm font-semibold text-slate-400">USD</span></div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-pomify-navy mt-0.5">4.9/5 Rating (1,240+ reviews)</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              icon={ShoppingBag}
              onMouseEnter={handlePurchaseHover}
              onClick={() => navigate('/shop/pomify')}
              className="shadow-cute-float"
            >
              Purchase Pomify
            </Button>

            <Link to="/customize">
              <Button
                variant="secondary"
                size="lg"
                icon={Palette}
                onMouseEnter={handleCustomizeHover}
              >
                Customize First
              </Button>
            </Link>
          </div>

          {/* Value Props */}
          <div className="pt-6 border-t border-purple-100/80 flex flex-wrap items-center gap-6 text-xs text-pomify-subtext font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-pomify-purple" />
              <span>Free Worldwide Express Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>2-Year Official Warranty</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 3D Product Interactive Card */}
        <div className="lg:col-span-5 relative">
          <div className="w-full h-[480px] rounded-4xl bg-gradient-to-br from-white/90 via-purple-50/50 to-blue-50/40 border border-white shadow-soft-glass relative flex flex-col items-center justify-center p-4 overflow-hidden">
            
            {/* Floating Speech Bubble */}
            <div className="absolute top-8 z-20 pointer-events-none">
              <SpeechBubble text={bubbleText} visible={showBubble} />
            </div>

            {/* 3D Viewer */}
            <div className="w-full h-full">
              <CanvasViewer cameraPosition={[0, 0, 5.0]}>
                <PomifyRobot3D scale={1.05} />
              </CanvasViewer>
            </div>

            {/* Interactive Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 z-10 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-purple-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-pomify-navy">In Stock • Ready to Ship</span>
              </div>
              <span className="text-xs font-extrabold text-pomify-purple">30-Day Money Back</span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

export default ShopHero;
