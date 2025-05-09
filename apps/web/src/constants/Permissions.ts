// Step 1: Define enums (string enums or object enums for zero runtime overhead)
export const ACTIONS = {
  CREATE: 'create',
  DELETE: 'delete',
  UPDATE: 'update',
  VIEW: 'view',
  READ: 'read',
} as const;

export const RESOURCES = {
  MARKET: 'market',
  USER: 'user',
  PRODUCT: 'product',
  ORDER: 'order',
  INVENTORY: 'inventory',
  BANNER: 'banner',
  CATEGORY: 'category',
  TRAINING: 'training',
  COUPON: 'coupon',
  CUSTOMER: 'customer',
  FARMER: 'farmer',
  STAFF: 'staff',
} as const;

// Step 2: Derive literal types
export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];
export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];
export type Permission = `${Action}:${Resource}`;
export type PermissionKey = `${Uppercase<Action>}_${Uppercase<Resource>}`;

// Step 3: Auto-generate permission map
const generatePermissions = (
  actions: Record<string, Action>,
  resources: Record<string, Resource>
): Record<PermissionKey, Permission> => {
  const permissions = {} as Record<PermissionKey, Permission>;

  for (const actionKey in actions) {
    for (const resourceKey in resources) {
      const action = actions[actionKey];
      const resource = resources[resourceKey];

      const key =
        `${action!.toUpperCase()}_${resource!.toUpperCase()}` as PermissionKey;
      const value = `${action}:${resource}` as Permission;

      permissions[key] = value;
    }
  }

  return permissions;
};

export const PERMISSIONS = generatePermissions(ACTIONS, RESOURCES);
export const PERMISSION_LIST = Object.values(PERMISSIONS) as Permission[];
