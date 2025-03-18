'use client';

import CartItems from '@/components/frontend/cart/CartItems';
import CartSubTotal from '@/components/frontend/cart/CartSubTotal';
import EmptyCart from '@/components/frontend/cart/EmptyCart';
import BreadCamp from '@/components/shared/BreadCamp';
import { useAppSelector } from '@/hooks/storeHook';

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart);

  const subTotal =
    cartItems
      .reduce((acc, item) => {
        return acc + item.salePrice * item.qty;
      }, 0)
      .toFixed(2) ?? 0;

  return (
    <div>
      <BreadCamp />
      {cartItems.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <EmptyCart />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <CartItems cartItems={cartItems} />

          <CartSubTotal subTotal={subTotal} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
