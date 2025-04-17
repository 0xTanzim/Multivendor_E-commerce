// Role and permission management slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission, PermissionGroup, Role } from '@repo/types';

// Define the state interface
export interface RbacState {
  roles: Role[];
  permissions: Permission[];
  permissionGroups: PermissionGroup[];
  selectedRole: Role | null;
  selectedPermission: Permission | null;
  selectedPermissionGroup: PermissionGroup | null;
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialState: RbacState = {
  roles: [],
  permissions: [],
  permissionGroups: [],
  selectedRole: null,
  selectedPermission: null,
  selectedPermissionGroup: null,
  loading: false,
  error: null,
};

// Create the slice
const rbacSlice = createSlice({
  name: 'rbac',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.permissions = action.payload;
    },
    setPermissionGroups: (state, action: PayloadAction<PermissionGroup[]>) => {
      state.permissionGroups = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<Role | null>) => {
      state.selectedRole = action.payload;
    },
    setSelectedPermission: (
      state,
      action: PayloadAction<Permission | null>
    ) => {
      state.selectedPermission = action.payload;
    },
    setSelectedPermissionGroup: (
      state,
      action: PayloadAction<PermissionGroup | null | undefined>
    ) => {
      state.selectedPermissionGroup = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setRoles,
  setPermissions,
  setPermissionGroups,
  setSelectedRole,
  setSelectedPermission,
  setSelectedPermissionGroup,
  setLoading,
  setError,
} = rbacSlice.actions;

export default rbacSlice.reducer;
