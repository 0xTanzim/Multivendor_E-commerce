import { permissionManagerService } from '@repo/core/pm';

export async function loadPermissionsOnStartup() {
  await permissionManagerService.loadAll();
  console.log('Permissions loaded and cached on startup');
}
