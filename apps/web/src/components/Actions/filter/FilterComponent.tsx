import { Category, Product } from '@repo/types';
import Breadcrumb from './Breadcrumb';
import Filter from './Filter';
import FilteredProduct from './FilteredProduct';
import Sorting from './Sorting';

type FilterComponentProps = {
  category: Category;
  products: Product[];
};

const FilterComponent = ({ category, products }: FilterComponentProps) => {
  const { title, slug } = category;

  const productCount = products.length;

  return (
    <div>
      <div className="bg-white space-y-6 text-slate-900 py-6 px-4 ">
        <Breadcrumb title={title} resultCount={productCount} />
        <Sorting title={title} slug={slug} />
      </div>

      <div className="grid grid-cols-12 py-8 px-2 gap-4">
        <div className="col-span-3">
          <Filter slug={slug} />
        </div>
        <div className="col-span-9">
          <FilteredProduct products={products} productCount={productCount} />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
