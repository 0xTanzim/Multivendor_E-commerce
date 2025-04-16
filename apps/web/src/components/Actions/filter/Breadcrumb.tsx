'use client';

import { PAGE_SIZE } from '@/constants';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useFilterContext } from './provider/FilterProvider';

const Breadcrumb = ({
  title,
  resultCount,
}: {
  title: string;
  resultCount: number;
}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);
  const { totalPageCount } = useFilterContext();
  const pageSize = PAGE_SIZE;

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(startResult + pageSize - 1, resultCount);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="flex items-center text-xs md:text-sm text-slate-600 dark:text-slate-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-200"
            >
              <Home className="h-3.5 w-3.5 mr-1" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-slate-800 dark:text-slate-200">
                {title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="inline-flex items-center text-xs md:text-sm text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-full">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {startResult}-{endResult}
          </span>
          <span className="mx-1">of</span>
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {resultCount}
          </span>
          <span className="ml-0.5">products</span>
        </span>

        {totalPageCount > 1 && (
          <span className="ml-2 inline-flex items-center bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-full">
            <span>Page</span>
            <span className="mx-1 font-medium text-slate-700 dark:text-slate-200">
              {currentPage}
            </span>
            <span>of</span>
            <span className="ml-1 font-medium text-slate-700 dark:text-slate-200">
              {totalPageCount}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
