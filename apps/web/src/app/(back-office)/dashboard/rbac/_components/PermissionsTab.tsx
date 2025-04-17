'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Permission } from '@repo/types';
import { Edit, FolderTree, Loader2, PlusCircle, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import PermissionFormDialog from './PermissionFormDialog';
import { useRbac } from './RbacContext';

const PermissionsTab = () => {
  const {
    permissions,
    permissionGroups,
    loading,
    error,
    setSelectedPermission,
    fetchPermissions,
    fetchPermissionGroups,
  } = useRbac();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch permissions
        await fetchPermissions();

        // Fetch permission groups if not already loaded
        if (permissionGroups.length === 0) {
          await fetchPermissionGroups();
        }
      } catch (error) {
        // Error handling is done in context
      }
    };

    fetchData();
  }, [fetchPermissions, fetchPermissionGroups, permissionGroups.length]);

  const handleCreateClick = () => {
    setSelectedPermission(undefined);
    setIsCreateDialogOpen(true);
  };

  const handleEditClick = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsDeleteDialogOpen(true);
  };

  const getGroupName = (groupId?: string) => {
    if (!groupId) return 'Ungrouped';
    const group = permissionGroups.find((g) => g.id === groupId);
    return group ? group.name : 'Unknown Group';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading permissions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-600 dark:text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Permissions</h3>
        <Button onClick={handleCreateClick} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Add Permission
        </Button>
      </div>

      {permissions.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            No permissions found. Create your first permission to get started.
          </p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Action/Resource</TableHead>
                <TableHead>Group</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">
                    {permission.name}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {permission.description || '-'}
                  </TableCell>
                  <TableCell>
                    {permission.action}/{permission.resource}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 w-fit"
                    >
                      <FolderTree className="h-3 w-3" />
                      {getGroupName(permission.permissionGroupId)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(permission)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(permission)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <PermissionFormDialog
        mode="create"
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      <PermissionFormDialog
        mode="edit"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteConfirmDialog
        type="permission"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
};

export default PermissionsTab;
