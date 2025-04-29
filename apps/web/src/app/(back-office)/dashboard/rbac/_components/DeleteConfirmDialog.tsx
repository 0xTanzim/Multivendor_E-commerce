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
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRbac } from './RbacContext';

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
  const {
    selectedRole,
    selectedPermission,
    selectedPermissionGroup,
    roles,
    permissions,
    permissionGroups,
    setRoles,
    setPermissions,
    setPermissionGroups,
    setError,
  } = useRbac();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const id =
    type === 'role'
      ? selectedRole?.id
      : type === 'permission'
        ? selectedPermission?.id
        : selectedPermissionGroup?.id;

  const entityName =
    type === 'role'
      ? selectedRole?.name
      : type === 'permission'
        ? selectedPermission?.name
        : selectedPermissionGroup?.name;

  let title = '';
  let description = '';

  switch (type) {
    case 'role': {
      title = 'Delete Role';
      if (selectedRole) {
        description = `Are you sure you want to delete the role "${entityName}"? This action cannot be undone.`;
      }
      break;
    }
    case 'permission': {
      title = 'Delete Permission';
      if (selectedPermission) {
        description = `Are you sure you want to delete the permission "${entityName}"? This action cannot be undone.`;
      }
      break;
    }
    case 'permission-group': {
      title = 'Delete Permission Group';
      if (selectedPermissionGroup) {
        description = `Are you sure you want to delete the permission group "${entityName}"? This action cannot be undone.`;
      }
      break;
    }
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
        setRoles(roles.filter((role) => role.id !== id));
      } else if (type === 'permission') {
        setPermissions(permissions.filter((p) => p.id !== id));
      } else {
        setPermissionGroups(
          permissionGroups.filter((group) => group.id !== id)
        );
      }

      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.`
      );
      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            {title}
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
