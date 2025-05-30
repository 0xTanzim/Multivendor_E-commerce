'use client';

import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Farmer, FarmerInput, User } from '@repo/types';
import { generateNameCode } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  user: User & Partial<{ email: string; name: string }>;
  updateData?: Farmer;
};

export default function FarmerForm({ user, updateData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FarmerInput>({
    defaultValues: {
      isActive: true,
      name: user.name,
      email: user.email,
      ...updateData,
    },
  });
  const makePostRequest = usePostRequest();
  const makePatchRequest = usePatchRequest();

  const initialImageUrl = updateData?.profileImageUrl || null;
  const farmerId = updateData?.id || null;
  const initialProducts = updateData?.products || [];

  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string[]>(initialProducts);

  const onSubmit = async (data: Farmer) => {
    data.profileImageUrl = imageUrl ?? '';
    const code = generateNameCode('MFF', user.name ?? '');
    data.products = products;
    data.userId = user.id;
    data.code = code;
    delete data.user;

    console.log('Farmer data:', data);

    if (farmerId) {
      makePatchRequest({
        setLoading,
        endpoint: `api/farmers/${farmerId}`,
        data,
        resourceName: 'Farmer Profile',
        reset,
        redirectPath: '/dashboard/farmers',
      });
    } else {
      makePostRequest({
        setLoading,
        endpoint: 'api/farmers',
        data,
        resourceName: 'Farmer Profile',
        reset,
        redirectPath: '/login',
      });
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Farmer's Full Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Email"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Phone Number"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Farmer's Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Farmer's Contact Person (Name)"
            name="contactPerson"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Farmer's Contact Person Phone Number"
            name="contactPersonPhone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />

          {/* Accare  */}
          <TextInput
            label="What is the Size of the Farm?"
            name="farmSize"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
          />

          <TextInput
            label="What is your main crop that you cultivate?"
            name="mainCrop"
            register={register}
            errors={errors}
            className="w-full"
          />

          <ArrayItemsInput
            setItems={setProducts}
            items={products}
            itemTitle="Products"
          />

          <ImageInput
            label="Farmer Profile"
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
          />

          <TextareaInput
            label="Farmer's Payment Terms"
            name="terms"
            register={register}
            errors={errors}
            isRequired={false}
          />

          <TextareaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />

          <ToggleInput
            label="Farmer's Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle={farmerId ? 'Update Farmer' : 'Create Farmer'}
          loadingButtonTitle={
            farmerId
              ? 'Updating Farmer please wait...'
              : 'Creating Farmer please wait...'
          }
        />
      </form>
    </div>
  );
}
