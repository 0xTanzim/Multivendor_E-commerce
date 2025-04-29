'use client';
import { XCircle } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const PriceFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentMinPrice = searchParams.get('minPrice');
  const currentMaxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort');

  const [customMin, setCustomMin] = useState<number | string>(
    currentMinPrice || ''
  );
  const [customMax, setCustomMax] = useState<number | string>(
    currentMaxPrice || ''
  );

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('minPrice');
    params.delete('maxPrice');
    router.push(`${pathname}?${params.toString()}`);
    setCustomMin('');
    setCustomMax('');
  };

  const handlePriceFilter = (min?: number, max?: number) => {
    const params = new URLSearchParams(searchParams);

    if (min !== undefined) params.set('minPrice', min.toString());
    if (max !== undefined) params.set('maxPrice', max.toString());

    if (sort) {
      params.set('sort', sort);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCustomPriceFilter = () => {
    const min = parseFloat(customMin as string);
    const max = parseFloat(customMax as string);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      handlePriceFilter(min, max);
    } else if (!isNaN(min) && isNaN(max)) {
      handlePriceFilter(min);
    } else if (isNaN(min) && !isNaN(max)) {
      handlePriceFilter(undefined, max);
    }
  };

  const priceRange = [
    { id: 1, display: 'Under $200', min: 0, max: 200 },
    { id: 2, display: '$200 - $500', min: 200, max: 500 },
    { id: 3, display: '$500 - $1000', min: 500, max: 1000 },
    { id: 4, display: 'Over $1000', min: 1000, max: 999999 },
  ];

  return (
    <div className="flex flex-col gap-4">
      {currentMinPrice || currentMaxPrice ? (
        <div className="mb-2 flex items-center">
          <span className="text-sm bg-lime-50 dark:bg-slate-700 text-lime-800 dark:text-lime-300 py-1 px-3 rounded-full mr-2 inline-flex items-center">
            {currentMinPrice && currentMaxPrice
              ? `$${currentMinPrice} - $${currentMaxPrice}`
              : currentMinPrice
                ? `Min: $${currentMinPrice}`
                : `Max: $${currentMaxPrice}`}
            <button onClick={handleReset} className="ml-1 focus:outline-none">
              <XCircle className="h-4 w-4" />
            </button>
          </span>
        </div>
      ) : null}

      {/* Price Range Filters using pill buttons */}
      <div className="flex flex-col gap-2">
        {priceRange.map((price) => {
          const isActive =
            currentMinPrice === price.min.toString() &&
            currentMaxPrice === price.max.toString();

          return (
            <button
              key={price.id}
              onClick={() => handlePriceFilter(price.min, price.max)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-lime-600 text-white dark:bg-lime-700 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-lime-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {price.display}
            </button>
          );
        })}
      </div>

      {/* Custom Price Input Filters */}
      <div className="mt-4 bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
        <div className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
          Custom Range
        </div>
        <div className="flex gap-2">
          <div className="relative rounded-md shadow-sm flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={customMin}
              onChange={(e) => setCustomMin(e.target.value)}
              placeholder="Min"
              className="block w-full rounded-md border-0 py-2 pl-7 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 dark:bg-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="relative rounded-md shadow-sm flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={customMax}
              onChange={(e) => setCustomMax(e.target.value)}
              placeholder="Max"
              className="block w-full rounded-md border-0 py-2 pl-7 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 dark:bg-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          onClick={handleCustomPriceFilter}
          className="mt-3 py-2 px-4 w-full text-white bg-lime-600 hover:bg-lime-700 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 dark:focus:ring-offset-slate-800"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
