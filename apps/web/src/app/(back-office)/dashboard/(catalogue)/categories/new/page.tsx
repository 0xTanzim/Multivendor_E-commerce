'use client';

import FormHeader from '@/components/backOffice/form/FormHeader';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePostRequest } from '@/hooks/usePostRequest';
import { CreateCategory } from '@repo/types';
import { generateSlug } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NewCategoryPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCategory>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();

  const onSubmit = async (data: CreateCategory) => {
    setLoading(true);
    const slug = generateSlug(data?.title);
    data.slug = slug;
    data.imageUrl = imageUrl ?? undefined;

    makePostRequest({
      setLoading,
      endpoint: 'api/categories',
      data,
      resourceName: 'Category',
      reset,
      redirectPath: '/dashboard/categories',
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
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextareaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />

          <ImageInput
            label="Category Image"
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            endpoint={FileRoutes.categoryImageUploader}
          />

          <ToggleInput
            label="Category Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Category"
          loadingButtonTitle="Creating Category please wait..."
        />
      </form>
    </div>
  );
};

export default NewCategoryPage;
