import { roleService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

@catchErrors()
 class RolePermissionsController {
  async GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const role = await roleService.findUnique({
      where: { id },
      include: { rolePermissions: true },
    });

    return NextResponse.json(role);
  }

  async PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data = await request.json();

    console.log('data-->', data);

    // data--> {
    //   permissionIds: [ '680090dace7b239004c5d52f', '6800892dce7b239004c5d52e' ]
    // }

    const role = await roleService.update(id, {
      rolePermissions: {
        deleteMany: {},
        createMany: {
          data: data.permissionIds.map((permissionId: string) => ({
            permissionId,
          })),
        },
      },
    });

    console.log('updated role-->', role);

    return NextResponse.json(role);
  }
}

export const { GET, PATCH } = new RolePermissionsController();
