import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import useRobotStore from '../../robot-companion/store/robotStore';

export const InteractivePurchaseSection = () => {
  const navigate = useNavigate();
  const { setBubbleText, triggerReaction } = useRobotStore();

  const handlePurchaseHover = () => {
    setBubbleText("Yay! Can't wait to be friends! 💜", true);
    triggerReaction('happy');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="rounded-4xl bg-gradient-to-r from-pomify-purple via-purple-600 to-pomify-blue p-8 sm:p-12 text-white shadow-cute-float relative overflow-hidden text-center space-y-6">
        
        {/* Background Accent Shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
          <Heart className="w-3.5 h-3.5 fill-white text-white" />
          <span>Special Companion Offer</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
          Bring Your Pomify Companion Home Today.
        </h2>

        <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto">
          Includes free magnetic wireless dock, 3 custom sticker packs, 2-year warranty & lifetime software updates.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            variant="secondary"
            size="lg"
            icon={ShoppingBag}
            onMouseEnter={handlePurchaseHover}
            onClick={() => navigate('/shop/pomify')}
            className="shadow-xl"
          >
            Order Pomify — $299
          </Button>

          <Button
            variant="glass"
            size="lg"
            icon={ArrowRight}
            onClick={() => navigate('/customize')}
            className="text-white hover:text-pomify-navy border-white/40"
          >
            Open Customize Studio
          </Button>
        </div>

      </div>
    </section>
  );
};

export default InteractivePurchaseSection;
