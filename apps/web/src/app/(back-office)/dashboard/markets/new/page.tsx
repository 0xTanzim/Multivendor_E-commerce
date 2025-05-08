import FormHeader from '@/components/backOffice/form/FormHeader';

import { withPagePermission } from '@/lib';
import { getData } from '@/lib/getData';
import { isCategoryArray } from '@repo/types';
import MarketForm from '../_components/MarketForm';

const NewMarketPage = async () => {
  await withPagePermission(['create:market']);

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
  );
};

export default NewMarketPage;
