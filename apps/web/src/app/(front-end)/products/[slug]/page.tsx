import ProductImageCarousel from '@/components/frontend/carousel/ProductImageCarousel';
import CategoryCarousel from '@/components/frontend/landing/CategoryCarousel';
import { ProductShareBtn } from '@/components/frontend/product/ProductShareBtn';

import AddCartButton from '@/components/shared/AddCartButton';
import BreadCamp from '@/components/shared/BreadCamp';
import { appConfig } from '@/config/app.config';
import { getData } from '@/lib/getData';
import { isProduct, isProductArray } from '@repo/types';
import { Send, Tag } from 'lucide-react';
import Link from 'next/link';

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const productData = await getData(`products/product/${slug}`);

  if (!isProduct(productData)) {
    return <div>Product not found</div>;
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

  return (
    <div>
      <BreadCamp />

      <div className="grid grid-cols-12 gap-8">
        <ProductImageCarousel
          thumbnail={product.imageUrl ?? ''}
          productImages={product.productImages ?? []}
        />
        <div className="col-span-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg lg:text-2xl font-semibold">
              {product.title}
            </h2>
            <ProductShareBtn productUrl={productUrl} />
          </div>
          <div className="border-b border-gray-300 dark:border-gray-600">
            <p className="py-2 ">{product.description}</p>
            <div className="flex items-center gap-4 pb-4">
              <p>
                SKU <span className="font-semibold">{product.sku}</span>
              </p>
              <p className="bg-lime-200  py-1.5 px-4 rounded-full ml-4 text-slate-900 ">
                Stock:{' '}
                <span className="font-semibold">{product.productStock}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 pt-4">
            <div className="flex items-center gap-4">
              <h4 className="text-slate-800 dark:text-slate-100 text-2xl font-semibold">
                ${product.sellPrice}
              </h4>
              <del className="text-slate-400 text-sm ">
                ${product.productPrice}
              </del>
            </div>

            <p className="flex items-center">
              <Tag className="w-5 h-5 text-slate-400 me-2" />

              <span>
                Save{' '}
                {calculatePercentage(
                  product.sellPrice ?? 0,
                  product.productPrice ?? 0
                )}
                % right now
              </span>
            </p>
          </div>
          <AddCartButton product={product} />
        </div>

        <div className=" col-span-3 hidden sm:block bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 overflow-hidden">
          <h2 className="bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-slate-100 py-3 px-6 font-semibold border-b  border-gray-300 dark:border-gray-600 ">
            DELIVERY & RETURNS
          </h2>
          <div className="p-4">
            <div className="flex rounded-lg py-2 px-4 bg-orange-400 text-slate-50 items-center gap-3">
              <span>MindFuel Express</span>
              <Send />
            </div>

            <div className="py-3  dark:text-slate-200 border-b border-gray-500 ">
              Eligible for Free Delivery. <br />
              <Link href={`#`}>View Details</Link>
            </div>

            <div className="">
              <h2 className="dark:text-slate-200 py-2 ">
                Choose your Location
              </h2>

              <div className=" mb-3">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>
              </div>

              <div className=" mb-3">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>
              </div>

              <div className="pb-3  ">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 dark:bg-slate-700 rounded my-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-200 ml-3">
          Simillar Products
        </h2>
        {categoryProducts && categoryProducts && (
          <CategoryCarousel products={categoryProducts} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
