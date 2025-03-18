import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { CartItem } from '@repo/types';

type CartState = CartItem[];

const initialState: CartState = [];

export const cartSlice: Slice<CartState> = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, imageUrl, qty, salePrice, title } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.push({ id, imageUrl, qty, salePrice, title });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCart() {
      return [];
    },
    incrementQty(state, action: PayloadAction<string>) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.qty += 1;
      }
    },
    decrementQty(state, action: PayloadAction<string>) {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} = cartSlice.actions;

export default cartSlice.reducer;
