'use client';
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
    { id: 2, display: 'Between $200 and $500', min: 200, max: 500 },
    { id: 3, display: 'Between $500 and $1000', min: 500, max: 1000 },
    { id: 4, display: 'Above $1000', min: 1000, max: 999999 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Price</h2>
        <button className="text-blue-600" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Price Range Filters using circular buttons */}
      <div className="flex flex-wrap gap-3">
        {priceRange.map((price) => {
          const isActive =
            currentMinPrice === price.min.toString() &&
            currentMaxPrice === price.max.toString();

          return (
            <button
              key={price.id}
              onClick={() => handlePriceFilter(price.min, price.max)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isActive
                  ? 'bg-lime-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              } transition-all hover:bg-lime-600 hover:text-white`}
            >
              {price.display}
            </button>
          );
        })}
      </div>

      {/* Custom Price Input Filters */}
      <div className="mt-4">
        <div className="flex gap-2">
          <input
            type="number"
            value={customMin}
            onChange={(e) => setCustomMin(e.target.value)}
            placeholder="Min Price"
            className="p-2 border rounded-md w-full sm:w-32"
          />
          <input
            type="number"
            value={customMax}
            onChange={(e) => setCustomMax(e.target.value)}
            placeholder="Max Price"
            className="p-2 border rounded-md w-full sm:w-32"
          />
        </div>
        <button
          onClick={handleCustomPriceFilter}
          className="mt-2 p-2 w-full  text-white bg-blue-600 rounded-md"
        >
          Apply Custom Range
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
