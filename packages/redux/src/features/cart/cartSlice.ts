import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@repo/types';

type CartState = CartItem[];

const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  return [];
};

const initialState: CartState = getCartFromLocalStorage();

const reducers = {
  addToCart: (state, action: PayloadAction<CartItem>) => {
    const { id, imageUrl, qty, salePrice, title, vendorId } = action.payload;
    const existingItem = state.find((item) => item.id === id);

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      const newItem = { id, title, salePrice, qty: 1, imageUrl, vendorId };
      state.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(state));
  },
  removeFromCart(state, action: PayloadAction<string>) {
    const newState = state.filter((item) => item.id !== action.payload);
    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  },
  clearCart() {
    localStorage.removeItem('cart');
    return [];
  },
  incrementQty(state, action: PayloadAction<string>) {
    const item = state.find((item) => item.id === action.payload);
    if (item) {
      item.qty += 1;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
  decrementQty(state, action: PayloadAction<string>) {
    const item = state.find((item) => item.id === action.payload);
    if (item && item.qty > 1) {
      item.qty -= 1;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers,
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} = cartSlice.actions;

export default cartSlice.reducer;
