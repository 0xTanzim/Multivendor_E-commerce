'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { addToCart } from '@repo/redux';
import { Product } from '@repo/types';
import { BaggageClaim } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

type ProductItemProps = {
  product: Product;
};

const defaultImage = '/images/tometo.webp';

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  const handleAddCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        salePrice: product.sellPrice,
        imageUrl: product.imageUrl || defaultImage,
        qty: 1,
      })
    );

    toast.success(
      'Product added to cart' + product.title + ' successfully' + '!'
    );
  };

  return (
    <div
      key={product.id}
      className="rounded-lg mr-3  bg-white dark:bg-slate-900 border shadow-md  overflow-hidden"
    >
      <Link href={`/products/${product?.slug}`}>
        <Image
          src={product?.imageUrl?.trim() ? product.imageUrl : defaultImage}
          alt={product?.title || 'Product Image'}
          width={550}
          height={550}
          className="w-full rounded-sm h-48 object-cover"
        />
      </Link>

      <div className="px-4">
        <Link href={`/products/${product?.slug}`}>
          <h2 className=" text-center font-semibold my-2 dark:text-slate-200  text-slate-800">
            {product?.title}
          </h2>
        </Link>

        <div className="flex justify-between gap-2 pb-3 items-center dark:text-slate-200  text-slate-800">
          <p>$ {product?.sellPrice}</p>

          <button
            onClick={() => handleAddCart()}
            className="flex items-center text-white  space-x-2 bg-lime-600 px-4 py-2 rounded-md "
          >
            <BaggageClaim /> <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
