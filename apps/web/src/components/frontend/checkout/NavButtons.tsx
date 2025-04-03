'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setOnboardingCurrentStep } from '@repo/redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavButtons = () => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between mt-4 items-center">
      {currentStep > 0 && (
        <button
          type="button"
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          onClick={() => dispatch(setOnboardingCurrentStep(currentStep - 1))}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Previous</span>
        </button>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4 mr-2" />
      </button>
    </div>
  );
};

export default NavButtons;
