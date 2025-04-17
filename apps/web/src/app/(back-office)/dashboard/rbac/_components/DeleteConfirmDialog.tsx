'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import {
  setError,
  setPermissionGroups,
  setPermissions,
  setRoles,
} from '@repo/redux';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface DeleteConfirmDialogProps {
  type: 'role' | 'permission' | 'permission-group';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteConfirmDialog = ({
  type,
  open,
  onOpenChange,
}: DeleteConfirmDialogProps) => {
  const dispatch = useAppDispatch();
  const {
    selectedRole,
    selectedPermission,
    selectedPermissionGroup,
    roles,
    permissions,
    permissionGroups,
  } = useAppSelector((state) => state.rbac);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine title, description, and entity to delete based on type
  const title = `Delete ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  let description = 'Are you sure? This action cannot be undone.';
  let entityName = '';
  let id = '';

  switch (type) {
    case 'role':
      if (selectedRole) {
        entityName = selectedRole.name;
        id = selectedRole.id;
        description = `Are you sure you want to delete the role "${entityName}"? This action cannot be undone.`;
      }
      break;
    case 'permission':
      if (selectedPermission) {
        entityName = selectedPermission.name;
        id = selectedPermission.id;
        description = `Are you sure you want to delete the permission "${entityName}"? This action cannot be undone.`;
      }
      break;
    case 'permission-group':
      if (selectedPermissionGroup) {
        entityName = selectedPermissionGroup.name;
        id = selectedPermissionGroup.id;
        description = `Are you sure you want to delete the permission group "${entityName}"? This action cannot be undone.`;
      }
      break;
  }

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsSubmitting(true);

      const endpoint =
        type === 'role'
          ? '/api/roles'
          : type === 'permission'
            ? '/api/permissions'
            : '/api/permission-groups';

      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Failed to delete ${type}`);
      }

      // Update state based on type
      if (type === 'role') {
        dispatch(setRoles(roles.filter((role) => role.id !== id)));
      } else if (type === 'permission') {
        dispatch(setPermissions(permissions.filter((p) => p.id !== id)));
      } else {
        dispatch(
          setPermissionGroups(permissionGroups.filter((g) => g.id !== id))
        );
      }

      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.`
      );

      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setError(message));
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
