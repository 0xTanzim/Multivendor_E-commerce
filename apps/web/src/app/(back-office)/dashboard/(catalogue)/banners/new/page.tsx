'use client';

import FormHeader from '@/components/backOffice/FormHeader';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Banner } from '@repo/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NewBannerPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Banner>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();

  const onSubmit = async (data: Banner) => {
    setLoading(true);
    data.imageUri = imageUrl ?? '';

    makePostRequest({
      setLoading,
      endpoint: 'api/banners',
      data,
      resourceName: 'Banner',
      reset,
      redirectPath: '/dashboard/banners',
    });
  };

  return (
    <div>
      <FormHeader title="New Category" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Banner Title"
            name="title"
            register={register}
            errors={errors}
          />

          <TextInput
            label="Banner link"
            name="link"
            register={register}
            errors={errors}
          />

          <ImageInput
            label="Banner Image"
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            endpoint={FileRoutes.bannerImageUploader}
          />
          <ToggleInput
            label="Publish your Banner"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Banner"
          loadingButtonTitle="Creating Banner please wait..."
        />
      </form>
    </div>
  );
};

export default NewBannerPage;
