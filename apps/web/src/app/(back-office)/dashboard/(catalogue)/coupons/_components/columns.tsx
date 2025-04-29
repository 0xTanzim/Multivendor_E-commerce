'use client';

import ActionColumn from '@/components/data-table-columns/ActionColumn';
import DateColumn from '@/components/data-table-columns/DateColumn';
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
      <SortableColumn column={column} title="Coupon Title" />
    ),
  },
  {
    accessorKey: 'couponCode',
    header: () => <div className="">Coupon Code</div>,
  },
  {
    accessorKey: 'isActive',
    header: () => <div className="">Active</div>,
  },

  {
    accessorKey: 'expiryDate',
    header: () => <div className="text-right">Expiry Date</div>,
    cell: ({ row }: { row: Row<any> }) => <DateColumn row={row} accessorKey='expiryDate' />,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }: { row: Row<any> }) => <DateColumn row={row} accessorKey='createdAt' />,
  },
  {
    id: 'actions',
    cell: ({ row }: { row: Row<any> }) => {
      return <ActionColumn row={row} title="Coupon" endPointPath='coupons' />;
    },
  },
];
