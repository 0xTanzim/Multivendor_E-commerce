import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';

const Filter = ({ slug }: { slug: string }) => {
  return (
    <div>
      <PriceFilter />
      <BrandFilter />
    </div>
  );
};

export default Filter;
