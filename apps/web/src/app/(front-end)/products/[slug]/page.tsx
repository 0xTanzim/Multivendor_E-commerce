import ProductImageCarousel from '@/components/frontend/carousel/ProductImageCarousel';
import CategoryCarousel from '@/components/frontend/landing/CategoryCarousel';
import { ProductShareBtn } from '@/components/frontend/product/ProductShareBtn';
import AddCartButton from '@/components/shared/AddCartButton';
import BreadCamp from '@/components/shared/BreadCamp';
import { appConfig } from '@/config/app.config';
import { getData } from '@/lib/getData';
import { isProduct, isProductArray } from '@repo/types';
import { Check, Package, Send, ShieldCheck, Star, Truck } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const productData = await getData(`products/product/${slug}`);

  if (!isProduct(productData)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const product = productData;
  const catId = product.categoryId;
  const categoryProductData = await getData(`products/category/${catId}`);

  if (!isProductArray(categoryProductData)) {
    return <div>Category not found</div>;
  }

  const categoryProducts = categoryProductData.filter(
    (item) => item.id !== product.id
  );

  const calculatePercentage = (sellPrice: number, productPrice: number) => {
    const discount = ((productPrice - sellPrice) / productPrice) * 100;
    return discount.toFixed(0);
  };

  const productUrl = `${appConfig.baseUrl}/products/${product.slug}`;
  const discountPercentage = calculatePercentage(
    product.sellPrice ?? 0,
    product.productPrice ?? 0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadCamp />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Product Images - Takes full width on mobile, 40% on larger screens */}
          <div className="w-full md:w-2/5 p-4">
            <Suspense
              fallback={
                <div className="h-[400px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
              }
            >
              <ProductImageCarousel
                thumbnail={product.imageUrl ?? ''}
                productImages={product.productImages ?? []}
              />
            </Suspense>
          </div>

          {/* Product Details - Takes full width on mobile, 60% on larger screens */}
          <div className="w-full md:w-3/5 p-6">
            <div className="flex flex-col">
              {/* Product Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h1>
                <ProductShareBtn productUrl={productUrl} />
              </div>

              {/* Product Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`w-5 h-5 ${rating <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  (128 reviews)
                </span>
              </div>

              {/* Product Description */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {product.description}
                </p>
              </div>

              {/* Product Info */}
              <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    SKU: <span className="font-semibold">{product.sku}</span>
                  </span>
                </div>
                <div className="flex items-center px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">
                    {product.productStock > 10
                      ? 'In Stock'
                      : product.productStock > 0
                        ? 'Low Stock'
                        : 'Out of Stock'}
                    :{' '}
                    <span className="font-semibold">
                      {product.productStock}
                    </span>
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.sellPrice}
                  </h2>
                  {product.productPrice &&
                    product.productPrice > product.sellPrice! && (
                      <del className="text-lg text-gray-400">
                        ${product.productPrice}
                      </del>
                    )}
                </div>
                {discountPercentage && Number(discountPercentage) > 0 && (
                  <div className="flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <span className="text-sm font-medium text-red-800 dark:text-red-300">
                      Save {discountPercentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="mb-8">
                <AddCartButton product={product} />
              </div>

              {/* Shipping & Returns */}
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Shipping & Returns
                </h3>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Free shipping on orders over $50
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      30-day money-back guarantee
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Quality checked by our team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery & Returns Card - Only shown on larger screens */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Delivery Options
          </h2>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex rounded-lg py-2 px-4 bg-orange-400 text-white items-center gap-2">
                <span className="font-medium">MindFuel Express</span>
                <Send className="w-4 h-4" />
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Eligible for Free Delivery on orders over $50.{' '}
              <Link
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Details
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Choose your Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>

              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
                <option>Florida</option>
              </select>

              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Los Angeles</option>
                <option>San Francisco</option>
                <option>San Diego</option>
                <option>Sacramento</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {categoryProducts && categoryProducts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm my-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Similar Products
          </h2>
          <Suspense
            fallback={
              <div className="h-[200px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            }
          >
            <CategoryCarousel products={categoryProducts} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
