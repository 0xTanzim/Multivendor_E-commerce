'use client';

import { useAppSelector } from '@/hooks/storeHook';
import { selectCartDetails } from '@repo/redux';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const CheckoutBanner = () => {
  const { cartItems, totalQuantity, totalPrice } =
    useAppSelector(selectCartDetails);

  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-600 rounded-xl mb-5">
        <div className="p-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center flex-1">
              <div className="inline-flex items-center justify-center flex-shrink-0 bg-slate-400  rounded-full w-9 h-9 text-slate-50">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="ml-3 text-base font-normal dark:text-slate-300 text-slate-900">
                You have {totalQuantity} items in cart. Sub total is
                <span className="font-bold">
                  {''} ${totalPrice}
                </span>
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <Link
                href={'/cart'}
                className="inline-flex items-center px-4 py-2 text-sm font-bold text-slate-600 transition-all duration-200 border border-slate-300  rounded-md  bg-slate-50 dark:bg-slate-200   hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:text-slate-900 focus:ring-offset-2 focus:ring-slate-500"
              >
                Edit cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutBanner;
