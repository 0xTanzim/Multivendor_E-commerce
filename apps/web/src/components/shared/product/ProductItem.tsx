'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { addToCart } from '@repo/redux';
import { Product } from '@repo/types';
import { Heart, ShoppingBag } from 'lucide-react';
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

  const handleAddCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id ?? '',
        title: product.title,
        salePrice: product.sellPrice ?? 0,
        imageUrl: product.imageUrl || defaultImage,
        qty: 1,
        vendorId: product.userId ?? '',
      })
    );

    toast.success(`${product.title} added to cart`);
  };

  // Calculate discount percentage if both prices are available
  const hasDiscount =
    product.productPrice &&
    product.sellPrice &&
    product.productPrice > product.sellPrice;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.productPrice - (product.sellPrice as number)) /
          product.productPrice) *
          100
      )
    : 0;

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md">
      <div className="relative overflow-hidden">
        {/* Product Image with hover zoom effect */}
        <Link
          href={`/products/${product?.slug}`}
          className="block h-52 overflow-hidden"
        >
          <Image
            src={product?.imageUrl?.trim() ? product.imageUrl : defaultImage}
            alt={product?.title || 'Product Image'}
            width={550}
            height={550}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-lime-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Stock indicator */}
        {product.productStock && product.productStock < 5 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Product category (if available) */}
        {product.title && (
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            {product.title}
          </div>
        )}

        {/* Product title */}
        <Link href={`/products/${product?.slug}`}>
          <h2 className="font-medium mb-2 line-clamp-2 h-12 dark:text-slate-200 text-slate-800 hover:text-lime-600 dark:hover:text-lime-400 transition-colors">
            {product?.title}
          </h2>
        </Link>

        {/* Price information */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-slate-900 dark:text-white">
            ${product?.sellPrice?.toFixed(2)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
              ${product?.productPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleAddCart(product)}
            className="flex items-center space-x-1 bg-lime-600 hover:bg-lime-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>

          <button
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
