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
import { Role } from '@repo/types';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRbac } from './RbacContext';

const RolePermissionsTab = () => {
  const { roles, permissions, loading, error, setRoles, fetchPermissions } =
    useRbac();

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch permissions if not already loaded
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Update selectedRole when selectedRoleId changes
  useEffect(() => {
    if (selectedRoleId) {
      const role = roles.find((r) => r.id === selectedRoleId);
      if (role) {
        setSelectedRole(role);
        setRolePermissions(role.permissions?.map((p) => p.id) || []);
      }
    } else {
      setSelectedRole(null);
      setRolePermissions([]);
    }
  }, [selectedRoleId, roles]);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setRolePermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  const handleSavePermissions = async () => {
    if (!selectedRoleId) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/roles/${selectedRoleId}/permissions`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissionIds: rolePermissions }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update role permissions');
      }

      // Update the role in the state
      const updatedRoles = roles.map((role) =>
        role.id === selectedRoleId
          ? {
              ...role,
              permissions: permissions.filter((p) =>
                rolePermissions.includes(p.id)
              ),
            }
          : role
      );

      setRoles(updatedRoles);
      toast.success('Role permissions updated successfully');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter permissions based on search query
  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (permission.description &&
        permission.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-600 dark:text-red-400">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium">Permission Assignment</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Assign permissions to roles to control what actions users can
            perform.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Selection */}
        <div className="lg:col-span-1 border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b dark:border-gray-700">
            <h4 className="font-medium">Select Role</h4>
          </div>
          <div className="p-2 max-h-[500px] overflow-y-auto">
            <ul className="space-y-1">
              {roles.map((role) => (
                <li key={role.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedRoleId === role.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    {role.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Permissions List */}
        <div className="lg:col-span-2 border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b dark:border-gray-700 flex justify-between items-center">
            <h4 className="font-medium">
              {selectedRole
                ? `Permissions for ${selectedRole.name}`
                : 'Select a role to manage permissions'}
            </h4>
            {selectedRole && (
              <Button
                size="sm"
                onClick={handleSavePermissions}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Permissions'
                )}
              </Button>
            )}
          </div>

          {selectedRole ? (
            <div className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search permissions..."
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6">
                          No permissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPermissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={rolePermissions.includes(permission.id)}
                              onChange={() =>
                                handlePermissionToggle(permission.id)
                              }
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {permission.name}
                          </TableCell>
                          <TableCell>{permission.resource}</TableCell>
                          <TableCell>{permission.action}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
              <ShieldCheck className="h-12 w-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No Role Selected</h3>
              <p>Select a role from the list to manage its permissions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePermissionsTab;
