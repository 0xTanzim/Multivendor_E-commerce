'use client';

import FormHeader from '@/components/backOffice/form/FormHeader';
import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Product } from '@repo/types';
import { generateNameCode, generateSlug } from '@repo/utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type NewProductFormProps = {
  categories: { id: string; title: string }[];
  farmers: { id: string; title: string }[];
};

const NewProductForm = ({ categories, farmers }: NewProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      isActive: true,
      isWholeSale: false,
    },
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const makePostRequest = usePostRequest();

  const [tags, setTags] = useState<string[]>([]);
  const isWholeSale = watch('isWholeSale');
  const categoryId = watch('categoryId');
  const farmerId = watch('farmerId');

  // Watch changes and clear errors if they exist
  useEffect(() => {
    if (categoryId) clearErrors('categoryId');
  }, [categoryId]);

  useEffect(() => {
    if (farmerId) clearErrors('farmerId');
  }, [farmerId]);

  const onSubmit = async (data: Product) => {
    if (!data.categoryId) {
      toast.error('Please select a category');

      setError('categoryId', {
        type: 'manual',
        message: 'Please select a category',
      });
      return;
    }

    if (!data.farmerId) {
      toast.error('Please select a farmer');
      setError('farmerId', {
        type: 'manual',
        message: 'Please select a farmer',
      });
      return;
    }

    const slug = generateSlug(data?.title);
    const productCode = generateNameCode('MLP', data.title);

    data.slug = slug;
    data.images = imageUrl ? [imageUrl] : [];
    data.tags = tags ?? [];
    data.qty = 1;
    data.imageUrl = imageUrl ?? '';

    data.productCode = productCode;

    makePostRequest({
      setLoading,
      endpoint: 'api/products',
      data,
      resourceName: 'Product',
      reset,
      redirectPath: '/dashboard/products',
    });

    setTags([]);
    setImageUrl(null);
  };

  return (
    <div>
      <FormHeader title="New Product" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700 mx-auto my-3"
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
          <TextInput
            label="Product Stock"
            name="productStock"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
          />

          <TextInput
            label="Unit of Measurement(eg kilogram)"
            name="unit"
            register={register}
            errors={errors}
            type="number"
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            options={categories}
            className="w-full"
            setValue={setValue}
          />

          <SelectInput
            label="Select Farmer"
            name="farmerId"
            options={farmers}
            className="w-full"
            setValue={setValue}
          />

          <ToggleInput
            label="Is WholeSale"
            name="isWholeSale"
            trueTitle="Supported"
            falseTitle="Not Supported"
            register={register}
          />

          {isWholeSale && (
            <>
              <TextInput
                label="WholeSale Price"
                name="wholeSalePrice"
                register={register}
                errors={errors}
                className="w-full"
                type="number"
              />

              <TextInput
                label="Minimum WholeSale Quantity"
                name="wholeSaleQty"
                register={register}
                errors={errors}
                className="w-full"
                type="number"
              />
            </>
          )}

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

        {errors.categoryId && (
          <div className="text-red-600 text-md text-center my-2">
            {errors.categoryId.message}
          </div>
        )}

        {errors.farmerId && (
          <div className="text-red-600 text-md text-center">
            {errors.farmerId.message}
          </div>
        )}

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Product"
          loadingButtonTitle="Creating Product please wait..."
        />
      </form>
    </div>
  );
};

export default NewProductForm;
