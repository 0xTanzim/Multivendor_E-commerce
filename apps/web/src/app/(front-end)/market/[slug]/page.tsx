import CategoryList from '@/components/frontend/landing/CategoryList';
import BreadCamp from '@/components/shared/BreadCamp';
import { getData } from '@/lib/getData';
import { isCategoryArray, isMarket } from '@repo/types';
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
    return <div className="text-center">Market not found</div>;
  }

  const marketCategoryIds = market.categoryIds;

  const filteredCategories = categories?.filter((category) =>
    marketCategoryIds.includes(category.id ?? '')
  );

  return (
    <>
      <BreadCamp />
      <div className=" bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 overflow-hidden   px-3 flex items-center gap-6 py-4">
        <div className="">
          <Image
            width={100}
            height={100}
            src={market?.logoUrl ?? '/images/tometo.webp'}
            alt="market"
            className="rounded-full w-16 h-16 object-cover"
          />
        </div>
        <div className="">
          <h2 className="py-4 text-base lg:text-2xl">{market?.title}</h2>

          <p className="text-sm line-clamp-2 mb-4">{market?.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 py-8 w-full">
        <div className="col-span-full sm:col-span-12 bg-white dark:bg-slate-800 rounded-lg p-4">
          {filteredCategories &&
            filteredCategories.length > 0 &&
            filteredCategories.map((category) => (
              <div className="space-y-8" key={category.id}>
                <CategoryList category={category} isMarketPage={true} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default marketPage;
