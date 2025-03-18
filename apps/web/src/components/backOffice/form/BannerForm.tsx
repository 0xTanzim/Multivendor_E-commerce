'use client';

import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Banner } from '@repo/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type BannerFormProps = {
  updateData?: Partial<Banner>;
};

const BannerForm = ({ updateData = {} }: BannerFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Banner>({
    defaultValues: {
      ...updateData,
    },
  });

  const bannerId = updateData.id ?? '';

  const initialImage = updateData.imageUrl ?? '';

  const [imageUrl, setImageUrl] = useState<string | null>(initialImage);
  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();
  const makePatchRequest = usePatchRequest();

  const onSubmit = async (data: Banner) => {
    setLoading(true);
    data.imageUrl = imageUrl ?? '';

    if (bannerId) {
      makePatchRequest({
        setLoading,
        endpoint: `api/banners/${bannerId}`,
        data,
        resourceName: 'Banner',
        reset,
        redirectPath: '/dashboard/banners',
      });
    } else {
      makePostRequest({
        setLoading,
        endpoint: 'api/banners',
        data,
        resourceName: 'Banner',
        reset,
        redirectPath: '/dashboard/banners',
      });
    }
  };

  return (
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
          type="url"
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

      {
        <SubmitButton
          isLoading={loading}
          buttonTitle={bannerId ? 'Update Banner' : 'Create Banner'}
          loadingButtonTitle={
            bannerId
              ? 'Updating Banner please wait...'
              : 'Creating Banner please wait...'
          }
        />
      }
    </form>
  );
};

export default BannerForm;
