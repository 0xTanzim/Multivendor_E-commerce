'use client';
import TextInput from '@/components/FormInputs/TextInput';
import NavButtons from '@/components/frontend/checkout/NavButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setOnboardingCurrentStep, setOnboardingFormData } from '@repo/redux';
import { generateNameCode } from '@repo/utils';
import { useForm } from 'react-hook-form';

const BasicInformationForm = () => {
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
    const code = generateNameCode('MFF', data.firstName);
    data.code = code;
    dispatch(setOnboardingFormData(data));
    dispatch(setOnboardingCurrentStep(currentStep + 1));
  };

  return (
    <form className="" onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Personal Information
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
          label="Farmer's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />
        <TextInput
          label="Farmer's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          type="text"
          className="w-full"
        />

        <TextInput
          label="Farmer's Contact Person (Name)"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Farmer's Contact Person Phone Number"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <NavButtons />
    </form>
  );
};

export default BasicInformationForm;
