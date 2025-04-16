import FilterComponent from '@/components/Actions/filter/FilterComponent';
import FilterProvider from '@/components/Actions/filter/provider/FilterProvider';
import PageHeader from '@/components/ui/PageHeader';
import { getData } from '@/lib/getData';
import { isProductArray } from '@repo/types';

type IParams = {
  searchParams: Promise<{ [key: string]: string }>;
};

const ProductsPage = async ({ searchParams }: IParams) => {
  const searchParamsData = await searchParams;

  const { sort, minPrice, maxPrice, search, page } = searchParamsData;

  let productsEndpoint = 'products?';

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
  } else {
    productsEndpoint += `&page=1`;
  }

  // Fetch products data
  const { products, totalPages, totalCount } = await getData(productsEndpoint);

  if (!isProductArray(products)) {
    return <div>Invalid data</div>;
  }

  const category = {
    title: 'All Products',
    slug: 'all-products',
    description: 'Browse our complete collection of fresh and organic products',
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto mb-8">
        <PageHeader
          title="All Products"
          description="Browse our complete collection of fresh and organic products"
          className="text-center"
        />
      </div>
      <FilterProvider
        products={products}
        totalPages={totalPages}
        totalCount={totalCount}
      >
        <FilterComponent
          category={category}
          isSearch={false}
          products={products}
        />
      </FilterProvider>
    </div>
  );
};

export default ProductsPage;
