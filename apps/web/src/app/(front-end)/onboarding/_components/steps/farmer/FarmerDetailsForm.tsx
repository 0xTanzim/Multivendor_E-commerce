'use client';
import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import TextInput from '@/components/FormInputs/TextInput';
import NavButtons from '@/components/frontend/checkout/NavButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setOnboardingCurrentStep, setOnboardingFormData } from '@repo/redux';
import { Farmer } from '@repo/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const FarmerDetailsForm = () => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);

  const existingData = useAppSelector(
    (state) => state.onboarding.onboardingFormData
  ) as Farmer;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Farmer>({
    defaultValues: {
      ...existingData,
    },
  });

  const [products, setProducts] = useState<string[]>(
    existingData.products || []
  );

  const dispatch = useAppDispatch();

  const processData = async (data: Partial<Farmer>) => {
    data.products = products || [];
    dispatch(setOnboardingFormData(data));
    dispatch(setOnboardingCurrentStep(currentStep + 1));
  };

  return (
    <form className="" onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Farmer's Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="What is the Size of the Farm?"
          name="farmSize"
          register={register}
          errors={errors}
          className="w-full"
          type="number"
        />

        <TextInput
          label="What is your main crop that you cultivate?"
          name="mainCrop"
          register={register}
          errors={errors}
          className="w-full"
        />

        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Products"
        />
      </div>
      <NavButtons />
    </form>
  );
};

export default FarmerDetailsForm;
