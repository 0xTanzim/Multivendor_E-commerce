import type { Action, PermissionKey, Resource } from '@/constants/Permissions';

export function getPermissionKey(
  action: Action,
  resource: Resource
): PermissionKey {
  return `${action.toUpperCase()}_${resource.toUpperCase()}` as PermissionKey;
}
