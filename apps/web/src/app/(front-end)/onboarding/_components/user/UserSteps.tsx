'use client';

import UserBasicInfoForm from '@/app/(front-end)/onboarding/_components/steps/user/UserBasicInfoForm';
import UserPreferencesForm from '@/app/(front-end)/onboarding/_components/steps/user/UserPreferencesForm';
import UserSummary from '@/app/(front-end)/onboarding/_components/steps/user/UserSummary';
import { useAppSelector } from '@/hooks/storeHook';

const UserSteps = ({ userId }: { userId: string }) => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);

  function renderFormByStep(step: number) {
    switch (step) {
      case 0:
        return <UserBasicInfoForm />;
      case 1:
        return <UserPreferencesForm />;
      case 2:
        return <UserSummary userId={userId} />;
      default:
        return null;
    }
  }

  return <div>{renderFormByStep(currentStep)}</div>;
};

export default UserSteps;
