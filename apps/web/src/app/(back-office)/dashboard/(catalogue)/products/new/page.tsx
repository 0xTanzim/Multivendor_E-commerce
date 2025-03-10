import NewProductForm from '@/components/backOffice/product/NewProductForm';
import { getData } from '@/lib/getData';
import { isCategoryArray, isFarmers } from '@repo/types';

const NewProductPage = async () => {
  // Categories and Farmers
  const categoriesData: unknown = await getData('categories');
  const farmersData: unknown = await getData('farmers');

  if (!isCategoryArray(categoriesData)) {
    return <div>Failed to fetch categories</div>;
  }

  if (!isFarmers(farmersData)) {
    return <div>Failed to fetch users</div>;
  }

  const categories = categoriesData.map((category) => ({
    id: category.id!,
    title: category.title,
  }));

  const farmers = farmersData.map((farmer) => ({
    id: farmer.id!,
    title: farmer.name,
  }));

  return <NewProductForm categories={categories} farmers={farmers} />;
};

export default NewProductPage;
