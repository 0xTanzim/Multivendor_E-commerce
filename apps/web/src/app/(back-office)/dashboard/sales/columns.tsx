'use client';

import DateColumn from '@/components/data-table-columns/DateColumn';
import ImageColumn from '@/components/data-table-columns/ImageColumn';
import SortableColumn from '@/components/data-table-columns/SortableColumn';
import { Checkbox } from '@/components/ui/checkbox';

import { Column, Row, Table } from '@tanstack/react-table';

export const columns = [
  {
    id: 'select',
    header: ({ table }: { table: Table<any> }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<any> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'productTitle',
    header: ({ column }: { column: Column<any> }) => (
      <SortableColumn column={column} title="Product Title"  />
    ),
  },

  {
    accessorKey: 'productImageUrl',
    header: () => <div className="">Product Image</div>,
    cell: ({ row }: { row: Row<any> }) => (
      <ImageColumn row={row} accessorKey="productImageUrl" />
    ),
  },
  {
    accessorKey: 'productPrice',
    header: () => <div className="">Price</div>,
  },
  {
    accessorKey: 'productQty',
    header: () => <div className="">Qty</div>,
  },
  {
    accessorKey: 'total',
    header: () => <div className="">Image</div>,
  },

  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }: { row: Row<any> }) => (
      <DateColumn row={row} accessorKey="createdAt" />
    ),
  },
];
