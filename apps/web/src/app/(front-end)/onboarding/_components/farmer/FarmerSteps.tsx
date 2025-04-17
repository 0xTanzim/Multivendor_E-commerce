'use client';

import AdditionalInfoForm from '@/app/(front-end)/onboarding/_components/steps/farmer/AdditionalInfoForm';
import BasicInformationForm from '@/app/(front-end)/onboarding/_components/steps/farmer/BasicInformationForm';
import FarmerDetailsForm from '@/app/(front-end)/onboarding/_components/steps/farmer/FarmerDetailsForm';
import FarmerSummary from '@/app/(front-end)/onboarding/_components/steps/farmer/Summary';
import { useAppSelector } from '@/hooks/storeHook';

const FarmerSteps = ({ farmerId }: { farmerId: string }) => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);

  function renderFormByStep(step: number) {
    switch (step) {
      case 0:
        return <BasicInformationForm />;
      case 1:
        return <FarmerDetailsForm />;
      case 2:
        return <AdditionalInfoForm />;
      case 3:
        return <FarmerSummary farmerId={farmerId} />;
      default:
        return null;
    }
  }

  return <div>{renderFormByStep(currentStep)}</div>;
};

export default FarmerSteps;
