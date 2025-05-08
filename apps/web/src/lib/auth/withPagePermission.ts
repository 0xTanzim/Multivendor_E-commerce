import { Permission } from '@/constants/Permissions';
import { permissionManagerService } from '@repo/core/pm';
import { redirect } from 'next/navigation';
import { authDetails } from './auth';

/**
 * Server-side permission check for page access.
 * Redirects to fallbackRoute if user lacks permission.
 */
export async function withPagePermission(
  requiredPermissions: Permission[],
  fallbackRoute: string = '/unauthorized'
): Promise<void> {
  const { roleId } = await authDetails();

  if (!roleId) {
    redirect(fallbackRoute);
  }

  const perms = await permissionManagerService.getPermissions(roleId);

  const hasPermission = requiredPermissions.some((perm) =>
    perms.includes(perm)
  );

  if (!hasPermission) {
    redirect(fallbackRoute);
  }
}
