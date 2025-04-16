'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  children,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-3xl">
            {description}
          </p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;
