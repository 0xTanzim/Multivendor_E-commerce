import { permissionManagerService } from '@repo/core/pm';
import { Policy, PolicyContext } from '@repo/policies';
import { NextRequest, NextResponse } from 'next/server';
import { authDetails } from '../auth';

export function RequirePolicy(
  policyClass: new () => Policy,
  resourceFetcher?: (id: string) => Promise<any>,
  paramKey: string = 'id'
) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const req: NextRequest = args[0];
      const params = await args[1]?.params;
      const { userId, roleId, role: roleName } = await authDetails();
      if (!userId || !roleId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const permissions = await permissionManagerService.getPermissions(roleId);

      const resource =
        resourceFetcher && params?.[paramKey]
          ? await resourceFetcher(params[paramKey])
          : null;
      const context: PolicyContext = {
        userId,
        role: roleId,
        permissions,
        resource,
        roleName: roleName ?? '',
      };

      const policy = new policyClass();

      const result = await policy.can(context);

      if (!result.allowed) {
        return NextResponse.json(
          { error: result.reason || 'Access denied' },
          { status: 403 }
        );
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
