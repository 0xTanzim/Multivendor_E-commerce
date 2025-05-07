import { authDetails } from '@/lib';
import { permissionService } from '@/lib/permission/permissionService';

import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

@catchErrors()
class TestController {
  async GET(): Promise<NextResponse> {
    const { roleId, userId } = await authDetails();

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await permissionService.refresh();
    const permissions = await permissionService.getPermissions(
      roleId as string
    );

    return NextResponse.json({
      message: 'Hello from the test API!!',
      roleId,
      userId,
      permissions,
    });
  }
}

export const { GET } = new TestController();
