import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectCart = (state: RootState) => state.cart;


export const selectCartTotalQuantity = createSelector(
  [selectCart],
  (cart) => (cart ? cart.reduce((acc, item) => acc + item.qty, 0) : 0)
);

export const selectCartTotalLength = createSelector(
  [selectCart],
  (cart) => (cart ? cart.length : 0)
);
