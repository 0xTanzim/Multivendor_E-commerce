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

  console.log('totalPageCount', totalPageCount);

  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage =
    currentPage < totalPageCount ? currentPage + 1 : totalPageCount;

  const pages = Array.from({ length: totalPageCount }, (_, index) => index + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageLink(previousPage)} />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageLink(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPageCount > 5 && currentPage < totalPageCount - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext href={createPageLink(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
