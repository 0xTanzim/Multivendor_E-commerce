'use client';

import FormHeader from '@/components/backOffice/form/FormHeader';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Staff } from '@repo/types';
import { generateUserCode } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NewStaffPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Staff>({
    defaultValues: {
      isActive: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();

  const onSubmit = async (data: Staff) => {
    const code = generateUserCode('STF', data.name);
    data.code = code;
    makePostRequest({
      setLoading,
      endpoint: 'api/staffs',
      data,
      resourceName: 'Staff',
      reset,
      redirectPath: '/dashboard/staffs',
    });
  };

  return (
    <div>
      <FormHeader title="New Staff" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Staff Full Name"
            name="name"
            register={register}
            errors={errors}
          />

          <TextInput
            label="Staff Email"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Staff Phone Number"
            name="phoneNumber"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="NIN (ID Number)"
            name="nin"
            register={register}
            type="text"
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Date of Birth"
            name="dob"
            register={register}
            type="text"
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Staff Password"
            name="password"
            register={register}
            type="password"
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Staff's Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextareaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Staff"
          loadingButtonTitle="Creating Staff please wait..."
        />
      </form>
    </div>
  );
};

export default NewStaffPage;
