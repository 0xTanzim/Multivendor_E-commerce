'use client';

import { ChevronRightIcon, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BreadCamp = () => {
  const pathName = usePathname();

  const path = pathName.split('/');
  path.shift();

  return (
    <>
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <Home className="w-3 h-3 me-2.5" />
              Home
            </Link>
          </li>
          {path.map((item, index) => {
            return (
              <li key={index} className="inline-flex items-center">
                <div className="flex items-center">
                  <ChevronRightIcon className="w-3 h-3 rtl:rotate-180 mx-1 text-gray-400" />
                  <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {item}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default BreadCamp;
