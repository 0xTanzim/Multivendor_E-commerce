import { Category } from '@repo/types';
import { ChevronRight, Package2 } from 'lucide-react';
import Link from 'next/link';
import CategoryCarousel from './CategoryCarousel';

type CategoryListProps = {
  category: Category;
  isMarketPage?: boolean;
};

const CategoryList = ({ category, isMarketPage }: CategoryListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
      <div className="bg-gradient-to-r from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 py-4 px-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-lime-100 dark:bg-slate-900 p-2 rounded-lg">
              <Package2 className="h-5 w-5 text-lime-600 dark:text-lime-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {category?.title}
            </h2>
            {category?.products && (
              <span className="text-xs bg-lime-100 dark:bg-slate-600 text-lime-800 dark:text-lime-200 py-1 px-2 rounded-full font-medium">
                {category.products.length} products
              </span>
            )}
          </div>

          <Link
            href={`/category/${category?.slug}`}
            className="flex items-center space-x-1 bg-lime-600 hover:bg-lime-700 transition-colors text-white rounded-md px-4 py-2 shadow-sm"
          >
            <span className="font-medium">View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {category?.description && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 ml-10">
            {category.description}
          </p>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-gray-800">
        {category?.products && category.products.length > 0 ? (
          <CategoryCarousel
            products={category?.products}
            isMarketPage={isMarketPage}
          />
        ) : (
          <div className="flex items-center justify-center h-40 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400">
              No products available in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
