'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import NavButtons from '@/components/frontend/checkout/NavButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setOnboardingCurrentStep, setOnboardingFormData } from '@repo/redux';
import { Farmer } from '@repo/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AdditionalInfoForm = () => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);

  const existingData = useAppSelector(
    (state) => state.onboarding.onboardingFormData
  ) as Farmer;

  const [imageUrl, setImageUrl] = useState<string | null>(
    existingData.profileImageUrl || null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingData,
    },
  });

  const dispatch = useAppDispatch();

  const processData = async (data: any) => {
    data.profileImageUrl = imageUrl ?? '';
    dispatch(setOnboardingFormData(data));
    dispatch(setOnboardingCurrentStep(currentStep + 1));
  };

  return (
    <form className="" onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Farmer's Additional Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ImageInput
          label="Farmer Profile"
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />

        <TextareaInput
          label="Farmer's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
        />

        <TextareaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
        />
      </div>
      <NavButtons />
    </form>
  );
};

export default AdditionalInfoForm;
