import FormHeader from '@/components/backOffice/form/FormHeader';
import ProductForm from '@/components/backOffice/product/ProductForm';
import { getData } from '@/lib/getData';
import { isCategoryArray, isFarmers } from '@repo/types';

const NewProductPage = async () => {
  // Categories and Farmers
  const categoriesData: unknown = await getData('categories');
  const farmersData = await getData('farmers');

  if (!isCategoryArray(categoriesData)) {
    return <div>Failed to fetch categories</div>;
  }

  const categories = categoriesData.map((category) => ({
    id: category.id!,
    title: category.title,
  }));

  let allFarmersData = null;

  if (!isFarmers(farmersData)) {
    allFarmersData = null;
  } else {
    allFarmersData = farmersData;
  }

  console.log('allFarmersData', allFarmersData);

  const farmers =
    (allFarmersData &&
      allFarmersData.map((farmer) => ({
        id: farmer.user?.id,
        title: farmer.user?.name,
      }))) ||
    [];

  return (
    <div>
      <FormHeader title="New Product" />
      {
        // @ts-ignore
        <ProductForm categories={categories} farmers={farmers} />
      }
    </div>
  );
};

export default NewProductPage;
