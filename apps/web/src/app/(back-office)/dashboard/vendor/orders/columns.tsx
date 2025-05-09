'use client';

import ActionColumn from '@/components/data-table-columns/ActionColumn';
import DateColumn from '@/components/data-table-columns/DateColumn';
import ImageColumn from '@/components/data-table-columns/ImageColumn';
import LinkColumn from '@/components/data-table-columns/LinkColumn';
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
    accessorKey: 'title',
    header: ({ column }: { column: Column<any> }) => (
      <SortableColumn column={column} title="Title" />
    ),
  },
  {
    accessorKey: 'imageUrl',
    header: () => <div className="">Banner Image</div>,
    cell: ({ row }: { row: Row<any> }) => (
      <ImageColumn row={row} accessorKey="imageUrl" />
    ),
  },
  {
    accessorKey: 'link',
    header: () => <div className="">Banner Link</div>,
    cell: ({ row }: { row: Row<any> }) => (
      <LinkColumn row={row} accessorKey="link" />
    ),
  },
  {
    accessorKey: 'isActive',
    header: () => <div className="">Active</div>,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }: { row: Row<any> }) => (
      <DateColumn row={row} accessorKey="createdAt" />
    ),
  },

  {
    id: 'actions',
    cell: ({ row }: { row: Row<any> }) => {
      return (
        <ActionColumn
          row={row}
          title="Order"
          endPointPath="orders"
          resource="order"
        />
      );
    },
  },
];
