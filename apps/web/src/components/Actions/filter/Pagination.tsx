'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { useFilterContext } from './provider/FilterProvider';

const PaginationComponent = () => {
  const { totalPageCount } = useFilterContext();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // If there's only one page, don't show pagination
  if (totalPageCount <= 1) {
    return null;
  }

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage =
    currentPage < totalPageCount ? currentPage + 1 : totalPageCount;

  // Generate pagination items with ellipsis for large page counts
  const generatePaginationItems = () => {
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          href={createPageLink(1)}
          isActive={1 === currentPage}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
            1 === currentPage
              ? 'bg-lime-600 text-white hover:bg-lime-700'
              : 'hover:bg-lime-50 dark:hover:bg-lime-900/20'
          }`}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Add ellipsis if needed before middle pages
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis className="text-slate-400 dark:text-slate-500" />
        </PaginationItem>
      );
    }

    // Middle pages
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPageCount - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i === 1 || i === totalPageCount) continue; // Skip first and last pages as they are handled separately

      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={createPageLink(i)}
            isActive={i === currentPage}
            className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
              i === currentPage
                ? 'bg-lime-600 text-white hover:bg-lime-700'
                : 'hover:bg-lime-50 dark:hover:bg-lime-900/20'
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis if needed after middle pages
    if (currentPage < totalPageCount - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis className="text-slate-400 dark:text-slate-500" />
        </PaginationItem>
      );
    }

    // Always show last page if it's different from the first page
    if (totalPageCount > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            href={createPageLink(totalPageCount)}
            isActive={totalPageCount === currentPage}
            className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
              totalPageCount === currentPage
                ? 'bg-lime-600 text-white hover:bg-lime-700'
                : 'hover:bg-lime-50 dark:hover:bg-lime-900/20'
            }`}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="py-8">
      <Pagination>
        <PaginationContent className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 flex-wrap gap-2">
          <PaginationItem>
            <PaginationPrevious
              href={createPageLink(previousPage)}
              className={`font-medium rounded-md bg-slate-100 dark:bg-slate-700 me-4 text-slate-800 dark:text-slate-200 transition-colors hover:bg-lime-50 dark:hover:bg-lime-900/20 ${
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }`}
            />
          </PaginationItem>

          {generatePaginationItems()}

          <PaginationItem>
            <PaginationNext
              href={createPageLink(nextPage)}
              className={`font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors hover:bg-lime-50 dark:hover:bg-lime-900/20 ${
                currentPage === totalPageCount
                  ? 'pointer-events-none opacity-50'
                  : ''
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
