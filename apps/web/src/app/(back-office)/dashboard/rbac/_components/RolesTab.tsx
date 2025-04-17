'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { setRoles, setSelectedRole } from '@repo/redux';
import { Role } from '@repo/types';
import { ChevronRight, Edit, Loader2, PlusCircle, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import RoleFormDialog from './RoleFormDialog';
import RolePermissionsDialog from './RolePermissionsDialog';

// Helper function to organize roles into a hierarchy
const organizeRolesHierarchy = (roles: Role[]) => {
  // Create a map of roles by ID for easy lookup
  const roleMap = new Map<string, Role & { level: number; children: Role[] }>();

  // Initialize with roles and empty children arrays
  roles.forEach((role) => {
    roleMap.set(role.id, { ...role, level: 0, children: [] });
  });

  // Identify top-level roles and build the hierarchy
  const topLevelRoles: (Role & { level: number; children: Role[] })[] = [];

  roleMap.forEach((role) => {
    if (role.parentId) {
      const parent = roleMap.get(role.parentId);
      if (parent) {
        parent.children.push(role);
        role.level = parent.level + 1;
      } else {
        // If parent doesn't exist (should not happen), treat as top level
        topLevelRoles.push(role);
      }
    } else {
      // No parent, so it's a top-level role
      topLevelRoles.push(role);
    }
  });

  // Now flatten the hierarchy for rendering
  const flattenHierarchy = (
    roles: (Role & { level: number; children: Role[] })[],
    result: (Role & { level: number })[] = []
  ) => {
    roles.forEach((role) => {
      result.push({ ...role, level: role.level });
      if (role.children && role.children.length > 0) {
        flattenHierarchy(role.children as (Role & { level: number; children: Role[] })[], result);
      }
    });
    return result;
  };

  return flattenHierarchy(topLevelRoles);
};

type RolesTabProps = {
  initialRoles: Role[];
};

const RolesTab = ({ initialRoles }: RolesTabProps) => {
  const dispatch = useAppDispatch();
  const { roles, loading, error } = useAppSelector((state) => state.rbac);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);

  // Set initial roles from props
  useEffect(() => {
    if (initialRoles.length > 0) {
      dispatch(setRoles(initialRoles));
    }
  }, [initialRoles, dispatch]);

  const handleCreateClick = () => {
    dispatch(setSelectedRole(undefined));
    setIsCreateDialogOpen(true);
  };

  const handleEditClick = (role: Role) => {
    dispatch(setSelectedRole(role));
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (role: Role) => {
    dispatch(setSelectedRole(role));
    setIsDeleteDialogOpen(true);
  };

  const handlePermissionsClick = (role: Role) => {
    dispatch(setSelectedRole(role));
    setIsPermissionsDialogOpen(true);
  };

  // Get parent role name helper
  const getParentRoleName = (parentId: string | null | undefined) => {
    if (!parentId) return null;
    const parent = roles.find((r) => r.id === parentId);
    return parent ? parent.name : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading roles...</span>
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

  const hierarchicalRoles = organizeRolesHierarchy(roles);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Roles</h3>
        <Button onClick={handleCreateClick} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Add Role
        </Button>
      </div>

      {roles.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            No roles found. Create your first role to get started.
          </p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hierarchicalRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {role.level > 0 && (
                        <span
                          className="mr-2"
                          style={{ marginLeft: `${role.level * 1.5}rem` }}
                        >
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </span>
                      )}
                      <span
                        className={`font-medium ${
                          role.isDefault
                            ? 'text-blue-600 dark:text-blue-400'
                            : ''
                        }`}
                      >
                        {role.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {role.description || '-'}
                  </TableCell>
                  <TableCell>
                    {getParentRoleName(role.parentId) || '-'}
                  </TableCell>
                  <TableCell>
                    {role.isDefault ? (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        Default
                      </span>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePermissionsClick(role)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                      >
                        Permissions
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(role)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(role)}
                        disabled={
                          role.isDefault ||
                          (role.users?.length ?? 0) > 0 ||
                          (role.children?.length ?? 0) > 0
                        }
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
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

      <RoleFormDialog
        mode="create"
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      <RoleFormDialog
        mode="edit"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <DeleteConfirmDialog
        type="role"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />

      <RolePermissionsDialog
        open={isPermissionsDialogOpen}
        onOpenChange={setIsPermissionsDialogOpen}
      />
    </div>
  );
};

export default RolesTab;
