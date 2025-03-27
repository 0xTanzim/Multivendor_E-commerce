'use client';

import TextInput from '@/components/FormInputs/TextInput';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setCheckoutFormData, setCurrentStep } from '@repo/redux';
import { IShippingData } from '@repo/types';
import { CheckCircle, Circle, Truck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import NavButtons from '../NavButtons';

const ShippingDetailsForm = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.checkout.currentStep);
  const existingData = useAppSelector(
    (state) => state.checkout.checkoutFormData
  );
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IShippingData>({
    defaultValues: {
      ...existingData,
    },
  });

  // Watch the shippingCost field to track its value
  const shippingCost = watch('shippingCost');

  const processData = async (data: IShippingData) => {
    data.shippingCost = Number(data.shippingCost);
    dispatch(setCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form className="" onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Shipping Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Postal Code"
          name="postalCode"
          register={register}
          errors={errors}
          className="w-full"
          type="number"
        />

        {/* Shipping Cost */}
        <div className="col-span-full">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Shipping Method
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                {...register('shippingCost', {
                  required: 'Please select a shipping method',
                })}
                type="radio"
                id="cheap"
                value="5"
                className="hidden"
              />
              <label
                htmlFor="cheap"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <Truck className="w-6 h-6 flex-shrink-0 ms-3" />
                  <div className="">
                    <p>Home</p>
                    <p>Delivery Cost: $5</p>
                  </div>
                </div>
                {shippingCost === '5' ? (
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 ms-3" />
                ) : (
                  <Circle className="w-6 h-6 flex-shrink-0 ms-3" />
                )}
              </label>
            </li>
            <li>
              <input
                {...register('shippingCost', {
                  required: 'Please select a shipping method',
                })}
                type="radio"
                id="expensive"
                value="10"
                className="hidden"
              />
              <label
                htmlFor="expensive"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <Truck className="w-6 h-6 flex-shrink-0 ms-3" />
                  <div className="">
                    <p>Home</p>
                    <p>Delivery Cost: $10</p>
                  </div>
                </div>
                {shippingCost === '10' ? (
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 ms-3" />
                ) : (
                  <Circle className="w-6 h-6 flex-shrink-0 ms-3" />
                )}
              </label>
            </li>
          </ul>
          {errors.shippingCost && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.shippingCost.message}
            </p>
          )}
        </div>
      </div>
      <NavButtons />
    </form>
  );
};

export default ShippingDetailsForm;
