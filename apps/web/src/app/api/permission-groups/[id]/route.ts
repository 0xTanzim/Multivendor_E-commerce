import { permissionGroupService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isPermissionGroup } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class PermissionGroupByIDController {
  async GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const permissionGroup = await permissionGroupService.findUnique({
      where: { id },
    });

    return NextResponse.json(permissionGroup);
  }

  async PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data = await request.json();
    const permissionGroup = await permissionGroupService.update(id, data);

    if (!isPermissionGroup(permissionGroup)) {
      throw new Error('Invalid permission group data returned from service');
    }

    return NextResponse.json(permissionGroup);
  }

  async DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const permissionGroup = await permissionGroupService.deleteById(id);

    if (!isPermissionGroup(permissionGroup)) {
      throw new Error('Invalid permission group data returned from service');
    }

    return NextResponse.json(permissionGroup);
  }
}

export const { DELETE, PUT, GET } = new PermissionGroupByIDController();
