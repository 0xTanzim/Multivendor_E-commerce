import { Filter as FilterIcon, SlidersHorizontal } from 'lucide-react';
import PriceFilter from './PriceFilter';

const Filter = ({ slug }: { slug: string }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
        <SlidersHorizontal className="h-5 w-5 text-lime-600 dark:text-lime-400" />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Filters
        </h2>
      </div>

      <div className="space-y-6">
        <div className="filter-section">
          <div className="flex items-center space-x-2 mb-3">
            <FilterIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <h3 className="text-base font-medium text-slate-800 dark:text-slate-200">
              Price Range
            </h3>
          </div>
          <PriceFilter />
        </div>

        {/* Additional filter sections can be added here */}
      </div>
    </div>
  );
};

export default Filter;
