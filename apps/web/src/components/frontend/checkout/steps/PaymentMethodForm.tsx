'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setCheckoutFormData, setCurrentStep } from '@repo/redux';
import { IPayMethod } from '@repo/types';
import { CheckCircle, Circle, CreditCard, HeartHandshake } from 'lucide-react';
import { useForm } from 'react-hook-form';
import NavButtons from '../NavButtons';

const PaymentMethodForm = () => {
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
  } = useForm<IPayMethod>({
    defaultValues: {
      ...existingData,
      paymentMethod: existingData.paymentMethod ?? 'cod',
    },
  });

  // Watch the paymentMethod field to get its current value
  const paymentMethod = watch('paymentMethod');

  const processData = async (data: IPayMethod) => {
    dispatch(setCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Payment Method
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="col-span-full">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Which payment method would you like to use?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            {/* Cash On Delivery Option */}
            <li>
              <input
                {...register('paymentMethod', {
                  required: 'Please select a Payment method',
                })}
                type="radio"
                id="cashOnDelivery"
                value="cod"
                className="hidden"
              />
              <label
                htmlFor="cashOnDelivery"
                className="flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <HeartHandshake className="w-6 h-6 flex-shrink-0" />
                  <p>Cash On Delivery</p>
                </div>
                <div className="flex items-center">
                  {paymentMethod === 'cod' ? (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
              </label>
            </li>

            {/* Credit Card Option */}
            <li>
              <input
                {...register('paymentMethod', {
                  required: 'Please select a Payment method',
                })}
                type="radio"
                id="creditCard"
                value="card"
                className="hidden"
              />
              <label
                htmlFor="creditCard"
                className="flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <CreditCard className="w-6 h-6 flex-shrink-0" />
                  <p>Credit Card</p>
                </div>
                <div className="flex items-center">
                  {paymentMethod === 'card' ? (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
              </label>
            </li>
          </ul>
          {errors.paymentMethod && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>
      </div>
      <NavButtons />
    </form>
  );
};

export default PaymentMethodForm;
