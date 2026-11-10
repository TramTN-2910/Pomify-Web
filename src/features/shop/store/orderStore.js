import { create } from 'zustand';

const LOCAL_STORAGE_KEY = 'pomify_customer_orders';

const getInitialOrders = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // Fallback
  }

  return [
    {
      id: 'POM-2026-8829',
      orderCode: 'POM-2026-8829',
      date: '2026-09-08',
      status: 'Delivered', // Processing, Shipping, Delivered, Cancelled
      statusText: 'Delivered to your doorstep 🎉',
      total: 349,
      paymentMethod: 'VietQR Bank Transfer',
      shippingInfo: {
        fullName: 'Alex Companion',
        phone: '0901234567',
        email: 'alex@pomify.ai',
        address: '123 Smart Vibe Street, District 1, Ho Chi Minh City',
        city: 'Ho Chi Minh City',
      },
      items: [
        {
          id: 'pomify-creator',
          name: 'Pomify Robot (Creator Kit Bundle)',
          edition: 'Creator Kit Bundle',
          price: 349,
          quantity: 1,
          image: '🤖',
        },
      ],
    },
  ];
};

export const useOrderStore = create((set, get) => ({
  orders: getInitialOrders(),

  addOrder: (newOrderData) => set((state) => {
    const orderId = newOrderData.id || `POM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = {
      id: orderId,
      orderCode: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      statusText: 'Order confirmed & being prepared 🚚',
      ...newOrderData,
    };
    const updatedOrders = [order, ...state.orders];
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedOrders));
    } catch (e) {
      console.warn('LocalStorage save warning');
    }
    return { orders: updatedOrders };
  }),

  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id || order.orderCode === id);
  },
}));

export default useOrderStore;

