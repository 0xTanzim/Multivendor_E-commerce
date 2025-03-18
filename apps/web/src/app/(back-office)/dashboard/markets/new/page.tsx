import FormHeader from '@/components/backOffice/form/FormHeader';
import MarketForm from '@/components/backOffice/markets/MarketForm';
import { getData } from '@/lib/getData';
import { isCategoryArray } from '@repo/types';

const NewMarketPage = async () => {
  const categoriesData: unknown = await getData('categories');

  if (!isCategoryArray(categoriesData)) {
    return <div>Failed to fetch categories</div>;
  }

  const categories = categoriesData.map((category) => ({
    id: category.id!,
    title: category.title,
  }));
  return (
    <div>
      <FormHeader title="New Market" />
      <MarketForm categories={categories} />
    </div>
  )
};

export default NewMarketPage;
