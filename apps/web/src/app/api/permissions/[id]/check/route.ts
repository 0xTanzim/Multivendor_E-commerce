import { catchErrors } from '@/utils';
import { permissionManagerService } from '@repo/core/pm';
import { NextResponse } from 'next/server';

@catchErrors()
class PermissionCheckController {
  async GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const permissions = await permissionManagerService.getPermissions(id);
    return NextResponse.json({ permissions });
  }
}

export const { GET } = new PermissionCheckController();
