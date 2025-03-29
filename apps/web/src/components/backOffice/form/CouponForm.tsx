'use client';

import NumberInput from '@/components/FormInputs/NumberInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { useAuthDetails } from '@/hooks/useAuthDetails';
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
  const { userId } = useAuthDetails();

  const expiryDateNormal = updateData?.expiryDate
    ? convertIsoDateToNormalDate(updateData.expiryDate.toString())
    : '';
  const startDateNormal = updateData?.startDate
    ? convertIsoDateToNormalDate(updateData.startDate.toString())
    : '';

  const couponId = updateData?.id ?? null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Coupon>({
    defaultValues: {
      ...updateData,
      expiryDate: expiryDateNormal || '',
      startDate: startDateNormal || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const postRequest = usePostRequest();
  const patchRequest = usePatchRequest();

  const onSubmit = async (data: Coupon) => {
    const couponCode = generateCouponCode(data?.title, data?.expiryDate);
    data.couponCode = couponCode;
    data.vendorId = userId;

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
  const DiscountType = [
    { id: 'PERCENTAGE', title: 'Percentage' },
    { id: 'FIXED', title: 'Fixed Amount' },
  ];
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
          label="Start Date"
          name="startDate"
          register={register}
          errors={errors}
          type="date"
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

        <NumberInput
          label="Discount"
          name="discount"
          register={register}
          errors={errors}
          min={0}
          step={0.01}
          className="w-full"
        />

        <SelectInput
          label="Discount Type"
          name="discountType"
          setValue={setValue}
          options={DiscountType}
          className="w-full"
          defaultValue={updateData?.discountType}
        />

        <NumberInput
          label="Minimum Spend"
          name="minSpend"
          register={register}
          errors={errors}
          min={0}
          step={0.01}
          className="w-full"
        />
        <NumberInput
          label="Max Discount"
          name="maxDiscount"
          register={register}
          errors={errors}
          min={0}
          step={0.01}
          className="w-full"
        />
        <NumberInput
          label="Max Uses"
          name="maxUses"
          register={register}
          errors={errors}
          min={0}
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
