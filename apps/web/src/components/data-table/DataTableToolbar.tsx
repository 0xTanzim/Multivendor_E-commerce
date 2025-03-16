'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { DataTableViewOptions } from './DataTableViewOptions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export type FilterKey = 'name' | 'email' | 'title';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterKeys: FilterKey[];
}

export function DataTableToolbar<TData>({
  table,
  filterKeys,
}: DataTableToolbarProps<TData>) {
  const isFiltered = filterKeys.some((key) => {
    const filterValue = table.getColumn(key)?.getFilterValue();
    return filterValue !== undefined && filterValue !== '';
  });

  const handleInputChange = (key: FilterKey, value: string) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    filterKeys.forEach((key) => {
      table.getColumn(key)?.setFilterValue('');
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterKeys.map((key) => (
          <Input
            key={key}
            placeholder={`Filter ${key}...`}
            value={(table.getColumn(key)?.getFilterValue() as string) ?? ''}
            onChange={(event) => handleInputChange(key, event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
