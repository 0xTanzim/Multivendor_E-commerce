import { permissionGroupService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isPermissionGroup } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

function requirePermission(permission: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      // Add permission logic here (e.g., check user roles)
      console.log(`Checking permission: ${permission}`);
      return originalMethod.apply(this, args);
    };
  };
}

export class PermissionGroupController {
  @requirePermission('permission-group:read')
  @catchErrors()
  static async GET() {
    const permissionGroups = await permissionGroupService.findAll();
    return NextResponse.json(permissionGroups);
  }

  @requirePermission('permission-group:create')
  @catchErrors()
  static async POST(request: NextRequest) {
    const data = await request.json();
    const permissionGroup = await permissionGroupService.create(data);

    if (!isPermissionGroup(permissionGroup)) {
      throw new Error('Invalid permission group data returned from service');
    }
    return NextResponse.json(permissionGroup);
  }
}

export const { GET, POST } = PermissionGroupController;
