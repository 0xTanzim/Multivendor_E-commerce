'use client';

import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Category } from '@repo/types';
import { generateSlug } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type CategoryFormProps = {
  updateData?: Partial<Category>;
};
const CategoryForm = ({ updateData = {} }: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: {
      ...updateData,
    },
  });

  const initialImageUrl = updateData?.imageUrl ?? null;
  const categoryId = updateData?.id ?? null;

  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();
  const makePatchRequest = usePatchRequest();

  const onSubmit = async (data: Category) => {
    setLoading(true);
    const slug = generateSlug(data?.title);
    data.slug = slug;
    data.imageUrl = imageUrl ?? undefined;

    if (categoryId) {
      makePatchRequest({
        setLoading,
        endpoint: `api/categories/${categoryId}`,
        data,
        resourceName: 'Category',
        reset,
        redirectPath: '/dashboard/categories',
      });
    } else {
      makePostRequest({
        setLoading,
        endpoint: 'api/categories',
        data,
        resourceName: 'Category',
        reset,
        redirectPath: '/dashboard/categories',
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
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
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
        buttonTitle={categoryId ? 'Update Category' : 'Create Category'}
        loadingButtonTitle={
          categoryId
            ? 'Updating Category please wait...'
            : 'Creating Category please wait...'
        }
      />
    </form>
  );
};

export default CategoryForm;
