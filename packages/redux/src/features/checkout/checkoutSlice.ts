import { createSlice } from '@reduxjs/toolkit';
import { ICheckoutFormData } from '@repo/types';

type initialStateType = {
  currentStep: number;
  checkoutFormData: ICheckoutFormData;
};

const initialState: initialStateType = {
  currentStep: 0,
  checkoutFormData: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    country: '',
    postalCode: '',
    shippingCost: '',
    paymentMethod: '',
    userId: '',
  },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCurrentStep(state, action: { payload: number }) {
      state.currentStep = action.payload;
    },

    setCheckoutFormData(
      state,
      action: { payload: Partial<ICheckoutFormData> }
    ) {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentStep, setCheckoutFormData } = checkoutSlice.actions;

export default checkoutSlice.reducer;
