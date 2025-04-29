import FilterComponent from '@/components/Actions/filter/FilterComponent';
import FilterProvider from '@/components/Actions/filter/provider/FilterProvider';
import { getData } from '@/lib/getData';
import { Category, isProductArray } from '@repo/types';

type IParams = {
  searchParams: Promise<{ [key: string]: string }>;
};

const SearchPage = async ({ searchParams }: IParams) => {
  const searchParamsData = await searchParams;

  const { sort, minPrice, maxPrice, search, page } = searchParamsData;

  let productsEndpoint = `products?catId=`;

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

  // Add search filtering if present
  if (search) {
    productsEndpoint += `&search=${search}`;
  }

  // Add page filtering if present
  if (page) {
    productsEndpoint += `&page=${page}`;
  }

  console.log(productsEndpoint);

  // Fetch products data
  const { products, totalPages, totalCount } = await getData(productsEndpoint);

  if (!isProductArray(products)) {
    return <div>Invalid data</div>;
  }

  const category = {
    title: search,
    slug: '',
  } as Category;

  return (
    <div>
      <FilterProvider
        products={products}
        totalPages={totalPages}
        totalCount={totalCount}
      >
        <FilterComponent
          category={category}
          isSearch={true}
          products={products}
        />
      </FilterProvider>
    </div>
  );
};

export default SearchPage;
