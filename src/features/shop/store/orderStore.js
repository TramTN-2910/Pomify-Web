import { create } from 'zustand';

export const useOrderStore = create((set, get) => ({
  orders: [
    {
      id: 'POM-88291',
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
  ],

  addOrder: (newOrderData) => set((state) => {
    const orderId = `POM-${Math.floor(10000 + Math.random() * 90000)}`;
    const order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      statusText: 'Order confirmed & being prepared 🚚',
      ...newOrderData,
    };
    return {
      orders: [order, ...state.orders],
    };
  }),

  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id);
  },
}));

export default useOrderStore;
