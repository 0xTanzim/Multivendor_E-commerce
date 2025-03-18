'use client';

import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Market } from '@repo/types';
import { generateSlug } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type MarketFormProps = {
  categories: {
    id: string;
    title: string;
  }[];
  updateData?: Partial<Market>;
};

const MarketForm = ({ categories, updateData = {} }: MarketFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Market>({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  const initialImage = updateData?.logoUrl ?? '';
  const marketId = updateData?.id ?? '';

  const [logoUrl, setLogoUrl] = useState<string | null>(initialImage);
  const [loading, setLoading] = useState(false);

  const makePostRequest = usePostRequest();
  const makePatchRequest = usePatchRequest();

  const onSubmit = async (data: Market) => {
    setLoading(true);

    if (!data.categoryIds || data.categoryIds.length === 0) {
      setLoading(false);
      return toast.error('Please select at least one category');
    }

    const slug = generateSlug(data.title);
    data.slug = slug;

    data.logoUrl = logoUrl ?? '';

    if (marketId) {
      makePatchRequest({
        setLoading,
        endpoint: `api/markets/${marketId}`,
        data,
        resourceName: 'Market',
        reset,
        redirectPath: '/dashboard/markets',
      });
    } else {
      makePostRequest({
        setLoading,
        endpoint: 'api/markets',
        data,
        resourceName: 'Market',
        reset,
        redirectPath: '/dashboard/markets',
      });
    }

    setLogoUrl(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Market Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />

        <SelectInput
          label="Select Categories"
          name="categoryIds"
          options={categories}
          className="w-full"
          hasMultiple={true}
          setValue={setValue}
          defaultValue={updateData.categoryIds || []}
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
  );
};

export default MarketForm;
