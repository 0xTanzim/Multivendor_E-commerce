'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { postRequest } from '@/lib';
import { setOnboardingCurrentStep } from '@repo/redux';
import { Farmer } from '@repo/types';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const FarmerSummary = ({ farmerId }: { farmerId: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  const { onboardingFormData, currentStep } = useAppSelector(
    (state) => state.onboarding
  );

  const farmerData = onboardingFormData as Partial<Farmer>;

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
        ...farmerData,
        userId: farmerId,
      };

      setLoading(true);

      // Log the data instead of making API request per requirements
      console.log('Submitting farmer data:', data);

      const response = await postRequest({
        data: data,
        endpoint: 'api/farmers',
      });

      console.log('Response:-------------', response);

      toast.success('Farmer profile created successfully');
      setTimeout(() => {
        router.push(`/login`);
      }, 1500);
    } catch (err) {
      console.error('Error submitting farmer data:', err);
      toast.error('Failed to submit farmer data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Farmer Summary
      </h2>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2">Here are your Details</h2>

        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Name: </span>
            {onboardingFormData.firstName} {farmerData.lastName}
          </p>

          <p>
            <span className="font-semibold">Farm Size: </span>
            {farmerData.farmSize}
          </p>
          <p>
            <span className="font-semibold">Main Crop: </span>
            {farmerData.mainCrop}
          </p>

          <p>
            <span className="font-semibold">Products: </span>
            {onboardingFormData.products?.join(', ')}
          </p>

          <p>
            <span className="font-semibold">Phone: </span>
            {onboardingFormData.phone}
          </p>
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
            <Loader className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            onClick={submitData}
          >
            <span>Complete Registration</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FarmerSummary;
