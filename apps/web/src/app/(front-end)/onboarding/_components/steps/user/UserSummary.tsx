'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { patchRequest } from '@/lib';
import { setOnboardingCurrentStep } from '@repo/redux';
import { User } from '@repo/types';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UserSummary = ({ userId }: { userId: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  const { onboardingFormData, currentStep } = useAppSelector(
    (state) => state.onboarding
  );

  const userData = onboardingFormData as Partial<User>;

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="h-20 w-20 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  async function submitData() {
    try {
      const data = {
        ...userData,
        userId: userId,
      };

      setLoading(true);

      // Log the data instead of making API request per requirements
      console.log('Submitting user data:', data);

      const response = await patchRequest({
        data: data,
        endpoint: `/api/users/${userId}`,
      });

      console.log('Response:-------------', response);

      // Simulate successful response
      // setTimeout(() => {
      //   toast.success('User profile created successfully');
      //   router.push(`/login`);
      // }, 1500);
    } catch (err) {
      console.error('Error submitting user data:', err);
      toast.error('Failed to submit user data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Profile Summary
      </h2>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2">Here are your Details</h2>

        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Name: </span>
            {userData.firstName} {userData.lastName}
          </p>

          <p>
            <span className="font-semibold">Phone: </span>
            {userData.phone}
          </p>

          {userData.streetAddress && (
            <p>
              <span className="font-semibold">Address: </span>
              {userData.streetAddress},{userData.city && ` ${userData.city},`}
              {userData.country && ` ${userData.country}`}
              {userData.postalCode && ` - ${userData.postalCode}`}
            </p>
          )}

          {userData.gender && (
            <p>
              <span className="font-semibold">Gender: </span>
              {userData.gender}
            </p>
          )}

          {userData.bio && (
            <p>
              <span className="font-semibold">Bio: </span>
              {userData.bio}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => dispatch(setOnboardingCurrentStep(currentStep - 1))}
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5" />
          <span>Previous</span>
        </button>

        {loading ? (
          <button
            type="button"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            onClick={submitData}
            disabled
          >
            <span>Processing Please wait....</span>
            <Loader className="w-4 h-4 mr-2" />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            onClick={submitData}
          >
            <span>Complete Registration</span>
            <ChevronRight className="w-4 h-4 mr-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSummary;
