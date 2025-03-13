import { getData } from '@/lib/getData';
import { isCategoryArray } from '@repo/types';
import Image from 'next/image';
import Link from 'next/link';

const SidebarCategories = async () => {
  const categoriesData = await getData('categories');

  if (!isCategoryArray(categoriesData)) {
    return null;
  }

  const categories = categoriesData;

  return (
    <>
      <div className="sm:col-span-3 hidden sm:block bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 overflow-hidden  ">
        <h2 className="bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-slate-100 py-3 px-6 font-semibold border-b  border-gray-300 dark:border-gray-600 ">
          Shop By Category{' '}
          <span className="text-sm">({categories?.length})</span>
        </h2>

        <div className="py-3 px-6 h-[300px] overflow-y-auto flex flex-col gap-2 ">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <Link
                href="#"
                className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-md duration-500 transition-all dark:text-slate-300 dark:hover:bg-slate-600"
                key={category.id}
              >
                <Image
                  src={category?.imageUrl || '/items/item2.jpg'}
                  width={200}
                  height={200}
                  alt={category?.title || 'Category'}
                  className="w-12 h-12 rounded-full object-cover border-lime-200"
                />

                <span className="text-sm">{category?.title}</span>
              </Link>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarCategories;
