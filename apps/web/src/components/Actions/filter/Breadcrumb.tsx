'use client';

import { PAGE_SIZE } from '@/constants';
import { ChevronRight } from 'lucide-react';
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
  // const endResult = Math.min(currentPage * pageSize, resultCount);
  const endResult = Math.min(startResult + pageSize - 1, resultCount);

  return (
    <div className="flex text-xs items-center justify-between">
      <div className="flex items-center *:gap-2 ">
        <Link href="/">Home</Link>
        <ChevronRight className="mx-2 w-5 h-5" />
        <p>{title}</p>
      </div>
      {/* <p>1-20 of {resultCount} results</p> */}
      <p className="text-gray-500">
        {startResult}-{endResult} of {resultCount} results
        {totalPageCount > 1 && (
          <span className="text-gray-500">
            {' '}
            | Page {currentPage} of {totalPageCount}
          </span>
        )}
      </p>
    </div>
  );
};

export default Breadcrumb;
