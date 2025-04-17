'use client';

import FarmerSteps from './farmer/FarmerSteps';
import UserSteps from './user/UserSteps';

const StepForm = ({ userId, role }: { userId: string; role: string }) => {
  // Render appropriate steps based on the role
  if (role === 'Farmer') {
    return <FarmerSteps farmerId={userId} />;
  } else {
    return <UserSteps userId={userId} />;
  }
};

export default StepForm;
