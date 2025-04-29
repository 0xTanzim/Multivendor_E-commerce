import FilterComponent from '@/components/Actions/filter/FilterComponent';
import FilterProvider from '@/components/Actions/filter/provider/FilterProvider';
import { getData } from '@/lib/getData';
import { isCategory, isProductArray } from '@repo/types';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type IParams = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

const CategoryPage = async ({ params, searchParams }: IParams) => {
  const { slug } = await params;
  const searchParamsData = await searchParams;

  const { sort, minPrice, maxPrice, page } = searchParamsData;

  const categoriesData = await getData(`categories/filter/${slug}`);

  if (!isCategory(categoriesData)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 dark:text-red-400">
            Category not found
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            The category you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center text-lime-600 dark:text-lime-400 hover:underline"
          >
            <ChevronRight className="h-4 w-4 mr-1" />
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  let productsEndpoint = `products?catId=${categoriesData.id}`;

  // Add sorting if present
  if (sort) {
    productsEndpoint += `&sort=${sort}`;
  }

  // Add price filtering if present
  if (minPrice && maxPrice) {
    productsEndpoint += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  } else {
    if (minPrice) {
      productsEndpoint += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
      productsEndpoint += `&maxPrice=${maxPrice}`;
    }
  }

  // Add page filtering if present
  if (page) {
    productsEndpoint += `&page=${page}`;
  }

  // Fetch products data
  const { products, totalPages, totalCount } = await getData(productsEndpoint);

  if (!isProductArray(products)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-amber-500 dark:text-amber-400">
            Invalid data
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            We couldn't retrieve the product data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Optional: Hero image section if category has an image
  const showHero = categoriesData.imageUrl;
  return (
    <div className="animate-fadeIn">
      {showHero && (
        <div className="relative w-full h-40 md:h-64 mb-6 rounded-lg overflow-hidden">
          <Image
            src={categoriesData.imageUrl || '/images/placeholder-banner.webp'}
            alt={categoriesData.title || 'Category'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 w-full">
              <h1 className="text-white text-2xl md:text-4xl font-bold drop-shadow-sm">
                {categoriesData.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <FilterProvider
        products={products}
        totalPages={totalPages}
        totalCount={totalCount}
      >
        <FilterComponent category={categoriesData} products={products} />
      </FilterProvider>
    </div>
  );
};

export default CategoryPage;
