import { authService } from '@/lib/di';
import { permissionManagerService } from '@/lib/permission/permissionService';
import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

@catchErrors()
class UserByIdController {
  async GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const user = await authService.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    await permissionManagerService.refresh();
    const permissions = await permissionManagerService.getPermissions(
      user.roleId
    );

    return NextResponse.json({
      user,
      permissions,
    });
  }
}

export const { GET } = new UserByIdController();
