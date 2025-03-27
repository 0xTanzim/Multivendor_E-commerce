'use client'; // Ensure this is a Client Component

import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { postRequest } from '@/lib';
import { selectCartDetails, setCurrentStep } from '@repo/redux';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const OrderSummary = () => {
  const { cartItems, totalPrice: subTotal } =
    useAppSelector(selectCartDetails) || [];
  const [isMounted, setIsMounted] = useState(false);

  const { checkoutFormData, currentStep } = useAppSelector(
    (state) => state.checkout
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="h-20 w-20 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  async function submitData() {
    try {
      const combinedData = {
        checkoutFormData,
        cartItems,
      };

      setLoading(true);

      const response = await postRequest({
        data: combinedData,
        endpoint: '/api/orders',
      });

      if (response.success) {
        toast.success('Order submitted successfully');
        router.push(`/order-confirmation/${response.data.orderRes.id}`);
      } else {
        toast.error(response.error);
      }
    } catch (err) {
      console.error('Error submitting order:', err);
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-lime-400">
        Order Summary
      </h2>

      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <div
            key={cartItem.id}
            className="flex items-center justify-between border-b dark:text-slate-400 pb-3 border-slate-300 dark:border-slate-600 font-semibold text-sm mb-4"
          >
            <div className="flex items-center gap-3">
              <Image
                src={cartItem?.imageUrl}
                alt="Product Image"
                className="rounded-xl w-14 h-14"
                width={250}
                height={250}
              />
              <div className="flex flex-col">
                <h2 className="uppercase">{cartItem.title}</h2>
              </div>
            </div>
            <div className="rounded-xl border-gray-400 border flex gap-3 px-2 items-center">
              <p className="flex-grow">
                {cartItem.qty} {cartItem.qty > 1 ? 'items' : 'item'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <h4>${cartItem.salePrice}</h4>
            </div>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}
      <div className="mt-4 font-bold text-lg">Subtotal: ${subTotal}</div>

      <div className="flex justify-between mt-2">
        <button
          onClick={() => dispatch(setCurrentStep(currentStep - 1))}
          className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5" />
          <span>Previous</span>
        </button>

        {loading ? (
          <button
            type="button"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            onClick={submitData}
            disabled
          >
            <span>Processing Please wait....</span>
            <Loader className="w-4 h-4 mr-2" />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
            onClick={submitData}
          >
            <span>Proceed to Payment</span>
            <ChevronRight className="w-4 h-4 mr-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
