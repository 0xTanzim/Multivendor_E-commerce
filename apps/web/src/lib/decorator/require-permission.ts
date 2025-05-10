// apps/web/src/lib/decorator/requirePermission.ts
import { Permission } from '@/constants/Permissions';
import { permissionManagerService } from '@repo/core/pm';
import { NextResponse } from 'next/server';
import { authDetails } from '../auth';

export interface RequirePermissionOptions {
  allowPublic?: boolean;
}

/**
 * Decorator to enforce permission-based access control.
 * @param permission - Single or multiple required permissions
 * @param options - allowPublic to enable guest access
 */
export function RequirePermission(
  permission: Permission | Permission[],
  options: RequirePermissionOptions = {}
) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const requiredPermissions = Array.isArray(permission)
        ? permission
        : [permission];

      const { allowPublic = false } = options;

      const { roleId, userId } = await authDetails();

      // 1. Guest user (not logged in)
      if (!userId || !roleId) {
        if (allowPublic) {
          return originalMethod.apply(this, args); // ✅ Allow guest
        }
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // 2. Authenticated user → check permissions
      const userPermissions =
        await permissionManagerService.getPermissions(roleId);

      const hasAll = requiredPermissions.every((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasAll) {
        return NextResponse.json(
          { error: 'Forbidden: Missing permission' },
          { status: 403 }
        );
      }

      // ✅ Permission granted
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
