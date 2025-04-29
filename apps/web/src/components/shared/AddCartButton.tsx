'use client';
import { defaultProductImage } from '@/constants';
import { useAppDispatch } from '@/hooks/storeHook';
import { addToCart } from '@repo/redux';
import { Product } from '@repo/types';
import { BaggageClaim } from 'lucide-react';
import toast from 'react-hot-toast';

type props = {
  product: Product;
};

const AddCartButton = ({ product }: props) => {
  const dispatch = useAppDispatch();

  const handleAddCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id ?? '',
        title: product.title,
        salePrice: product.sellPrice ?? 0,
        imageUrl: product.imageUrl || defaultProductImage,
        qty: 1,
        vendorId: product.userId ?? '',
      })
    );

    toast.success(
      'Product added to cart' + product.title + ' successfully' + '!'
    );
  };

  return (
    <div className="flex justify-between items-center py-6">
      <button
        className="flex items-center text-white  space-x-2 bg-lime-600 px-4 py-2 rounded-md"
        onClick={() => handleAddCart(product)}
      >
        <BaggageClaim /> <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default AddCartButton;
