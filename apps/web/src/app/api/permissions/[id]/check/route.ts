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
    return NextResponse.json({ permissions }, {
       headers: {
        'Cache-Control': 'public, max-age=900',  // 15 minutes
        'Content-Type': 'application/json',
       }
    });
  }
}

export const { GET } = new PermissionCheckController();
