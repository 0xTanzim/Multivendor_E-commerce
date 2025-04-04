import FormHeader from '@/components/backOffice/form/FormHeader';
import MarketForm from '@/components/backOffice/markets/MarketForm';
import { getData } from '@/lib/getData';
import { isCategoryArray, isMarket } from '@repo/types';
type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateMarketPage = async ({ params }: IParams) => {
  const { id } = await params;

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
