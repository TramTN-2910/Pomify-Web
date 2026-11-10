import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import useOrderStore from '../features/shop/store/orderStore';

export const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'all') return true;
    return order.status.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <PageContainer>
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 text-left">
        
        {/* Header */}
        <div className="border-b border-purple-100 pb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-pomify-purple-dark text-xs font-bold mb-2">
              <Package className="w-4 h-4 text-pomify-purple" />
              <span>User Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-pomify-navy tracking-tight">
              My Orders & Companions
            </h1>
          </div>
          <Link to="/shop">
            <Button variant="glass" size="sm" icon={ShoppingBag}>
              Store
            </Button>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-purple-50/80 rounded-2xl border border-purple-100 max-w-md">
          {['all', 'processing', 'delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === tab
                  ? 'bg-white text-pomify-purple-dark shadow-sm border border-purple-100'
                  : 'text-pomify-subtext hover:text-pomify-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white/70 backdrop-blur-xl rounded-4xl border border-purple-100 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-purple-100 text-pomify-purple flex items-center justify-center text-3xl mx-auto">
              📦
            </div>
            <h3 className="text-xl font-bold text-pomify-navy">No Orders Found</h3>
            <p className="text-xs text-pomify-subtext">You haven't placed any orders in this category yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-4xl bg-white/80 backdrop-blur-md border border-purple-100 shadow-soft-glass space-y-5"
              >
                {/* Top Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-50 pb-4">
                  <div>
                    <div className="text-xs text-pomify-subtext font-medium">Order ID: <strong className="text-pomify-navy">{order.id}</strong></div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Placed on {order.date}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                    <span className="font-black text-base text-pomify-navy">${order.total} USD</span>
                  </div>
                </div>

                {/* Status Timeline Progress Bar */}
                <div className="p-4 rounded-3xl bg-purple-50/60 border border-purple-100/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-pomify-navy">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-pomify-purple" /> {order.statusText}
                    </span>
                    <span className="text-pomify-purple">{order.paymentMethod}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-purple-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pomify-purple to-pomify-blue rounded-full transition-all duration-500"
                      style={{ width: order.status === 'Delivered' ? '100%' : '50%' }}
                    />
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-3 bg-white rounded-2xl border border-purple-100">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image || '🤖'}</span>
                        <div>
                          <div className="font-bold text-pomify-navy">{item.name}</div>
                          <div className="flex items-center gap-1.5 text-[10px] text-pomify-subtext mt-0.5">
                            {item.customization?.colorCode && (
                              <span
                                className="w-2 h-2 rounded-full inline-block border border-slate-200 shrink-0"
                                style={{ backgroundColor: item.customization.colorCode }}
                              />
                            )}
                            <span>{item.edition || item.customization?.color || 'Standard Edition'} • Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="font-black text-pomify-navy">${item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address Footer */}
                <div className="text-[11px] text-pomify-subtext pt-2 flex items-center justify-between border-t border-purple-50">
                  <span>Shipping Address: <strong className="text-pomify-navy">{order.shippingInfo.address}, {order.shippingInfo.city}</strong></span>
                  <span className="font-semibold text-pomify-purple">Recipient: {order.shippingInfo.fullName}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </PageContainer>
  );
};

export default OrderHistoryPage;
