'use client';

import TextInput from '@/components/FormInputs/TextInput';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { useAuthDetails } from '@/hooks/useAuthDetails';
import { setCheckoutFormData, setCurrentStep } from '@repo/redux';
import { IPerson } from '@repo/types';
import { useForm } from 'react-hook-form';
import NavButtons from '../NavButtons';

const PersonalDetailsForm = () => {
  const { userId } = useAuthDetails();

  const currentStep = useAppSelector((state) => state.checkout.currentStep);
  const existingData = useAppSelector(
    (state) => state.checkout.checkoutFormData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerson>({
    defaultValues: {
      ...existingData,
    },
  });

  const dispatch = useAppDispatch();

  const processData = async (data: IPerson) => {
    data.userId = userId;
    dispatch(setCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
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
          label="Email Address"
          name="email"
          register={register}
          errors={errors}
          type="email"
          className="w-full"
        />

        <TextInput
          label="Phone Number"
          name="phoneNumber"
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

export default PersonalDetailsForm;
