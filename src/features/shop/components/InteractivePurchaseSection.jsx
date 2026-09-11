import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useRobotStore from '../../robot-companion/store/robotStore';

export const InteractivePurchaseSection = () => {
  const navigate = useNavigate();
  const { setBubbleText, triggerReaction } = useRobotStore();

  const handlePurchaseHover = () => {
    setBubbleText("Yay! Can't wait to be friends! 💙", true);
    triggerReaction('happy');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="rounded-4xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden text-center space-y-7 border border-blue-400/30"
      >
        {/* Background Ambient Glow & Glass Highlights */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-extrabold text-white border border-white/25 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
          <span>Special Companion Offer</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-3 max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            Bring Your Pomify Companion Home Today.
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto font-medium leading-relaxed">
            Includes free magnetic wireless dock, 3 custom sticker packs, 2-year warranty & lifetime software updates.
          </p>
        </div>

        {/* High-Contrast Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3 relative z-10">
          {/* Primary Action Button: Solid White Pill with Navy Text */}
          <button
            onMouseEnter={handlePurchaseHover}
            onClick={() => navigate('/shop/pomify')}
            className="px-8 py-4 rounded-full bg-white text-pomify-navy hover:bg-slate-100 font-black text-base shadow-xl flex items-center gap-3 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-pomify-navy" />
            <span>Order Pomify — $299</span>
          </button>

          {/* Secondary Action Button: Solid Navy Pill with White Text */}
          <button
            onClick={() => navigate('/customize')}
            className="px-8 py-4 rounded-full bg-pomify-navy text-white hover:bg-slate-800 font-extrabold text-base shadow-xl flex items-center gap-3 border border-slate-700 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Open Customize Studio</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>

      </motion.div>
    </section>
  );
};

export default InteractivePurchaseSection;
