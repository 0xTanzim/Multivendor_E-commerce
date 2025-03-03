'use client';

import FormHeader from '@/components/backOffice/FormHeader';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePostRequest } from '@/hooks/usePostRequest';
import { market } from '@repo/types';
import { generateSlug } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NewMarketPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<market>({
    defaultValues: {
      isActive: true,
    },
  });

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();

  const onSubmit = async (data: market) => {
    const slug = generateSlug(data.title);
    data.slug = slug;

    data.logoUrl = logoUrl ?? '';

    makePostRequest({
      setLoading,
      endpoint: 'api/markets',
      data,
      resourceName: 'Market',
      reset,
      redirectPath: '/dashboard/markets',
    });
    setLogoUrl(null);
  };

  return (
    <div>
      <FormHeader title="New Market" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Market Title"
            name="title"
            register={register}
            errors={errors}
          />

          <ImageInput
            label="Market Logo"
            setImageUrl={setLogoUrl}
            imageUrl={logoUrl}
            endpoint={FileRoutes.marketLogoUploader}
          />

          <TextareaInput
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />

          <ToggleInput
            label="Market Status"
            name="isActive"
            register={register}
            falseTitle="Draft"
            trueTitle="Active"
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Market"
          loadingButtonTitle="Creating Market please wait..."
        />
      </form>
    </div>
  );
};

export default NewMarketPage;
