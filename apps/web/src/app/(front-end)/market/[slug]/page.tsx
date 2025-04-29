import CategoryList from '@/components/frontend/landing/CategoryList';
import BreadCamp from '@/components/shared/BreadCamp';
import { getData } from '@/lib/getData';
import { isCategoryArray, isMarket } from '@repo/types';
import { Globe, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

type IParams = {
  params: Promise<{ slug: string }>;
};

const marketPage = async ({ params }: IParams) => {
  const { slug } = await params;

  const categoriesData = await getData('categories?include=products');
  let categories = null;

  if (!isCategoryArray(categoriesData)) {
    categories = null;
  } else {
    categories = categoriesData;
  }

  const marketData = await getData(`markets/details/${slug}`);

  let market = null;

  if (!isMarket(marketData)) {
    market = null;
  } else {
    market = marketData;
  }

  if (!market) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 dark:text-red-400">
            Market not found
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            The market you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const marketCategoryIds = market.categoryIds;

  const filteredCategories = categories?.filter((category) =>
    marketCategoryIds.includes(category.id ?? '')
  );

  return (
    <>
      <BreadCamp />

      {/* Market Hero Section */}
      <div className="relative mb-8">
        <div className="h-40 md:h-60 w-full bg-gradient-to-r from-lime-500 to-emerald-600 rounded-xl overflow-hidden">
          {market.coverImageUrl && (
            <Image
              src={market.coverImageUrl ?? '/images/market-cover.webp'}
              alt={`${market.title} cover`}
              fill
              className="object-cover opacity-30 mix-blend-overlay"
              priority
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row -mt-12 md:-mt-16 relative z-10">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Image
                width={120}
                height={120}
                src={market?.logoUrl ?? '/images/tometo.webp'}
                alt={market.title || 'Market logo'}
                className="rounded-full border-4 border-white dark:border-slate-700 shadow-md w-24 h-24 md:w-32 md:h-32 object-cover bg-white"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {market?.title}
              </h1>
              <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-3xl">
                {market?.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                {market.address && (
                  <span className="inline-flex items-center text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    <MapPin className="h-3 w-3 mr-1 text-lime-600 dark:text-lime-400" />
                    <span className="text-slate-700 dark:text-slate-200">
                      {market.address}
                    </span>
                  </span>
                )}
                {market.phone && (
                  <span className="inline-flex items-center text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    <Phone className="h-3 w-3 mr-1 text-lime-600 dark:text-lime-400" />
                    <span className="text-slate-700 dark:text-slate-200">
                      {market.phone}
                    </span>
                  </span>
                )}
                {market.website && (
                  <span className="inline-flex items-center text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    <Globe className="h-3 w-3 mr-1 text-lime-600 dark:text-lime-400" />
                    <span className="text-slate-700 dark:text-slate-200">
                      {market.website}
                    </span>
                  </span>
                )}
                {/* {market.hours && (
                  <span className="inline-flex items-center text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    <Clock className="h-3 w-3 mr-1 text-lime-600 dark:text-lime-400" />
                    <span className="text-slate-700 dark:text-slate-200">
                      {market.hours}
                    </span>
                  </span>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-3">
          Products available at {market.title}
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          {filteredCategories && filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="border-b border-slate-200 dark:border-slate-700 last:border-0"
              >
                <CategoryList category={category} isMarketPage={true} />
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                No products available at this market right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default marketPage;
