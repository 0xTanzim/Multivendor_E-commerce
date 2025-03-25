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
import { Training } from '@repo/types';
import { generateSlug } from '@repo/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const QuillEditor = dynamic(
  () => import('@/components/FormInputs/QuillEditor'),
  { ssr: false }
);

type TrainingFormProps = {
  categories: {
    id: string;
    title: string;
  }[];

  updateData?: Partial<Training>;
};

const TrainingForm = ({ categories, updateData = {} }: TrainingFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Training>({
    defaultValues: {
      ...updateData,
    },
  });

  const initialContent = updateData?.content ?? '';
  const initialImage = updateData?.image ?? '';
  const trainingId = updateData?.id ?? '';

  const [imageUrl, setImageUrl] = useState<string>(initialImage);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>(initialContent);
  const makePostRequest = usePostRequest();
  const makePatchRequest = usePatchRequest();

  const onSubmit = async (data: Training) => {
    setLoading(true);
    const slug = generateSlug(data?.title);
    data.slug = slug;
    data.image = imageUrl ?? '';
    data.content = content ?? '';

    if (!data.content) {
      setLoading(false);
      return toast.error('Please add content to your training!');
    }

    if (trainingId) {
      makePatchRequest({
        setLoading,
        endpoint: `api/trainings/${trainingId}`,
        data,
        resourceName: 'Training',
        reset,
        redirectPath: '/dashboard/community',
      });
    } else {
      makePostRequest({
        setLoading,
        endpoint: 'api/trainings',
        data,
        resourceName: 'Training',
        reset,
        redirectPath: '/dashboard/community',
      });
    }

    setImageUrl('');
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Training Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />

        <SelectInput
          label="Select Category"
          name="categoryId"
          options={categories}
          className="w-full"
          setValue={setValue}
          defaultValue={updateData?.categoryId}
        />

        <TextareaInput
          label="Training Description"
          name="description"
          register={register}
          errors={errors}
        />

        <ImageInput
          label="Training Image"
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
         
        />
      </div>

      <QuillEditor
        value={content}
        onChange={setContent}
        label="Training Content"
      />

      <ToggleInput
        label="Publish your Training"
        name="isActive"
        trueTitle="Active"
        falseTitle="Draft"
        register={register}
      />

      <SubmitButton
        isLoading={loading}
        buttonTitle={trainingId ? 'Update Training' : 'Create Training'}
        loadingButtonTitle={
          trainingId
            ? 'Updating Training please wait...'
            : 'Creating Training please wait...'
        }
      />
    </form>
  );
};

export default TrainingForm;
