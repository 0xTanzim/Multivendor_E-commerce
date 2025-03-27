import { CartItem } from '@repo/types';
import { useEffect, useState } from 'react';
import CartProduct from './CartProduct';
import EmptyCart from './EmptyCart';

type CartItemsProps = {
  cartItems: CartItem[];
};

const CartItems = ({ cartItems }: CartItemsProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="sm:col-span-8 col-span-full">
      {isClient ? (
        <>
          {cartItems && cartItems.length > 0 && (
            <>
              <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>

              <div className="flex items-center justify-between border-b dark:text-slate-400 pb-3 border-slate-300 dark:border-slate-600 font-semibold text-sm mb-4">
                <h2 className="uppercase">Product</h2>
                <h2 className="uppercase">Quantity</h2>
                <h2 className="uppercase">Price</h2>
              </div>
            </>
          )}

          <div>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <CartProduct key={cartItem.id} cartItem={cartItem} />
              ))
            ) : (
              <EmptyCart />
            )}
          </div>

          {/* Coupon  */}
          {cartItems && cartItems.length > 0 && (
            <div className="flex items-center gap-2 py-8">
              <input
                type="text"
                id="email"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2"
                placeholder="Enter Coupon"
              />
              <button className="shrink-0 py-2 px-4 rounded-lg bg-lime-600 text-white font-bold">
                Apply Coupon
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="min-h-[30vh] flex items-center justify-center">
          <p>Loading cart...</p>
        </div>
      )}
    </div>
  );
};

export default CartItems;
