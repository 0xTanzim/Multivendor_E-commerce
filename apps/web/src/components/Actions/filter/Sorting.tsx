'use client';

import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
  ChevronDown,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const Sorting = ({ title, isSearch }: { title: string; isSearch: boolean }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = searchParams.get('sort');

  const sortingOptions = [
    {
      id: 1,
      title: 'Relevance',
      value: '',
      icon: <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" />,
    },
    {
      id: 2,
      title: 'Price: High to Low',
      value: 'desc',
      icon: <ArrowDownWideNarrow className="h-3.5 w-3.5 mr-1.5" />,
    },
    {
      id: 3,
      title: 'Price: Low to High',
      value: 'asc',
      icon: <ArrowUpWideNarrow className="h-3.5 w-3.5 mr-1.5" />,
    },
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
      setShowDropdown(false);
    },
    [pathname, searchParams, router]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current selected option
  const selectedOption =
    sortingOptions.find((option) => option.value === currentSort) ||
    sortingOptions[0];

  return (
    <div className="flex items-center justify-end">
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
            Sort:
          </span>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex items-center px-2.5 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:focus:ring-offset-slate-800 text-xs md:text-sm"
            aria-expanded={showDropdown}
            aria-haspopup="true"
          >
            <span className="flex items-center">
              {selectedOption?.icon}
              <span>{selectedOption?.title}</span>
            </span>
            <ChevronDown className="ml-1 h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black/5 dark:ring-white/10 z-10 overflow-hidden">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {sortingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-left px-3 py-1.5 text-xs md:text-sm flex items-center ${
                    currentSort === option.value
                      ? 'bg-lime-50 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                  role="menuitem"
                >
                  {option.icon}
                  {option.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sorting;
