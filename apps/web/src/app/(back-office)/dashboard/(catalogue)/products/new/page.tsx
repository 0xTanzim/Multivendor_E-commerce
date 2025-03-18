import FormHeader from '@/components/backOffice/form/FormHeader';
import ProductForm from '@/components/backOffice/product/ProductForm';
import { getData } from '@/lib/getData';
import { isCategoryArray, isFarmers, isUserArray } from '@repo/types';

const NewProductPage = async () => {
  // Categories and Farmers
  const categoriesData: unknown = await getData('categories');
  const farmersData = await getData('farmers');

  if (!isCategoryArray(categoriesData)) {
    return <div>Failed to fetch categories</div>;
  }

  let allFarmersData = null;

  if (!isFarmers(farmersData) && !isUserArray(farmersData)) {
    allFarmersData = null;
  } else {
    allFarmersData = farmersData;
  }

  const categories = categoriesData.map((category) => ({
    id: category.id!,
    title: category.title,
  }));

  const farmers = allFarmersData.map((farmer) => ({
    id: farmer.id!,
    title: farmer.name,
  }));

  console.log(farmersData);

  return (
    <div>
      <FormHeader title="New Product" />
      <ProductForm categories={categories} farmers={farmers} />;
    </div>
  );
};

export default NewProductPage;
