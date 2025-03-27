import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectCart = (state: RootState) => state.cart;

export const selectCartTotalQuantity = createSelector([selectCart], (cart) =>
  cart ? cart.reduce((acc, item) => acc + item.qty, 0) : 0
);

export const selectCartTotalLength = createSelector([selectCart], (cart) =>
  cart ? cart.length : 0
);

export const selectCartDetails = createSelector([selectCart], (cart) => {
  if (!cart || cart.length === 0) {
    return {
      cartLength: 0,
      totalPrice: 0,
      totalQuantity: 0,
      cartItems: [],
    };
  }

  const totalQuantity = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart
    .reduce((acc, item) => acc + item.salePrice * item.qty, 0)
    .toFixed(2);
  const cartLength = cart.length;

  return {
    cartLength,
    totalPrice,
    totalQuantity,
    cartItems: cart,
  };
});
