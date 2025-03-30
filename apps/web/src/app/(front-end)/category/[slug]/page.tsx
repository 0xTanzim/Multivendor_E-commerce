import FilterComponent from '@/components/Actions/filter/FilterComponent';
import FilterProvider from '@/components/Actions/filter/provider/FilterProvider';
import { getData } from '@/lib/getData';
import { isCategory, isProductArray } from '@repo/types';

type IParams = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

const CategoryPage = async ({ params, searchParams }: IParams) => {
  const { slug } = await params;
  const searchParamsData = await searchParams;

  const { sort, minPrice, maxPrice, page } = searchParamsData;

  const categoriesData = await getData(`categories/filter/${slug}`);

  if (!isCategory(categoriesData)) {
    return <div>Invalid data</div>;
  }

  let productsEndpoint = `products?catId=${categoriesData.id}`;

  // Add sorting if present
  if (sort) {
    productsEndpoint += `&sort=${sort}`;
  }

  // Add price filtering if present
  if (minPrice && maxPrice) {
    productsEndpoint += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  } else {
    if (minPrice) {
      productsEndpoint += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
      productsEndpoint += `&maxPrice=${maxPrice}`;
    }
  }

  // Add page filtering if present
  if (page) {
    productsEndpoint += `&page=${page}`;
  }

  // Fetch products data
  const { products, totalPages, totalCount } = await getData(productsEndpoint);

  if (!isProductArray(products)) {
    return <div>Invalid data</div>;
  }

  console.log(await getData(productsEndpoint));

  return (
    <div>
      <FilterProvider
        products={products}
        totalPages={totalPages}
        totalCount={totalCount}
      >
        <FilterComponent category={categoriesData} products={products} />
      </FilterProvider>
    </div>
  );
};

export default CategoryPage;
