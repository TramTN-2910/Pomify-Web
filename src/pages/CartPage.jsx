import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCartStore from '../features/shop/store/cartStore';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 0 : 0; // Free express shipping
  const total = subtotal + shipping;

  return (
    <PageContainer>
      <div className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 text-left">
        
        {/* Header */}
        <div className="border-b border-purple-100 pb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold mb-2">
              <ShoppingBag className="w-4 h-4 text-pomify-purple" />
              <span>Shopping Cart</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-pomify-navy tracking-tight">
              Your Pomify Cart ({cartItems.length})
            </h1>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 p-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="py-16 text-center space-y-5 bg-white/70 backdrop-blur-xl rounded-4xl border border-purple-100 shadow-soft-glass max-w-2xl mx-auto p-8">
            <div className="w-20 h-20 rounded-3xl bg-purple-100 text-pomify-purple flex items-center justify-center text-4xl mx-auto">
              🛒
            </div>
            <h2 className="text-2xl font-black text-pomify-navy">Your Cart is Currently Empty</h2>
            <p className="text-sm text-pomify-subtext max-w-md mx-auto">
              Looks like you haven't added any Pomify companions or custom 3D builds yet.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg" icon={ShoppingBag} onClick={() => navigate('/shop')}>
                Explore Store
              </Button>
              <Button variant="secondary" size="lg" icon={Sparkles} onClick={() => navigate('/customize')}>
                Create Custom Pomify
              </Button>
            </div>
          </div>
        ) : (
          /* Active Cart Items & Checkout Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Itemized List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-purple-100 shadow-soft-glass flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-purple-100/70 border border-purple-200 flex items-center justify-center text-3xl shrink-0">
                      {item.image || '🤖'}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-pomify-navy">{item.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {item.customization?.colorCode && (
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-slate-200 shrink-0"
                            style={{ backgroundColor: item.customization.colorCode }}
                          />
                        )}
                        <div className="text-xs text-pomify-purple font-semibold">{item.edition || item.customization?.color || 'Standard Edition'}</div>
                      </div>
                      <div className="text-sm font-black text-pomify-navy mt-1">${item.price} USD</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-purple-50">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2.5 bg-purple-50/80 border border-purple-100 rounded-full px-3 py-1">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="p-1 text-pomify-navy hover:text-pomify-purple transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-extrabold text-xs text-pomify-navy w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="p-1 text-pomify-navy hover:text-pomify-purple transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Item Total Price */}
                    <div className="font-black text-base text-pomify-navy text-right">
                      ${item.price * item.quantity}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right 4 Cols: Order Summary Card */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-purple-100 shadow-soft-glass space-y-5">
              <h3 className="font-extrabold text-lg text-pomify-navy border-b border-purple-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-pomify-subtext">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-pomify-navy">${subtotal} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-purple-100 text-sm font-black text-pomify-navy">
                  <span>Estimated Total</span>
                  <span className="text-lg text-pomify-purple-dark">${total} USD</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-cute-float"
                icon={ArrowRight}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <div className="pt-2 space-y-2 text-[11px] text-pomify-subtext">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-pomify-purple" />
                  <span>Free Express Worldwide Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>2-Year Official Pomify Care Included</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </PageContainer>
  );
};

export default CartPage;
