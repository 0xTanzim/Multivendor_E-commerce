import { IAuthUser } from './auth';

export interface Role {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  permissions?: Permission[];
  permissionIds?: string[];
  userCount?: number;

  parent?: Role;
  children?: Role[];

  users?: IAuthUser[];
}

export interface Permission {
  id: string;
  name: string;
  action: string;
  resource: string;
  description?: string;
  permissionGroupId?: string;
  permissionGroup?: PermissionGroup;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionGroup {
  id: string;
  name: string;
  permissions?: Permission[];
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  role?: Role;
  permission?: Permission;
}

// Form interfaces
export interface RoleFormData {
  name: string;
  description?: string;
  parentId?: string;
  isDefault?: boolean;
  permissionIds?: string[];
}

export interface PermissionFormData {
  name: string;
  description?: string;
  permissionGroupId?: string;
  action: string;
  resource: string;
}

export interface PermissionGroupFormData {
  name: string;
}

// Helper type guard functions
export function isRole(obj: any): obj is Role {
  return obj && typeof obj === 'object' && 'name' in obj;
}

export function isRoleArray(obj: any): obj is Role[] {
  return Array.isArray(obj) && (obj.length === 0 || isRole(obj[0]));
}

export function isPermission(obj: any): obj is Permission {
  return obj && typeof obj === 'object' && 'name' in obj;
}

export function isPermissionArray(obj: any): obj is Permission[] {
  return Array.isArray(obj) && (obj.length === 0 || isPermission(obj[0]));
}

export function isPermissionGroup(obj: any): obj is PermissionGroup {
  return obj && typeof obj === 'object' && 'name' in obj;
}

export function isPermissionGroupArray(obj: any): obj is PermissionGroup[] {
  return Array.isArray(obj) && (obj.length === 0 || isPermissionGroup(obj[0]));
}
