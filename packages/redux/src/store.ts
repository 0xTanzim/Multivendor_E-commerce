import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import checkoutReducer from './features/checkout/checkoutSlice';
import onboardingReducer from './features/onboarding/onboardingSlice';
import rbacReducer from './features/rbac/rbacSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      checkout: checkoutReducer,
      onboarding: onboardingReducer,
      rbac: rbacReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
