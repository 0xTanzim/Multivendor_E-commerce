'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setError, setPermissions, setRoles } from '@repo/redux';
import { isPermissionArray, isRole, Permission } from '@repo/types';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface RolePermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RolePermissionsDialog = ({
  open,
  onOpenChange,
}: RolePermissionsDialogProps) => {
  const dispatch = useAppDispatch();
  const {
    selectedRole,
    permissions: allPermissions,
    permissionGroups,
    roles,
  } = useAppSelector((state) => state.rbac);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch permissions if not already loaded
  useEffect(() => {
    const fetchPermissions = async () => {
      if (allPermissions.length > 0) return;

      try {
        setIsLoadingPermissions(true);
        const response = await fetch('/api/permissions');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch permissions');
        }

        if (!isPermissionArray(data)) {
          throw new Error('Invalid response data format');
        }

        dispatch(setPermissions(data));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(setError(message));
        toast.error(message);
      } finally {
        setIsLoadingPermissions(false);
      }
    };

    if (open) {
      fetchPermissions();
    }
  }, [dispatch, allPermissions.length, open]);

  // Initialize selected permissions when dialog opens
  useEffect(() => {
    if (open && selectedRole) {
      // Extract permission IDs from selected role
      const selectedIds = selectedRole.permissions?.map((p) => p.id) || [];
      setSelectedPermissions(selectedIds);
    }
  }, [open, selectedRole]);

  // Filter permissions based on search query
  const filteredPermissions = allPermissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (permission.description || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Group permissions by their group
  const permissionsByGroup = filteredPermissions.reduce(
    (acc, permission) => {
      const groupId = permission.permissionGroupId || 'ungrouped';
      if (!acc[groupId]) {
        acc[groupId] = [];
      }
      acc[groupId].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  const handleSelectAllInGroup = (
    groupPermissions: Permission[],
    selected: boolean
  ) => {
    const permissionIds = groupPermissions.map((p) => p.id);

    setSelectedPermissions((prev) => {
      if (selected) {
        // Add all permissions that aren't already selected
        return [...new Set([...prev, ...permissionIds])];
      } else {
        // Remove all permissions from this group
        return prev.filter((id) => !permissionIds.includes(id));
      }
    });
  };

  const getGroupName = (groupId: string) => {
    if (groupId === 'ungrouped') return 'Ungrouped';
    const group = permissionGroups.find((g) => g.id === groupId);
    return group ? group.name : 'Unknown Group';
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `/api/roles/${selectedRole.id}/permissions`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            permissionIds: selectedPermissions,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update role permissions');
      }

      if (!isRole(data)) {
        throw new Error('Invalid response data format');
      }

      // Update the roles state
      dispatch(
        setRoles(roles.map((role) => (role.id === data.id ? data : role)))
      );

      toast.success('Role permissions updated successfully.');

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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Manage Role Permissions</DialogTitle>
          <DialogDescription>
            {selectedRole ? (
              <span>
                Assign permissions to the{' '}
                <strong className="text-primary">{selectedRole.name}</strong>{' '}
                role.
              </span>
            ) : (
              'Loading role details...'
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search permissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60"
              />

              <Badge variant="outline" className="ml-2">
                {selectedPermissions.length} Selected
              </Badge>
            </div>
          </div>

          {isLoadingPermissions ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <span>Loading permissions...</span>
            </div>
          ) : (
            <ScrollArea className="h-[400px] rounded-md border p-4">
              {Object.keys(permissionsByGroup).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No permissions found.
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(permissionsByGroup).map(
                    ([groupId, perms]) => {
                      const groupName = getGroupName(groupId);
                      const allChecked = perms.every((p) =>
                        selectedPermissions.includes(p.id)
                      );
                      const someChecked =
                        !allChecked &&
                        perms.some((p) => selectedPermissions.includes(p.id));

                      return (
                        <div key={groupId} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`select-all-${groupId}`}
                                checked={allChecked}
                                onCheckedChange={(checked) =>
                                  handleSelectAllInGroup(perms, !!checked)
                                }
                              />
                              <Label
                                htmlFor={`select-all-${groupId}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {groupName}{' '}
                                <span className="text-gray-500">
                                  ({perms.length})
                                </span>
                              </Label>
                            </div>
                          </div>
                          <div className="pl-6 space-y-1">
                            {perms.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`permission-${permission.id}`}
                                  checked={selectedPermissions.includes(
                                    permission.id
                                  )}
                                  onCheckedChange={() =>
                                    handlePermissionToggle(permission.id)
                                  }
                                />
                                <Label
                                  htmlFor={`permission-${permission.id}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {permission.name}
                                  <div className="text-xs text-gray-500 mt-1">
                                    {permission.resource}.{permission.action}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-2" />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </ScrollArea>
          )}
        </div>

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
            onClick={handleSavePermissions}
            disabled={!selectedRole || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Permissions'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RolePermissionsDialog;
