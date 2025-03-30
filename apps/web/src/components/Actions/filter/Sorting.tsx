'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type SortingProps = {
  title: string;
  slug?: string;
};

const Sorting = ({ title, slug }: SortingProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort');

  const sortingLinks = [
    { id: 1, title: 'Relevance', href: `/category/${slug}` },
    {
      id: 2,
      title: 'High to Low',
      href: `/category/${slug}?sort=desc`,
      params: 'desc',
    },
    {
      id: 3,
      title: 'Low to High',
      href: `/category/${slug}?sort=asc`,
      params: 'asc',
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Search Results - {title}</h2>
      <div className="flex text-sm items-center gap-3">
        <p>Sort by:</p>
        <div className="flex items-center gap-2">
          {sortingLinks.map((link) => {
            const isActive =
              currentSort === link.params || (!currentSort && !link.params);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`border px-2 py-1 rounded ${isActive ? 'bg-slate-800 text-lime-400 border-lime-400' : 'border-slate-500'}`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sorting;
