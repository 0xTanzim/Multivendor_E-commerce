import { permissionService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isPermission } from '@repo/types';
import { NextResponse } from 'next/server';

export class PermissionByIdController {
  @catchErrors()
  static async GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const permission = await permissionService.findById(id);

    return NextResponse.json(permission);
  }

  @catchErrors()
  static async PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data = await request.json();
    const permission = await permissionService.update(id, data);

    console.log('updated permission-->', permission);

    if (!isPermission(permission)) {
      throw new Error('Invalid permission data returned from service');
    }

    return NextResponse.json(permission);
  }

  @catchErrors()
  static async DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const permission = await permissionService.deleteById(id);

    if (!isPermission(permission)) {
      throw new Error('Invalid permission data returned from service');
    }

    return NextResponse.json(permission);
  }
}

export const { DELETE, PUT, GET } = PermissionByIdController;
