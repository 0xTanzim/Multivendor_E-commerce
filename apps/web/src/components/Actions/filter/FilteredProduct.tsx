import ProductItem from '@/components/shared/product/ProductItem';
import { Product } from '@repo/types';
import { PackageOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PaginationComponent from './Pagination';

type FilteredProductProps = {
  products: Product[];
  productCount?: number;
  viewMode?: 'grid' | 'list';
};

const FilteredProduct = ({
  products,
  productCount,
  viewMode = 'grid',
}: FilteredProductProps) => {
  if (!products || productCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <PackageOpen className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
          No products found
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-sm">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 relative flex-shrink-0">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={product.imageUrl || '/images/placeholder.webp'}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      width={192}
                      height={192}
                    />
                  </Link>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <Link
                      href={`/product/${product.slug}`}
                      className="inline-block mb-1 hover:text-lime-600 dark:hover:text-lime-400"
                    >
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      {product.discount && product.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-lime-600 dark:text-lime-400">
                            $
                            {(
                              product.price -
                              product.price * (product.discount / 100)
                            ).toFixed(2)}
                          </span>
                          <span className="ml-2 text-sm text-slate-500 dark:text-slate-400 line-through">
                            ${product.sellPrice}
                          </span>
                          <span className="ml-2 text-xs font-medium bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200 py-0.5 px-1.5 rounded">
                            {product.discount}% off
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          ${product.productPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {product.productStock > 0 ? (
                        <span className="text-lime-600 dark:text-lime-400">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-500">Out of Stock</span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-lime-600 rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-6 flex items-center justify-center w-full">
          <PaginationComponent />
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="transform transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>

      <div className="py-6 flex items-center justify-center w-full">
        <PaginationComponent />
      </div>
    </div>
  );
};

export default FilteredProduct;
