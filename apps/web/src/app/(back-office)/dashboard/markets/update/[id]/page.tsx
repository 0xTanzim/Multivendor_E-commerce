import FormHeader from '@/components/backOffice/form/FormHeader';

import { withPagePermission } from '@/lib';
import { getData } from '@/lib/getData';
import { isCategoryArray, isMarket } from '@repo/types';
import MarketForm from '../../_components/MarketForm';
type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateMarketPage = async ({ params }: IParams) => {
  const { id } = await params;

  await withPagePermission(['update:market']);

  const marketData = await getData(`markets/${id}`);
  console.log(marketData);

  let market = null;

  if (!isMarket(marketData)) {
    return (
      <div>
        <p>Market not found. Please check the ID or try again later.</p>
      </div>
    );
  } else {
    market = marketData;
  }

  const categoriesData: unknown = await getData(`categories`);

  if (!isCategoryArray(categoriesData)) {
    return <div>Failed to fetch categories</div>;
  }

  const categories = categoriesData.map((category) => ({
    id: category.id!,
    title: category.title,
  }));

  console.log(market);

  return (
    <div>
      <FormHeader title="Update Market" />
      {market && <MarketForm categories={categories} updateData={market} />}
    </div>
  );
};

export default UpdateMarketPage;
