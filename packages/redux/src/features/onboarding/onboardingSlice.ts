import { createSlice } from '@reduxjs/toolkit';
import { Farmer } from '@repo/types';

type OnboardingState = {
  currentStep: number;
  onboardingFormData: Partial<Farmer>;
};

const initialState: OnboardingState = {
  currentStep: 0,
  onboardingFormData: {
    userId: '',
  },
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingCurrentStep(state, action: { payload: number }) {
      state.currentStep = action.payload;
    },

    setOnboardingFormData(
      state,
      action: { payload: Partial<OnboardingState> }
    ) {
      state.onboardingFormData = {
        ...state.onboardingFormData,
        ...action.payload,
      };
    },
  },
});

export const { setOnboardingCurrentStep, setOnboardingFormData } =
  onboardingSlice.actions;

export const selectCurrentStep = (state: any) => state.onboarding.currentStep;
export const selectOnboardingFormData = (state: any) =>
  state.onboarding.onboardingFormData;

export default onboardingSlice.reducer;
