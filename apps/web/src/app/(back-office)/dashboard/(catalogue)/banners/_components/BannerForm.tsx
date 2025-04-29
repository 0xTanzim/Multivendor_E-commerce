'use client';

import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { Banner } from '@repo/types';
import { useBannerForm } from '../hooks/useBannerForm';

type BannerFormProps = {
  updateData?: Partial<Banner>;
};

const BannerForm = ({ updateData = {} }: BannerFormProps) => {
  const { formMethods, loading, handleSubmit } = useBannerForm({
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
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Banner Link"
          name="link"
          register={register}
          errors={errors}
          className="w-full"
        />

        <ImageInput
          label="Banner Image"
          setImageUrl={(url) => setValue('imageUrl', url)}
          imageUrl={watch('imageUrl') || updateData.imageUrl || ''}
        />

        <ToggleInput
          label="Banner Status"
          name="isActive"
          register={register}
          falseTitle="Draft"
          trueTitle="Active"
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={updateData.id ? 'Update Banner' : 'Create Banner'}
        loadingButtonTitle={
          updateData.id
            ? 'Updating Banner please wait...'
            : 'Creating Banner please wait...'
        }
      />
    </form>
  );
};

export default BannerForm;
