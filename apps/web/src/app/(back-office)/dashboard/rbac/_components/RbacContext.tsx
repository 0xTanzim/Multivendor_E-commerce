'use client';

import { Permission, PermissionGroup, Role } from '@repo/types';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

// Define the shape of our context state
interface RbacContextState {
  roles: Role[];
  permissions: Permission[];
  permissionGroups: PermissionGroup[];
  selectedRole: Role | null;
  selectedPermission: Permission | null;
  selectedPermissionGroup: PermissionGroup | null;
  loading: boolean;
  error: string | null;
  // Actions
  setRoles: (roles: Role[]) => void;
  setPermissions: (permissions: Permission[]) => void;
  setPermissionGroups: (groups: PermissionGroup[]) => void;
  setSelectedRole: (role: Role | null | undefined) => void;
  setSelectedPermission: (permission: Permission | null | undefined) => void;
  setSelectedPermissionGroup: (
    group: PermissionGroup | null | undefined
  ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // Helper functions
  fetchPermissions: () => Promise<void>;
  fetchPermissionGroups: () => Promise<void>;
  fetchRoles: () => Promise<void>;
}

// Create the context with default values
const RbacContext = createContext<RbacContextState | undefined>(undefined);

// Props for our provider component
interface RbacProviderProps {
  children: ReactNode;
  initialRoles: Role[];
  initialPermissions?: Permission[];
  initialPermissionGroups?: PermissionGroup[];
}

// Create the provider component
export const RbacProvider = ({
  children,
  initialRoles,
  initialPermissions = [],
  initialPermissionGroups = [],
}: RbacProviderProps) => {
  // State variables
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [permissions, setPermissions] =
    useState<Permission[]>(initialPermissions);
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>(
    initialPermissionGroups
  );
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [selectedPermissionGroup, setSelectedPermissionGroup] =
    useState<PermissionGroup | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Helper functions to fetch data
  const fetchPermissions = useCallback(async () => {
    if (permissions.length > 0) return;

    try {
      setLoading(true);
      const response = await fetch('/api/permissions');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch permissions');
      }

      setPermissions(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [permissions.length]);

  const fetchPermissionGroups = useCallback(async () => {
    if (permissionGroups.length > 0) return;

    try {
      setLoading(true);
      const response = await fetch('/api/permission-groups');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch permission groups');
      }

      setPermissionGroups(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [permissionGroups.length]);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/roles');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch roles');
      }

      setRoles(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Wrap setters to match the expected signature in RbacContextState
  const handleSetSelectedRole = (role: Role | null | undefined) => setSelectedRole(role ?? null);
  const handleSetSelectedPermission = (permission: Permission | null | undefined) => setSelectedPermission(permission ?? null);
  const handleSetSelectedPermissionGroup = (group: PermissionGroup | null | undefined) => setSelectedPermissionGroup(group ?? null);

  // Context value
  const value: RbacContextState = {
    roles,
    permissions,
    permissionGroups,
    selectedRole,
    selectedPermission,
    selectedPermissionGroup,
    loading,
    error,
    setRoles,
    setPermissions,
    setPermissionGroups,
    setSelectedRole: handleSetSelectedRole,
    setSelectedPermission: handleSetSelectedPermission,
    setSelectedPermissionGroup: handleSetSelectedPermissionGroup,
    setLoading,
    setError,
    fetchPermissions,
    fetchPermissionGroups,
    fetchRoles,
  };

  return <RbacContext.Provider value={value}>{children}</RbacContext.Provider>;
};

// Custom hook to use the context
export const useRbac = () => {
  const context = useContext(RbacContext);
  if (context === undefined) {
    throw new Error('useRbac must be used within a RbacProvider');
  }
  return context;
};
