import { permissionService } from '@/lib/di';
import { NextRequest, NextResponse } from 'next/server';

const actions = ['create', 'read', 'update', 'delete', 'view'] as const;

export async function POST(req: NextRequest) {
  const { resource, permissionGroupId } = await req.json();

  if (!resource || !permissionGroupId) {
    return NextResponse.json({ error: 'Missing resource or permissionGroupId' }, { status: 400 });
  }

  const createdPermissions = [];

  for (const action of actions) {
    const name = `${action}:${resource}`;
    const description = `Allows a user to ${action} a ${resource}`;

    const permission = await permissionService.create({
      name,
      description,
      action,
      resource,
      permissionGroupId,
    });

    createdPermissions.push(permission);
  }

  return NextResponse.json({
    message: `Permissions created for ${resource}`,
    data: createdPermissions,
  });
}
