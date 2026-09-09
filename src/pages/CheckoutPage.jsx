import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, QrCode, Banknote, Sparkles, ArrowRight, Lock, Check } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCartStore from '../features/shop/store/cartStore';
import useOrderStore from '../features/shop/store/orderStore';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Ho Chi Minh City',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, qr, card
  const [showQRModal, setShowQRModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required shipping fields!");
      return;
    }

    if (paymentMethod === 'qr') {
      setShowQRModal(true);
      return;
    }

    processOrder();
  };

  const processOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const orderPayload = {
        total: total,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'qr' ? 'VietQR Bank Transfer' : 'Credit Card (Visa/Mastercard)',
        shippingInfo: formData,
        items: [...cartItems],
      };
      
      addOrder(orderPayload);
      clearCart();
      setIsSubmitting(false);
      setShowQRModal(false);
      setOrderSuccess(true);
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 text-left">
        
        {/* Header */}
        <div className="border-b border-purple-100 pb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-pomify-purple" />
              <span>Secure Checkout</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-pomify-navy tracking-tight">
              Complete Your Order
            </h1>
          </div>
          <div className="text-xs text-pomify-subtext flex items-center gap-1 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {orderSuccess ? (
          /* SUCCESS ORDER SCREEN */
          <div className="py-16 text-center space-y-6 bg-white/80 backdrop-blur-xl rounded-4xl border border-purple-100 shadow-soft-glass max-w-2xl mx-auto p-8 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-md">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-pomify-navy">Thank You for Your Order!</h2>
              <p className="text-sm text-pomify-subtext max-w-md mx-auto">
                We have sent a confirmation email to <strong className="text-pomify-navy">{formData.email}</strong> via <span className="text-pomify-purple font-bold">oroka150@gmail.com</span>.
              </p>
            </div>

            <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 max-w-md mx-auto text-xs text-pomify-navy space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-pomify-subtext">Order Status:</span>
                <span className="font-bold text-emerald-600">Confirmed & Processing 🚚</span>
              </div>
              <div className="flex justify-between">
                <span className="text-pomify-subtext">Payment Method:</span>
                <span className="font-bold">{paymentMethod === 'cod' ? 'COD' : paymentMethod === 'qr' ? 'VietQR' : 'Credit Card'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-pomify-subtext">Total Amount:</span>
                <span className="font-extrabold text-pomify-purple-dark">${total} USD</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg" icon={CheckCircle2} onClick={() => navigate('/orders')}>
                View Order History
              </Button>
              <Link to="/shop">
                <Button variant="secondary" size="lg">
                  Return to Store
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM & SUMMARY */
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Shipping Info & Payment Selection */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Address Card */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-purple-100 shadow-soft-glass space-y-4">
                <h3 className="text-lg font-bold text-pomify-navy flex items-center gap-2 border-b border-purple-50 pb-3">
                  <Truck className="w-5 h-5 text-pomify-purple" /> Shipping Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-pomify-navy mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Companion"
                      className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-medium focus:outline-none focus:border-pomify-purple"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-pomify-navy mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@pomify.ai"
                      className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-medium focus:outline-none focus:border-pomify-purple"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-pomify-navy mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="090 123 4567"
                      className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-medium focus:outline-none focus:border-pomify-purple"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-pomify-navy mb-1">City / Region *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-medium focus:outline-none focus:border-pomify-purple"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-pomify-navy mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House number, Street name, District"
                      className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-pomify-navy font-medium focus:outline-none focus:border-pomify-purple"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-purple-100 shadow-soft-glass space-y-4">
                <h3 className="text-lg font-bold text-pomify-navy flex items-center gap-2 border-b border-purple-50 pb-3">
                  <CreditCard className="w-5 h-5 text-pomify-purple" /> Payment Method
                </h3>

                <div className="space-y-3">
                  {/* Option 1: COD */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-pomify-purple bg-purple-50/80 ring-2 ring-pomify-purple/30'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 accent-pomify-purple cursor-pointer"
                      />
                      <div className="p-2.5 rounded-xl bg-purple-100 text-pomify-purple-dark">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-pomify-navy">Cash on Delivery (COD)</div>
                        <div className="text-xs text-pomify-subtext">Pay cash upon robot arrival at your door</div>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: VietQR */}
                  <label
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'qr'
                        ? 'border-pomify-purple bg-purple-50/80 ring-2 ring-pomify-purple/30'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'qr'}
                        onChange={() => setPaymentMethod('qr')}
                        className="w-4 h-4 accent-pomify-purple cursor-pointer"
                      />
                      <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-pomify-navy">VietQR Bank Transfer</div>
                        <div className="text-xs text-pomify-subtext">Scan QR code via MBBank, Vietcombank, Techcombank</div>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Card */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-pomify-purple bg-purple-50/80 ring-2 ring-pomify-purple/30'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 accent-pomify-purple cursor-pointer"
                      />
                      <div className="p-2.5 rounded-xl bg-pink-100 text-pink-600">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-pomify-navy">Visa / Mastercard / JCB</div>
                        <div className="text-xs text-pomify-subtext">Instant international card checkout</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Items & Final Order Summary */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-purple-100 shadow-soft-glass space-y-5">
              <h3 className="font-extrabold text-lg text-pomify-navy border-b border-purple-100 pb-3">
                Items Summary ({cartItems.length})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2.5 bg-purple-50/50 rounded-2xl border border-purple-100/60">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.image || '🤖'}</span>
                      <div>
                        <div className="font-bold text-pomify-navy">{item.name}</div>
                        <div className="text-[10px] text-pomify-subtext">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-black text-pomify-navy">${item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 text-xs pt-3 border-t border-purple-100">
                <div className="flex justify-between text-pomify-subtext">
                  <span>Subtotal</span>
                  <span className="font-bold text-pomify-navy">${subtotal} USD</span>
                </div>
                <div className="flex justify-between text-pomify-subtext">
                  <span>Worldwide Express Shipping</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-purple-100 text-sm font-black text-pomify-navy">
                  <span>Total Amount</span>
                  <span className="text-xl text-pomify-purple-dark">${total} USD</span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full shadow-cute-float"
                icon={Sparkles}
              >
                {isSubmitting ? 'Processing Order...' : `Place Order — $${total}`}
              </Button>
            </div>

          </form>
        )}

        {/* VietQR Modal Test */}
        {showQRModal && (
          <div className="fixed inset-0 z-50 bg-pomify-navy/50 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-4xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl animate-scale-up">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <h3 className="font-extrabold text-lg text-pomify-navy">VietQR Bank Transfer</h3>
                <button onClick={() => setShowQRModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
              </div>

              <div className="p-4 rounded-3xl bg-purple-50 border border-purple-100 space-y-3">
                <div className="w-48 h-48 rounded-2xl bg-white border border-purple-200 mx-auto flex flex-col items-center justify-center p-2 shadow-inner">
                  {/* Fake QR Graphic */}
                  <QrCode className="w-32 h-32 text-pomify-navy" />
                  <span className="text-[10px] font-bold text-pomify-purple uppercase tracking-widest mt-1">MBBANK • POMIFY STORE</span>
                </div>

                <div className="text-xs text-left space-y-1 text-pomify-navy font-medium">
                  <div><strong>Account Number:</strong> 8829199999</div>
                  <div><strong>Account Name:</strong> POMIFY CO LTD</div>
                  <div><strong>Amount:</strong> ${total} USD</div>
                  <div><strong>Ref Note:</strong> POM-{Math.floor(1000 + Math.random() * 9000)}</div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={processOrder}
              >
                I Have Completed Transfer
              </Button>
            </div>
          </div>
        )}

      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
