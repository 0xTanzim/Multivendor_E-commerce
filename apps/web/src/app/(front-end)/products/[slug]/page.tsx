import CategoryCarousel from '@/components/frontend/landing/CategoryCarousel';
import BreadCamp from '@/components/shared/BreadCamp';
import { getData } from '@/lib/getData';
import { isCategory } from '@repo/types';
import { BaggageClaim, Minus, Plus, Send, Share2, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const categoryData = await getData(`categories/67cabd8c077764d1596a2217`);

  let category;
  if (!isCategory(categoryData)) {
    category = null;
  }

  category = categoryData;

  return (
    <div>
      <BreadCamp />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <Image
            src={'/images/tometo.webp'}
            alt="Product Image"
            className="w-full"
            width={500}
            height={500}
          />
        </div>
        <div className="col-span-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg lg:text-2xl font-semibold">{slug}</h2>
            <button>
              <Share2 />
            </button>
          </div>
          <div className="border-b border-gray-300 dark:border-gray-600">
            <p className="py-2 ">
              Details about the product will go here. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Recusandae dolorem fugiat soluta
              totam ratione sit ipsum expedita labore nobis architecto.
            </p>
            <div className="flex items-center gap-4 pb-4">
              <p>
                SKU <span className="font-semibold">123456</span>
              </p>
              <p className="bg-lime-200  py-1.5 px-4 rounded-full ml-4 text-slate-900 ">
                Stock: <span className="font-semibold">In Stock</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 pt-4">
            <div className="flex items-center gap-4">
              <h4 className="text-slate-800 dark:text-slate-100 text-2xl font-semibold">
                $100
              </h4>
              <del className="text-slate-400 text-sm ">$120</del>
            </div>

            <p className="flex items-center">
              <Tag className="w-5 h-5 text-slate-400 me-2" />
              <span>Save 20% right now</span>
            </p>
          </div>
          <div className="flex justify-between items-center py-6">
            <div className=" rounded-xl border-gray-400 border flex gap-3 items-center">
              <button className="border-r border-gray-400 py-2  px-4">
                <Minus />
              </button>
              <p className="flex-grow">1</p>

              <button className="border-l border-gray-400 py-2  px-4 ">
                <Plus />
              </button>
            </div>

            <button className="flex items-center text-white  space-x-2 bg-lime-600 px-4 py-2 rounded-md ">
              <BaggageClaim /> <span>Add to Cart</span>
            </button>
          </div>
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
        {category && category?.products && (
          <CategoryCarousel products={category?.products} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
