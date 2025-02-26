'use client';

import FormHeader from '@/components/backOffice/FormHeader';
import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePostRequest } from '@/hooks/usePostRequest';
import { product } from '@/types';
import { generateSlug } from '@/utils/generateSlug';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NewProductPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<product>({
    defaultValues: {
      isActive: true,
    },
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();

  const [tags, setTags] = useState<string[]>([]);

  const categories = [
    { id: '1', title: 'Category 1' },
    { id: '2', title: 'Category 2' },
    { id: '3', title: 'Category 3' },
  ];

  const farmers = [
    { id: '1', title: 'Farmer 1' },
    { id: '2', title: 'Farmer 2' },
    { id: '3', title: 'Farmer 3' },
  ];

  const onSubmit = async (data: product) => {
    const slug = generateSlug(data?.title);
    data.slug = slug;
    data.images = imageUrl ? [imageUrl] : [];
    data.tags = tags;

    console.log(data);

    makePostRequest({
      setLoading,
      endpoint: 'api/products',
      data,
      resourceName: 'Product',
      reset,
      redirectPath: '/dashboard/products',
    });
  };

  return (
    <div>
      <FormHeader title="New Product" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Product Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Product SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Price (Before Discount)"
            name="productPrice"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
          />
          <TextInput
            label="Product Sell Price"
            name="sellPrice"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
          />
          <SelectInput
            label="Select Category"
            name="categoryIds"
            options={categories}
            className="w-full"
            hasMultiple={true}
            setValue={setValue}
          />
          <SelectInput
            label="Select Farmer"
            name="farmerIds"
            options={farmers}
            className="w-full"
            hasMultiple={true}
            setValue={setValue}
          />
          <ImageInput
            label="Category Image"
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            endpoint={FileRoutes.productImageUploader}
          />
          <ArrayItemsInput items={tags} setItems={setTags} itemTitle="Tag" />
          <TextareaInput
            label="Product Description"
            name="description"
            register={register}
            errors={errors}
          />

          <ToggleInput
            label="Product Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Product"
          loadingButtonTitle="Creating Product please wait..."
        />
      </form>
    </div>
  );
};

export default NewProductPage;
