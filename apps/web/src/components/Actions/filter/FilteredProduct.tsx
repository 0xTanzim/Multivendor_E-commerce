import ProductItem from '@/components/shared/product/ProductItem';
import { Product } from '@repo/types';
import PaginationComponent from './Pagination';

type FilteredProductProps = {
  products: Product[];
  productCount?: number;
};

const FilteredProduct = async ({ products, productCount }: FilteredProductProps) => {
  if (!products || productCount === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">No products</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>

      <div className="px-8 mx-auto  py-6 flex items-center justify-center w-full ">
        <PaginationComponent />
      </div>
    </>
  );
};

export default FilteredProduct;
