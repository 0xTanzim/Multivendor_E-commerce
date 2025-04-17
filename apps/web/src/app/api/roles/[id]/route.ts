import { roleService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

export class RoleByIdController {
  @catchErrors()
  static async GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const role = await roleService.findById(id);

    return NextResponse.json(role);
  }

  @catchErrors()
  static async PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data = await request.json();
    const role = await roleService.update(id, data);

    return NextResponse.json(role);
  }

  @catchErrors()
  static async DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const role = await roleService.deleteById(id);

    return NextResponse.json(role);
  }
}

export const { DELETE, PUT, GET } = RoleByIdController;
