import Heading from '@/components/backOffice/layout/Heading';
import { getData } from '@/lib/getData';
import {
  isPermissionArray,
  isPermissionGroupArray,
  isRoleArray,
} from '@repo/types';
import { Toaster } from 'react-hot-toast';
import RbacManager from './_components/Rbac-Manager';
import { RbacProvider } from './_components/RbacContext';

const RBACPage = async () => {
  // Fetch data from API
  const [roles, permissions, permissionGroups] = await Promise.all([
    getData('roles'),
    getData('permissions'),
    getData('permission-groups'),
  ]);

  // Validate data formats
  if (!isRoleArray(roles)) {
    console.error('Invalid response data format for roles');
    return <div>Error fetching roles</div>;
  }

  if (!isPermissionArray(permissions)) {
    console.error('Invalid response data format for permissions');
    return <div>Error fetching permissions</div>;
  }

  if (!isPermissionGroupArray(permissionGroups)) {
    console.error('Invalid response data format for permission groups');
    return <div>Error fetching permission groups</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Roles & Permissions Management" />
      </div>

      <RbacProvider
        initialRoles={roles}
        initialPermissions={permissions}
        initialPermissionGroups={permissionGroups}
      >
        <Toaster position="top-right" />
        <RbacManager />
      </RbacProvider>
    </div>
  );
};

export default RBACPage;
