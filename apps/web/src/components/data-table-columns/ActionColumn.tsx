import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { API_ENDPOINTS, EndpointKey } from '@repo/types';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import DeleteBtn from '../Actions/DeleteBtn';
import EditBtn from '../Actions/EditBtn';
import { Button } from '../ui/button';

const ActionColumn = ({
  row,
  title,
  endPointPath,
}: {
  row: Row<any>;
  title: string;
  endPointPath: EndpointKey;
}) => {
  const id = row.original.id;
  const endPoint = `${API_ENDPOINTS[endPointPath]}/${id}`;
  const editEndpoint = `${API_ENDPOINTS[endPointPath]}/update/${id}`;

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
        <DropdownMenuItem>
          <DeleteBtn endpoint={endPoint} title={title} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EditBtn editEndpoint={editEndpoint} title={title} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionColumn;
