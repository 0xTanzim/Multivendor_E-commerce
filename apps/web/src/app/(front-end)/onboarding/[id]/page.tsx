import { getData } from '@/lib/getData';
import { isAuthUser } from '@repo/types';
import StepForm from '../_components/StepForm';
import Steps from '../_components/Steps';

const onBoardingPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const userData = await getData(`/users/${id}`);

  if (!isAuthUser(userData)) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-red-600">
        User not found
      </div>
    );
  }

  // Determine steps based on role
  const role = userData.role || 'User';

  // Define steps based on role
  const farmerSteps = [
    { id: 0, title: 'Basic Information' },
    { id: 1, title: 'Farmer Details' },
    { id: 2, title: 'Additional Information' },
    { id: 3, title: 'Summary' },
  ];

  const userSteps = [
    { id: 0, title: 'Basic Information' },
    { id: 1, title: 'Preferences' },
    { id: 2, title: 'Summary' },
  ];

  // Select the appropriate steps based on role
  const steps = role === 'Farmer' ? farmerSteps : userSteps;

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto border-slate-200 border p-6 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Steps steps={steps} role={role} />

        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* Step Form */}
          <StepForm userId={id} role={role} />
        </div>
      </div>
    </div>
  );
};

export default onBoardingPage;
