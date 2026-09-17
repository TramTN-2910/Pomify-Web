import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, Zap, Check, ShieldCheck, Truck, Plus, Minus, Heart, Sparkles, AlertTriangle, XCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import useCartStore from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { fetchPublicProductsApi } from '../../../services/api';

export const ProductBuyBox = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const [selectedEdition, setSelectedEdition] = useState('creator');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const prods = await fetchPublicProductsApi();
        if (prods && Array.isArray(prods)) {
          setInventoryList(prods);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadProducts();
  }, []);

  const getStockForEdition = (sku, defaultStock) => {
    const item = inventoryList.find((p) => p.sku === sku || p.name?.toLowerCase().includes(sku.toLowerCase()));
    if (item !== undefined && item.stock !== undefined) {
      return item.stock;
    }
    return defaultStock;
  };

  const editions = [
    {
      id: 'standard',
      name: 'Standard Edition',
      sku: 'POM-BOT-STD',
      price: 299,
      desc: 'Pomify Robot + Magnetic Wireless Dock + Pastel Cable',
      stock: getStockForEdition('POM-BOT-STD', 45),
    },
    {
      id: 'creator',
      name: 'Creator Kit Bundle',
      sku: 'POM-BOT-CREATOR',
      price: 349,
      desc: 'Standard Edition + 3 Accessory Attachments + Sticker Set',
      badge: 'Popular',
      stock: getStockForEdition('POM-BOT-CREATOR', 25),
    },
    {
      id: 'pro',
      name: 'Pro Companion Suite',
      sku: 'POM-BOT-PRO',
      price: 399,
      desc: 'Creator Bundle + Extended 3-Year Care + Pro Voice Pack',
      badge: 'Sold Out',
      stock: getStockForEdition('POM-BOT-PRO', 0),
    },
  ];

  const currentEdition = editions.find((e) => e.id === selectedEdition) || editions[0];
  const isSoldOut = currentEdition.stock <= 0;

  const handleAddToCart = () => {
    if (isSoldOut) {
      alert('This edition is currently Sold Out!');
      return;
    }

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
          {isSoldOut ? (
            <span className="text-xs text-rose-600 font-bold flex items-center gap-1 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Out of Stock (0 Left)
            </span>
          ) : (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> In Stock ({currentEdition.stock} Available)
            </span>
          )}
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
        {isSoldOut ? (
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Sold Out
          </span>
        ) : (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            Free Shipping Included
          </span>
        )}
      </div>

      {/* Edition Selector */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-pomify-navy/80">
          Select Edition:
        </label>
        <div className="space-y-2.5">
          {editions.map((edition) => {
            const isSelected = selectedEdition === edition.id;
            const editionSoldOut = edition.stock <= 0;
            return (
              <button
                key={edition.id}
                onClick={() => setSelectedEdition(edition.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all relative ${
                  editionSoldOut
                    ? 'opacity-75 bg-slate-50/80 border-slate-200'
                    : isSelected
                    ? 'border-pomify-purple bg-purple-50/80 ring-2 ring-pomify-purple/30'
                    : 'border-slate-200 bg-white hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${editionSoldOut ? 'text-slate-500 line-through' : 'text-pomify-navy'}`}>
                      {edition.name}
                    </span>
                    {editionSoldOut ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shrink-0 shadow-sm">
                        Sold Out
                      </span>
                    ) : edition.badge ? (
                      <span className="px-2 py-0.5 rounded-full bg-pomify-purple text-white text-[10px] font-bold shrink-0 shadow-sm">
                        {edition.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className={`font-black text-sm shrink-0 ${editionSoldOut ? 'text-slate-400' : 'text-pomify-purple'}`}>
                    ${edition.price}
                  </div>
                </div>
                <p className="text-xs text-pomify-subtext mt-1">{edition.desc}</p>
                {editionSoldOut && (
                  <div className="text-[10px] font-bold text-rose-500 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Out of Stock — Restocking soon
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-pomify-navy">Quantity:</div>
          <div className={`flex items-center gap-3 bg-white border border-purple-200 rounded-full px-3 py-1.5 shadow-sm ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isSoldOut}
              className="p-1 text-pomify-navy hover:text-pomify-purple transition-colors disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-sm text-pomify-navy w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              disabled={isSoldOut}
              className="p-1 text-pomify-navy hover:text-pomify-purple transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={isSoldOut ? 'secondary' : 'primary'}
            size="lg"
            icon={isSoldOut ? XCircle : ShoppingBag}
            disabled={isSoldOut}
            onClick={handleAddToCart}
            className={`flex-1 shadow-cute-float ${isSoldOut ? 'opacity-60 bg-slate-300 border-slate-300 text-slate-600 cursor-not-allowed' : ''}`}
          >
            {isSoldOut ? 'Sold Out (Out of Stock)' : 'Add to Cart'}
          </Button>

          <Button
            variant={isSoldOut ? 'secondary' : 'pink'}
            size="lg"
            icon={Zap}
            disabled={isSoldOut}
            onClick={() => {
              if (isSoldOut) return;
              handleAddToCart();
              navigate('/customize');
            }}
            className={`flex-1 shadow-cute-float ${isSoldOut ? 'opacity-60 bg-slate-200 text-slate-500 cursor-not-allowed' : ''}`}
          >
            {isSoldOut ? 'Sold Out' : 'Customize First'}
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

