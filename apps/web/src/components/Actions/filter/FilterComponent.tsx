'use client';

import { Product } from '@repo/types';
import { Filter as FilterIcon, Grid2X2, Layout, Tag } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import Filter from './Filter';
import FilteredProduct from './FilteredProduct';
import Sorting from './Sorting';

type Category = {
  title: string;
  slug: string;
  description?: string;
};

type FilterComponentProps = {
  category: Category;
  products: Product[];
  isSearch?: boolean;
};

const FilterComponent = ({
  category,
  products,
  isSearch = false,
}: FilterComponentProps) => {
  const { title, slug, description } = category;
  const productCount = products.length;
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  return (
    <div className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Category Header - Compact & Modern */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="h-4 w-4 text-lime-600 dark:text-lime-400" />
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
        </div>

        {description && (
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-3xl mb-4">
            {description}
          </p>
        )}

        <Breadcrumb title={title} resultCount={productCount} />
      </div>

      {/* Controls Bar - Streamlined */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
        <div className="p-3 md:p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMobileFilter}
              className="md:hidden flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            >
              <FilterIcon className="h-3.5 w-3.5 mr-1" />
              Filters
            </button>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium">{productCount}</span>{' '}
              products
            </p>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'grid'
                    ? 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300'
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'list'
                    ? 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300'
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Layout className="h-4 w-4" />
              </button>
            </div>

            <Sorting title={title} isSearch={isSearch} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Filter Panel - Collapsible on Mobile */}
        <div
          className={`lg:col-span-3 ${showMobileFilter ? 'block' : 'hidden md:block'}`}
        >
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 sticky top-4">
            <div className="p-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Filters
                </h3>
                <button
                  onClick={toggleMobileFilter}
                  className="md:hidden text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  ×
                </button>
              </div>
              <Filter slug={slug} />
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-9">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="p-4">
              <FilteredProduct
                products={products}
                productCount={productCount}
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
