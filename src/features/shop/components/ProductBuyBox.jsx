import React, { useState } from 'react';
import { Star, ShoppingBag, Zap, Check, ShieldCheck, Truck, Plus, Minus, Heart, Sparkles } from 'lucide-react';
import Button from '../../../components/ui/Button';
import useCartStore from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

export const ProductBuyBox = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const [selectedEdition, setSelectedEdition] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const editions = [
    {
      id: 'standard',
      name: 'Standard Edition',
      price: 299,
      desc: 'Pomify Robot + Magnetic Wireless Dock + Pastel Cable',
    },
    {
      id: 'creator',
      name: 'Creator Kit Bundle',
      price: 349,
      desc: 'Standard Edition + 3 Accessory Attachments + Sticker Set',
      badge: 'Popular',
    },
    {
      id: 'pro',
      name: 'Pro Companion Suite',
      price: 399,
      desc: 'Creator Bundle + Extended 3-Year Care + Pro Voice Pack',
    },
  ];

  const currentEdition = editions.find((e) => e.id === selectedEdition) || editions[0];

  const handleAddToCart = () => {
    addToCart({
      id: `pomify-${selectedEdition}`,
      name: `Pomify Robot (${currentEdition.name})`,
      edition: currentEdition.name,
      price: currentEdition.price,
      quantity: quantity,
      image: '🤖',
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Title & Ratings */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold">
            Flagship Hardware
          </span>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> In Stock
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-pomify-navy tracking-tight">
          Pomify Smart AI Companion
        </h1>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="font-bold text-pomify-navy">4.9 / 5.0</span>
          <span className="text-pomify-subtext">(1,248 verified reviews)</span>
        </div>
      </div>

      {/* Pricing Display */}
      <div className="p-4 rounded-3xl bg-purple-50/60 border border-purple-100 flex items-baseline justify-between">
        <div>
          <div className="text-xs text-pomify-subtext font-medium">Special Edition Price</div>
          <div className="text-3xl font-black text-pomify-navy tracking-tight">
            ${currentEdition.price} <span className="text-sm font-semibold text-slate-400">USD</span>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          Free Shipping Included
        </span>
      </div>

      {/* Edition Selector */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-pomify-navy/80">
          Select Edition:
        </label>
        <div className="space-y-2.5">
          {editions.map((edition) => {
            const isSelected = selectedEdition === edition.id;
            return (
              <button
                key={edition.id}
                onClick={() => setSelectedEdition(edition.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-pomify-purple bg-purple-50/80 ring-2 ring-pomify-purple/30'
                    : 'border-slate-200 bg-white hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-pomify-navy">{edition.name}</span>
                    {edition.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-pomify-purple text-white text-[10px] font-bold shrink-0 shadow-sm">
                        {edition.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-black text-sm text-pomify-purple shrink-0">${edition.price}</div>
                </div>
                <p className="text-xs text-pomify-subtext mt-1">{edition.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-pomify-navy">Quantity:</div>
          <div className="flex items-center gap-3 bg-white border border-purple-200 rounded-full px-3 py-1.5 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-pomify-navy hover:text-pomify-purple transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-sm text-pomify-navy w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-pomify-navy hover:text-pomify-purple transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="lg"
            icon={ShoppingBag}
            onClick={handleAddToCart}
            className="flex-1 shadow-cute-float"
          >
            Add to Cart
          </Button>

          <Button
            variant="pink"
            size="lg"
            icon={Zap}
            onClick={() => {
              handleAddToCart();
              navigate('/customize');
            }}
            className="flex-1 shadow-cute-float"
          >
            Customize First
          </Button>
        </div>

        {/* Floating Top-Right Notification Toast */}
        {addedToast && (
          <div className="fixed top-24 right-6 z-50 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-purple-100 shadow-2xl flex items-center gap-4 animate-bounce text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl shrink-0">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-pomify-navy">Added to Shopping Cart!</div>
              <div className="text-[11px] text-pomify-subtext">{quantity}x Pomify ({currentEdition.name})</div>
            </div>
            <button
              onClick={() => navigate('/cart')}
              className="px-3.5 py-2 rounded-2xl bg-pomify-purple text-white text-xs font-bold shadow-sm hover:bg-pomify-purple-dark transition-colors"
            >
              View Cart →
            </button>
          </div>
        )}
      </div>

      {/* Bullet Guarantees */}
      <div className="pt-4 border-t border-purple-100 grid grid-cols-2 gap-3 text-xs text-pomify-subtext font-medium">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-pomify-purple" />
          <span>Ships within 24-48 Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>2-Year Comprehensive Care</span>
        </div>
      </div>

    </div>
  );
};

export default ProductBuyBox;
