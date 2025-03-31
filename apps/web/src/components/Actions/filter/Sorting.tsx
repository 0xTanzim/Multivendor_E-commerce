'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const Sorting = ({ title, isSearch }: { title: string; isSearch: boolean }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSort = searchParams.get('sort');

  const sortingOptions = [
    { id: 1, title: 'Relevance', value: '' },
    { id: 2, title: 'High to Low', value: 'desc' },
    { id: 3, title: 'Low to High', value: 'asc' },
  ];

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('sort', value);
      } else {
        params.delete('sort');
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, router]
  );

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">
        {isSearch ? `Search Results - ${title}` : `Products in - ${title}`}
      </h2>
      <div className="flex text-sm items-center gap-3">
        <p>Sort by:</p>
        <div className="flex items-center gap-2">
          {sortingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSortChange(option.value)}
              className={`border px-2 py-1 rounded ${
                currentSort === option.value
                  ? 'bg-slate-800 text-lime-400 border-lime-400'
                  : 'border-slate-500'
              }`}
            >
              {option.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sorting;
