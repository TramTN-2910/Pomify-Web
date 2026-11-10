import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCustomizerStore, { BASE_PRICE } from '../store/customizerStore';
import useRobotStore from '../../robot-companion/store/robotStore';
import useCartStore from '../../shop/store/cartStore';
import Button from '../../../components/ui/Button';

export const LiveSpecPreview = ({ onSaveTrigger }) => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const {
    color,
    robotName,
    getTotalPrice,
    saveDesign,
  } = useCustomizerStore();

  const { setBubbleText, triggerReaction } = useRobotStore();

  const totalPrice = getTotalPrice();

  const handleSave = () => {
    saveDesign();
    setBubbleText("Yep! Your custom design is saved! 💙", true);
    triggerReaction('happy');
    if (onSaveTrigger) onSaveTrigger();
  };

  const handleOrderCustomBuild = () => {
    saveDesign();
    setBubbleText("Yay! Your custom order has been placed! 🚚", true);
    triggerReaction('happy');

    addToCart({
      id: `custom-${Date.now()}`,
      name: `Pomify Robot — ${robotName || 'Pomify Custom'}`,
      edition: `${color.name} Edition`,
      price: totalPrice,
      quantity: 1,
      image: '🤖',
      customization: {
        color: color.name,
        colorCode: color.bodyColor,
        texture: color.texture,
        accessory: 'Standard CAD Shell',
        expression: 'Standard Display',
      },
    });

    navigate('/checkout');
  };

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-5 shadow-soft-glass">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-100 pb-3 mb-4">
        <div>
          <h3 className="text-base font-extrabold text-pomify-navy">Order Summary</h3>
          <p className="text-xs text-pomify-subtext">Custom desk companion configuration</p>
        </div>
      </div>

      {/* Selected Overview */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        
        {/* Identity card */}
        <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100/80 space-y-2">
          <div className="text-[10px] uppercase font-bold text-pomify-purple tracking-wider">Designation</div>
          <div className="text-base font-extrabold text-pomify-navy">{robotName || 'Pomify Custom'}</div>
          
          <div className="flex items-center gap-2 pt-1 border-t border-blue-100/70">
            <span
              className="w-3.5 h-3.5 rounded-full inline-block border border-slate-300 shadow-sm shrink-0"
              style={{ backgroundColor: color.bodyColor }}
            />
            <span className="text-xs font-bold text-pomify-navy">{color.name} Edition</span>
          </div>
        </div>

        {/* Perks & Warranty */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-pomify-subtext">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Includes 2-Year Official Hardware Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-pomify-subtext">
            <Heart className="w-4 h-4 text-pink-500 shrink-0" />
            <span>Free Worldwide Express Shipping</span>
          </div>
        </div>

      </div>

      {/* Pricing Footer & Actions */}
      <div className="pt-4 mt-2 border-t border-purple-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs text-pomify-subtext">Total Price</div>
            <div className="text-[10px] text-emerald-600 font-bold">Base ${BASE_PRICE} + Free Color Option</div>
          </div>
          <div className="text-2xl font-black text-pomify-navy tracking-tight">
            ${totalPrice}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="pink"
            size="lg"
            className="w-full shadow-cute-float"
            onClick={handleOrderCustomBuild}
          >
            Order
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs text-pomify-navy border-blue-200 hover:bg-blue-50"
            onClick={handleSave}
          >
            Save Design
          </Button>
        </div>

      </div>
    </div>
  );
};

export default LiveSpecPreview;
