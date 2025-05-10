import { Permission } from '@/constants/Permissions';
import { permissionManagerService } from '@repo/core/pm';
import { NextResponse } from 'next/server';
import { authDetails } from '../auth';

export function RequireAnyPermission(permissions: Permission[]) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const { roleId, userId } = await authDetails();

      if (!userId || !roleId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const userPermissions =
        await permissionManagerService.getPermissions(roleId);
      const hasAtLeastOne = permissions.some((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasAtLeastOne) {
        return NextResponse.json(
          { error: 'Forbidden: No matching permission' },
          { status: 403 }
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
