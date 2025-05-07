import { authService } from '@/lib/di';
import { permissionService } from '@/lib/permission/permissionService';
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

    await permissionService.refresh();
    const permissions = await permissionService.getPermissions(user.roleId);

    return NextResponse.json({

      user,
      permissions,
    });
  }
}

export const { GET } = new UserByIdController();
