'use client';
import ImageInput from '@/components/FormInputs/ImageInput';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import NavButtons from '@/components/frontend/checkout/NavButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setOnboardingCurrentStep, setOnboardingFormData } from '@repo/redux';
import { User } from '@repo/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const UserPreferencesForm = () => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);
  const existingData = useAppSelector(
    (state) => state.onboarding.onboardingFormData
  ) as User;

  const [imageUrl, setImageUrl] = useState<string | null>(
    existingData.profileImage || null
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
    data.profileImage = imageUrl ?? '';
    dispatch(setOnboardingFormData(data));
    dispatch(setOnboardingCurrentStep(currentStep + 1));
  };

  return (
    <form className="" onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Additional Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ImageInput
          label="Profile Picture"
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />

        <TextInput
          label="Date of Birth (Optional)"
          name="dateOfBirth"
          register={register}
          errors={errors}
          type="date"
          className="w-full"
        />

        <TextInput
          label="Gender"
          name="gender"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />

        <TextareaInput
          label="Bio (Optional)"
          name="bio"
          register={register}
          errors={errors}
          isRequired={false}
        />
      </div>
      <NavButtons />
    </form>
  );
};

export default UserPreferencesForm;
