import NewMarketForm from '@/components/backOffice/markets/NewMarketForm';
import { getData } from '@/lib/getData';
import { isCategoryArray } from '@repo/types';

const NewMarketPage =async () => { 
  const categoriesData: unknown = await getData('categories');

  if (!isCategoryArray(categoriesData)) {
      return <div>Failed to fetch categories</div>;
    }

    const categories = categoriesData.map((category) => ({
      id: category.id!,
      title: category.title,
    }));


  return <NewMarketForm categories={categories} />;
};

export default NewMarketPage;
