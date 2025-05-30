import { roleService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isRole } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
 class RoleController {
  async GET() {
    return NextResponse.json(await roleService.findAll());
  }

  async POST(request: Request) {
    const data = await request.json();
    const role = await roleService.create(data);

    if (!isRole(role)) {
      throw new Error('Invalid role data returned from service');
    }

    console.log('data', role);

    return NextResponse.json(role);
  }
}

export const { GET, POST } = new RoleController();
