import BreadCamp from '@/components/shared/BreadCamp';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  return (
    <div>
      <BreadCamp />
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8">
          <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between border-b dark:text-slate-400 pb-3 border-slate-300 dark:border-slate-600 font-semibold text-sm mb-4">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Price</h2>
          </div>

          <div>
            <div className="flex items-center justify-between border-b dark:text-slate-400 pb-3 border-slate-300 dark:border-slate-600 font-semibold text-sm mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={'/images/tometo.webp'}
                  alt="Product Image"
                  className="rounded-xl w-20 h-20"
                  width={250}
                  height={250}
                />
                <div className="flex flex-col">
                  <h2 className="uppercase">Tomato 1kg</h2>
                  <small>SKU: 123456</small>
                </div>
              </div>

              <div className=" rounded-xl border-gray-400 border flex gap-3 items-center">
                <button className="border-r border-gray-400 py-2  px-4">
                  <Minus />
                </button>
                <p className="flex-grow">1</p>

                <button className="border-l border-gray-400 py-2  px-4 ">
                  <Plus />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <h4>$100</h4>
                <button>
                  <Trash2 className="cursor-pointer text-red-600 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Coupon  */}

          <div className="flex items-center gap-2 py-8">
            <input
              type="text"
              id="email"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2"
              placeholder="Enter Coupon"
            />
            <button className=" shrink-0 py-2 px-4 rounded-lg bg-lime-600 text-white font-bold">
              Apply Coupon
            </button>
          </div>
        </div>

        <div className="col-span-4  hidden sm:block bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 overflow-hidden p-5 font-bold">
          <div className="text-2xl pb-3">Cart total</div>
          <div className="flex items-center  border-b border-slate-500  pb-6 justify-between">
            <span>Subtotal</span>
            <span>$100</span>
          </div>

          <div className="flex items-center  pb-4 mt-2 justify-between">
            <span>Tax</span>
            <span>$5</span>
          </div>

          <div className="flex items-center pb-4 justify-between">
            <span>Shipping</span>
            <span>$10</span>
          </div>
          <p className="border-b border-slate-500 pb-6 text-slate-600 dark:text-slate-400 font-normal">
            We only charge for shipping when you have over 2Kg of products in
            your cart.
          </p>

          <div className="flex items-center font-bold  py-4 justify-between">
            <span>Total</span>
            <span>$10</span>
          </div>

          <Link
            href="/checkout"
            className="bg-slate-200 text-slate-900 rounded-lg py-2 px-4 mt-4 font-normal"
          >
            Continue to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
