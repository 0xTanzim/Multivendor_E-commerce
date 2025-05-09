import { Permission } from '@/constants/Permissions';
import { permissionManagerService } from '@repo/core/pm';
import { authDetails } from './auth';

class PermissionManager {
  async checkPermission(required: Permission[]) {
    const { roleId, userId } = await authDetails();
    if (!userId) {
      return false;
    }

    const permissions = await permissionManagerService.getPermissions(roleId!);
    return required.some((perm) => permissions.includes(perm));
  }
}

export const permissionManager = new PermissionManager();
