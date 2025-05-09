import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PERMISSIONS, type Resource } from '@/constants/Permissions';
import { getPermissionKey } from '@/utils';
import { API_ENDPOINTS, EndpointKey } from '@repo/types';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import DeleteBtn from '../Actions/DeleteBtn';
import EditBtn from '../Actions/EditBtn';
import { HasPermission } from '../shared/auth/AuthGuard';
import { Button } from '../ui/button';

type ActionColumnProps = {
  row: Row<any>;
  title: string;
  endPointPath: EndpointKey;
  resource: Resource;
  showEdit?: boolean;
  showDelete?: boolean;
};

const ActionColumn = ({
  row,
  title,
  endPointPath,
  resource,
  showDelete = true,
  showEdit = true,
}: ActionColumnProps) => {
  const id = row.original.id;
  const apiEndPoint = `${API_ENDPOINTS[endPointPath]}/${id}`;
  const editEndpoint =
    endPointPath === 'trainings'
      ? `/community/update/${id}`
      : `${API_ENDPOINTS[endPointPath]}/update/${id}`;

  const deletePermission = PERMISSIONS[getPermissionKey('delete', resource)];
  const editPermission = PERMISSIONS[getPermissionKey('update', resource)];

  console.log('Permissions', {
    deletePermission,
    editPermission,
  });

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

        {showEdit && (
          <HasPermission requiredPermissions={editPermission}>
            <DropdownMenuItem>
              <EditBtn editEndpoint={editEndpoint} title={title} />
            </DropdownMenuItem>
          </HasPermission>
        )}

        {showDelete && (
          <HasPermission requiredPermissions={deletePermission}>
            <DropdownMenuItem>
              <DeleteBtn endpoint={apiEndPoint} title={title} />
            </DropdownMenuItem>
          </HasPermission>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionColumn;
