'use client';

import { useAppSelector } from '@/hooks/storeHook';
import OrderSummary from './steps/OrderSummary';
import PaymentMethodForm from './steps/PaymentMethodForm';
import PersonalDetailsForm from './steps/PersonalDetailsForm';
import ShippingDetailsForm from './steps/ShippingDetailsForm';

const StepForm = () => {
  const currentStep = useAppSelector((state) => state.checkout.currentStep);

  function renderFormByStep(step: number) {
    switch (step) {
      case 0:
        return <PersonalDetailsForm />;
      case 1:
        return <ShippingDetailsForm />;
      case 2:
        return <PaymentMethodForm />;
      case 3:
        return <OrderSummary />;
      default:
        return null;
    }
  }

  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
