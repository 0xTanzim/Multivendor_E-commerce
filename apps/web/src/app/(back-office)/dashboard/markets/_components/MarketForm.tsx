'use client';

import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { useAuthDetails } from '@/hooks/useAuthDetails';
import { Market } from '@repo/types';
import { useMarketForm } from '../hooks/useMarketForm';

type MarketFormProps = {
  categories: {
    id: string;
    title: string;
  }[];
  updateData?: Partial<Market>;
};

const MarketForm = ({ categories, updateData = {} }: MarketFormProps) => {
  const { formMethods, loading, handleSubmit, setFieldValue } = useMarketForm({
    updateData,
  });

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = formMethods;

 

  return (
    <form
      onSubmit={formMethods.handleSubmit(handleSubmit)}
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

        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Email Address"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Website"
          name="website"
          type="url"
          register={register}
          errors={errors}
        />

        <TextareaInput
          label="Address"
          name="address"
          register={register}
          errors={errors}
        />

        <ImageInput
          label="Market Logo"
          setImageUrl={(url) => setFieldValue('logoUrl', url)}
          imageUrl={watch('logoUrl') || updateData.logoUrl || ''}
        />

        <ImageInput
          label="Cover Image"
          setImageUrl={(url) => setValue('coverImageUrl', url)}
          imageUrl={watch('coverImageUrl') || updateData.coverImageUrl || ''}
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
        buttonTitle={updateData.id ? 'Update Market' : 'Create Market'}
        loadingButtonTitle={
          updateData.id
            ? 'Updating Market please wait...'
            : 'Creating Market please wait...'
        }
      />
    </form>
  );
};

export default MarketForm;
