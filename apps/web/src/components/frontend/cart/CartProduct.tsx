'use client';
import { useAppDispatch } from '@/hooks/storeHook';
import { decrementQty, incrementQty, removeFromCart } from '@repo/redux';
import { CartItem } from '@repo/types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

type CartProductProps = {
  cartItem: CartItem;
};

const CartProduct = ({ cartItem }: CartProductProps) => {
  const dispatch = useAppDispatch();

  const handleIncrement = (id: string) => {
    dispatch(incrementQty(id));
    toast.success('Product quantity increased successfully!');
  };
  const handleDecrement = (id: string) => {
    dispatch(decrementQty(id));
    toast.success('Product quantity decreased successfully!');
  };
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));

    toast.success(
      'Product removed from cart' + cartItem.title + ' successfully' + '!'
    );
  };

  return (
    <div className="flex items-center justify-between border-b dark:text-slate-400 pb-3 border-slate-300 dark:border-slate-600 font-semibold text-sm mb-4">
      <div className="flex items-center gap-3">
        <Image
          src={cartItem?.imageUrl}
          alt="Product Image"
          className="rounded-xl w-20 h-20"
          width={250}
          height={250}
        />
        <div className="flex flex-col">
          <h2 className="uppercase">{cartItem.title}</h2>
        </div>
      </div>

      <div className=" rounded-xl border-gray-400 border flex gap-3 items-center">
        <button
          className="border-r border-gray-400 py-2  px-4"
          onClick={() => handleDecrement(cartItem.id)}
        >
          <Minus />
        </button>
        <p className="flex-grow">
          {cartItem.qty} {cartItem.qty > 1 ? 'items' : 'item'}
        </p>

        <button
          className="border-l border-gray-400 py-2  px-4"
          onClick={() => handleIncrement(cartItem.id)}
        >
          <Plus />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <h4>${cartItem.salePrice}</h4>
        <button onClick={() => handleRemove(cartItem.id)}>
          <Trash2 className="cursor-pointer text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
