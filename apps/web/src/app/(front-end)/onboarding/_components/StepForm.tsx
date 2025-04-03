'use client';

import { useAppSelector } from '@/hooks/storeHook';
import AdditionalInfoForm from './steps/AdditionalInfoForm';
import BasicInformationForm from './steps/BasicInformationForm';
import FarmerDetailsForm from './steps/FarmerDetailsForm';
import OnboardingSummary from './steps/Summary';

const StepForm = ({ farmerId }: { farmerId: string }) => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);

  function renderFormByStep(step: number) {
    switch (step) {
      case 0:
        return <BasicInformationForm  />;
      case 1:
        return <FarmerDetailsForm />;
      case 2:
        return <AdditionalInfoForm />;
      case 3:
        return <OnboardingSummary farmerId={farmerId} />;

      default:
        return null;
    }
  }

  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
