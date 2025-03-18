'use client';

import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { usePatchRequest } from '@/hooks/usePatchRequest';
import { usePostRequest } from '@/hooks/usePostRequest';
import { Coupon } from '@repo/types';
import { convertIsoDateToNormalDate, generateCouponCode } from '@repo/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type CouponFormProps = {
  updateData?: Partial<Coupon>;
};

const CouponForm = ({ updateData = {} }: CouponFormProps) => {
  const expiryDateNormal = updateData?.expiryDate
    ? convertIsoDateToNormalDate(updateData.expiryDate.toString())
    : '';

  const couponId = updateData?.id ?? null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Coupon>({
    defaultValues: {
      ...updateData,
      expiryDate: expiryDateNormal || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const postRequest = usePostRequest();
  const patchRequest = usePatchRequest();

  const onSubmit = async (data: Coupon) => {
    const couponCode = generateCouponCode(data?.title, data?.expiryDate);
    data.couponCode = couponCode;

    if (couponId) {
      patchRequest({
        setLoading,
        endpoint: `api/coupons/${couponId}`,
        data,
        resourceName: 'coupon',
        reset,
        redirectPath: '/dashboard/coupons',
      });
    } else {
      postRequest({
        setLoading,
        endpoint: 'api/coupons',
        data,
        resourceName: 'coupon',
        reset,
        redirectPath: '/dashboard/coupons',
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
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Expiry Date"
          name="expiryDate"
          register={register}
          errors={errors}
          type="date"
          className="w-full"
        />

        <ToggleInput
          label=" Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={couponId ? 'Update Coupon' : 'Create Coupon'}
        loadingButtonTitle={
          couponId
            ? 'Updating Coupon please wait...'
            : 'Creating Coupon please wait...'
        }
      />
    </form>
  );
};

export default CouponForm;
