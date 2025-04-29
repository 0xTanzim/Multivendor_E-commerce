'use client';

import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import ImageInput from '@/components/FormInputs/ImageInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextareaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { FileRoutes } from '@/config';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Farmer, User } from '@repo/types';
import { generateNameCode } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  user: User | any;
  updateData?: Farmer;
};

export default function NewFarmerForm({ user, updateData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Farmer>({
    defaultValues: {
      isActive: true,
      ...user,
      ...updateData,
    },
  });

  console.log('Farmer data', updateData);
  console.log('User data', user);
  

  const initialImageUrl = updateData?.profileImageUrl || null;
  const farmerId = updateData?.id || null;

  const makePostRequest = usePostRequest();
  const makePatchRequest = usePatchRequest();
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string[]>([]);

  const onSubmit = async (data: Farmer) => {
    data.profileImageUrl = imageUrl ?? '';
    const code = generateNameCode('MFF', user.name);
    data.products = products;
    data.userId = user.id;
    data.code = code;

    console.log(data);

    if (farmerId) {
      makePatchRequest({
        setLoading,
        endpoint: `api/farmers/${farmerId}`,
        data,
        resourceName: 'Farmer Profile',
        reset,
        redirectPath: '/dashboard/farmers',
      });

      return;
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
          buttonTitle="Create Farmer"
          loadingButtonTitle="Creating Farmer please wait..."
        />
      </form>
    </div>
  );
}
