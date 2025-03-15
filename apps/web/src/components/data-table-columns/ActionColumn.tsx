import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
const ActionColumn = ({ row, title }: { row: Row<any>; title: string }) => {
  const isActive = row.getValue('isActive');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Delete {title} </DropdownMenuItem>
        <DropdownMenuItem>Edit {title}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionColumn;
