'use client';

import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import ImageInput from '@/components/FormInputs/ImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Product } from '@repo/types';
import { generateNameCode, generateSlug } from '@repo/utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type ProductFormProps = {
  categories: { id: string; title: string }[];
  farmers: { id: string; title?: string }[];
  updateData?: Partial<Product>;
};

const ProductForm = ({
  categories,
  farmers,
  updateData = {},
}: ProductFormProps) => {
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
      isWholesale: updateData?.isWholesale ?? false,
      ...updateData,
    },
  });

  const initialImageUrl = updateData?.imageUrl ?? null;
  const productId = updateData?.id;
  const initialTags = updateData?.tags ?? [];

  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);
  const [loading, setLoading] = useState(false);

  const makePostRequest = usePostRequest();
  const makePatchRequest = usePatchRequest();

  const [tags, setTags] = useState<string[]>(initialTags);

  const isWholesale = watch('isWholesale');
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

    if (!data.userId) {
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
    data.tags = tags ?? [];
    data.qty = 1;
    data.imageUrl = imageUrl ?? '';
    data.productCode = productCode;



    if (productId) {
      makePatchRequest({
        setLoading,
        endpoint: `api/products/${productId}`,
        data,
        resourceName: 'Product',
        reset,
        redirectPath: '/dashboard/products',
      });
    } else {
      makePostRequest({
        setLoading,
        endpoint: 'api/products',
        data,
        resourceName: 'Product',
        reset,
        redirectPath: '/dashboard/products',
      });
    }

    setTags([]);
    setImageUrl(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700 mx-auto my-3 overflow-auto"
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
          defaultValue={updateData?.categoryId}
        />

        {farmers && (
          <SelectInput
            label="Select Farmer"
            name="farmerId"
            options={farmers}
            className="w-full"
            setValue={setValue}
            defaultValue={updateData?.userId}
          />
        )}

        <ToggleInput
          label="Is WholeSale"
          name="isWholesale"
          trueTitle="Supported"
          falseTitle="Not Supported"
          register={register}
        />

        {isWholesale && (
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
        buttonTitle={productId ? 'Update Product' : 'Create Product'}
        loadingButtonTitle={
          productId
            ? 'Updating Product please wait...'
            : 'Creating Product please wait...'
        }
      />
    </form>
  );
};

export default ProductForm;
