'use client';

import { Product } from '@repo/types';
import ProductItem from './ProductItem';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="transform transition-transform hover:scale-[1.02]"
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
