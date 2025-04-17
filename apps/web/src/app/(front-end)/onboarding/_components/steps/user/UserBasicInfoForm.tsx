'use client';
import TextInput from '@/components/FormInputs/TextInput';
import NavButtons from '@/components/frontend/checkout/NavButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setOnboardingCurrentStep, setOnboardingFormData } from '@repo/redux';
import { useForm } from 'react-hook-form';

const UserBasicInfoForm = () => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);
  const existingData = useAppSelector(
    (state) => state.onboarding.onboardingFormData
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
    dispatch(setOnboardingFormData(data));
    dispatch(setOnboardingCurrentStep(currentStep + 1));
  };

  return (
    <form className="" onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Basic Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />

        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />

        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />

        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />

        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />

        <TextInput
          label="Postal Code"
          name="postalCode"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />
      </div>
      <NavButtons />
    </form>
  );
};

export default UserBasicInfoForm;
