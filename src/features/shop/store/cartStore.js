import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  addToCart: (product) => set((state) => {
    const existingIndex = state.cartItems.findIndex((item) => item.id === product.id && item.edition === product.edition);
    if (existingIndex > -1) {
      const updated = [...state.cartItems];
      updated[existingIndex].quantity += product.quantity || 1;
      return { cartItems: updated, isCartOpen: true };
    }
    return {
      cartItems: [...state.cartItems, { ...product, quantity: product.quantity || 1 }],
      isCartOpen: true,
    };
  }),

  removeFromCart: (index) => set((state) => ({
    cartItems: state.cartItems.filter((_, i) => i !== index),
  })),

  updateQuantity: (index, delta) => set((state) => {
    const updated = [...state.cartItems];
    const newQty = updated[index].quantity + delta;
    if (newQty <= 0) {
      return { cartItems: state.cartItems.filter((_, i) => i !== index) };
    }
    updated[index].quantity = newQty;
    return { cartItems: updated };
  }),

  getCartCount: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getCartTotal: () => {
    return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
