'use client';

import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { Farmer, FarmerInput, User } from '@repo/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  user: User;
  updateData?: Farmer;
};

export default function CustomerForm({ user, updateData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Farmer>({
    defaultValues: {},
  });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const makePatch = usePatchRequest();

  const onSubmit = async (data: any) => {
    data.profileImage = imageUrl;
    console.log('Form data:', data);


    makePatch({
      endpoint: `/customers/${user.id}`,
      data: data,
      setLoading: setLoading,
      reset,
      resourceName: 'Customer',
      
    })


  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3"
      >
        <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
          Personal Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border-b border-gray-700 pb-8">
          <TextInput
            label="Full Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Username"
            name="username"
            register={register}
            errors={errors}
            type="text"
            className="w-full"
          />
          <TextInput
            label="Date of Birth"
            name="dateOfBirth"
            register={register}
            errors={errors}
            type="date"
            className="w-full"
          />

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

          <ImageInput
            label="Customer Profile"
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
          />
        </div>

        <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400 pt-10">
          Shipping Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Street Address"
            name="streetAddress"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="City"
            name="city"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Country"
            name="country"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Postal Code"
            name="postalCode"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle={updateData ? 'Update Farmer' : 'Create Farmer'}
          loadingButtonTitle={
            updateData
              ? 'Updating Farmer please wait...'
              : 'Creating Farmer please wait...'
          }
        />
      </form>
    </div>
  );
}
