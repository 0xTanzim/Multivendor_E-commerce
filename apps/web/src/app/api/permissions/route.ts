import { permissionService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isPermission } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export class PermissionController {
  @catchErrors()
  static async GET() {
    const permissions = await permissionService.findAll();
    return NextResponse.json(permissions);
  }

  @catchErrors()
  static async POST(request: NextRequest) {
    const data = await request.json();

    const permission = await permissionService.create(data);

    if (!isPermission(permission)) {
      throw new Error('Invalid permission data returned from service');
    }

    return NextResponse.json(permission);
  }
}

export const { GET, POST } = PermissionController;
