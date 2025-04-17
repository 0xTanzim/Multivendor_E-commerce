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
import { PermissionGroup } from '@repo/types';
import { Edit, FolderTree, Loader2, PlusCircle, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import PermissionGroupFormDialog from './PermissionGroupFormDialog';
import { useRbac } from './RbacContext';

const PermissionGroupsTab = () => {
  const {
    permissionGroups,
    loading,
    error,
    setSelectedPermissionGroup,
    fetchPermissionGroups,
  } = useRbac();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchPermissionGroups();
  }, [fetchPermissionGroups]);

  const handleCreateClick = () => {
    setSelectedPermissionGroup(undefined);
    setIsCreateDialogOpen(true);
  };

  const handleEditClick = (group: PermissionGroup) => {
    setSelectedPermissionGroup(group);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (group: PermissionGroup) => {
    setSelectedPermissionGroup(group);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading permission groups...</span>
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
        <h3 className="text-lg font-medium">Permission Groups</h3>
        <Button onClick={handleCreateClick} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      {permissionGroups.length === 0 ? (
        <div className="text-center py-10 text-slate-500 dark:text-slate-400">
          <p className="mb-2">No permission groups found</p>
          <Button
            variant="outline"
            onClick={handleCreateClick}
            className="mt-2"
          >
            Create your first permission group
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissionGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FolderTree className="h-4 w-4 text-slate-500" />
                    {group.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">
                      {group.permissions?.length || 0} permissions
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(group)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(group)}
                        disabled={
                          group.permissions && group.permissions.length > 0
                        }
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

      <PermissionGroupFormDialog
        mode="create"
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      <PermissionGroupFormDialog
        mode="edit"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteConfirmDialog
        type="permission-group"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
};

export default PermissionGroupsTab;
