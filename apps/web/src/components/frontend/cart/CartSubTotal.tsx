import { calculateTax } from '@repo/utils';
import Link from 'next/link';

type CartSubTotalProps = {
  subTotal: string;
};

const CartSubTotal = ({ subTotal }: CartSubTotalProps) => {
  const shipping = 10;
  const tax = calculateTax(parseFloat(subTotal));

  const total = parseFloat(subTotal) + shipping + tax;
  const formattedTotal = total.toFixed(2);

  return (
    <div className="sm:col-span-4 col-span-full   sm:block bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 overflow-hidden p-5 font-bold ">
      <div className="text-2xl pb-3">Cart total</div>
      <div className="flex items-center  border-b border-slate-500  pb-6 justify-between">
        <span>Subtotal</span>
        <span>${subTotal}</span>
      </div>

      <div className="flex items-center  pb-4 mt-2 justify-between">
        <span>Tax</span>
        <span>${tax}</span>
      </div>

      <div className="flex items-center pb-4 justify-between">
        <span>Shipping</span>
        <span>${shipping}</span>
      </div>
      <p className="border-b border-slate-500 pb-6 text-slate-600 dark:text-slate-400 font-normal">
        We only charge for shipping when you have over 2Kg of products in your
        cart.
      </p>

      <div className="flex items-center font-bold  py-4 justify-between">
        <span>Total</span>
        <span>${formattedTotal}</span>
      </div>

      <div className="mt-8">
        <Link
          href="/checkout"
          className="text-slate-200 bg-slate-900 rounded-lg py-3 px-6  font-normal dark:bg-lime-600"
        >
          Continue to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSubTotal;
