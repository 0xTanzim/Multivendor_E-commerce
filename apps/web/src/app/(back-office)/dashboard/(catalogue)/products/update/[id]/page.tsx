import FormHeader from '@/components/backOffice/form/FormHeader';
import ProductForm from '@/components/backOffice/product/ProductForm';
import { getData } from '@/lib/getData';
import { isCategoryArray, isFarmers, isProduct } from '@repo/types';

type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateProductPage = async ({ params }: IParams) => {
  const { id } = await params;

  const productData: unknown = await getData(`products/${id}`);

  let product = null;

  if (!isProduct(productData)) {
    product = null;
    return <div>Failed to fetch product</div>;
  } else {
    product = productData;
  }

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

  return (
    <div>
      <FormHeader title="Update Product" />
      {product && (
        <ProductForm
          product={product}
          categories={categories}
          farmers={farmers}
        />
      )}
    </div>
  );
};

export default UpdateProductPage;
