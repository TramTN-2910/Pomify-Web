import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ShoppingBag, ShieldCheck, Heart, RefreshCw } from 'lucide-react';
import useCustomizerStore, { BASE_PRICE } from '../store/customizerStore';
import useRobotStore from '../../robot-companion/store/robotStore';
import Button from '../../../components/ui/Button';

export const LiveSpecPreview = ({ onSaveTrigger }) => {
  const {
    color,
    finish,
    expression,
    accessories,
    personality,
    robotName,
    getTotalPrice,
    isSaved,
    saveDesign,
  } = useCustomizerStore();

  const { setBubbleText, triggerReaction } = useRobotStore();

  const totalPrice = getTotalPrice();

  const handleSave = () => {
    saveDesign();
    setBubbleText("Yep. That's me! 💜", true);
    triggerReaction('happy');
    if (onSaveTrigger) onSaveTrigger();
  };

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl border border-purple-100 rounded-3xl p-5 shadow-soft-glass">
      
      {/* Live Spec Title */}
      <div className="flex items-center justify-between border-b border-purple-100 pb-3 mb-4">
        <div>
          <h3 className="text-base font-extrabold text-pomify-navy">Custom Specs</h3>
          <p className="text-xs text-pomify-subtext">Real-time configuration preview</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-[11px] font-bold">
          Live Build
        </span>
      </div>

      {/* Itemized Breakdown */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        
        {/* Robot Name & Personality */}
        <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100/80">
          <div className="text-[10px] uppercase font-bold text-pomify-purple tracking-wider">Custom Identity</div>
          <div className="text-sm font-extrabold text-pomify-navy mt-0.5">{robotName}</div>
          <div className="text-xs text-pomify-subtext mt-0.5 font-medium">{personality.name} Edition</div>
        </div>

        {/* Color & Material */}
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
          <span className="text-pomify-subtext">Body Color</span>
          <span className="font-bold text-pomify-navy flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color.bodyColor }} />
            {color.name}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
          <span className="text-pomify-subtext">Finish</span>
          <span className="font-bold text-pomify-navy">{finish.name}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
          <span className="text-pomify-subtext">Face Expression</span>
          <span className="font-bold text-pomify-navy flex items-center gap-1">
            {expression.icon} {expression.name}
          </span>
        </div>

        {/* Accessories breakdown */}
        <div>
          <div className="text-xs text-pomify-subtext mb-1.5">Attached Accessories ({accessories.length})</div>
          {accessories.length === 0 ? (
            <div className="text-xs text-slate-400 italic p-2 bg-slate-50/60 rounded-xl">No extra accessories selected</div>
          ) : (
            <div className="space-y-1.5">
              {accessories.map((acc) => (
                <div key={acc.id} className="flex items-center justify-between text-xs p-2 bg-white rounded-xl border border-purple-100">
                  <span className="font-semibold text-pomify-navy flex items-center gap-1.5">
                    <span>{acc.icon}</span> {acc.name}
                  </span>
                  <span className="font-bold text-pomify-purple">+${acc.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Perks / Warranty info */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-pomify-subtext">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Includes 2-Year Full Pomify Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-pomify-subtext">
            <Heart className="w-4 h-4 text-pink-500" />
            <span>Free Express Worldwide Shipping</span>
          </div>
        </div>

      </div>

      {/* Pricing Footer & Action */}
      <div className="pt-4 mt-2 border-t border-purple-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs text-pomify-subtext">Calculated Total</div>
            <div className="text-[10px] text-emerald-600 font-bold">Base ${BASE_PRICE} + Customizations</div>
          </div>
          <div className="text-2xl font-black text-pomify-navy tracking-tight">
            ${totalPrice}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={isSaved ? 'pink' : 'primary'}
          size="lg"
          className="w-full shadow-cute-float"
          icon={isSaved ? CheckCircle2 : Sparkles}
          onClick={handleSave}
        >
          {isSaved ? 'Design Saved!' : 'Save Design'}
        </Button>
      </div>

    </div>
  );
};

export default LiveSpecPreview;
