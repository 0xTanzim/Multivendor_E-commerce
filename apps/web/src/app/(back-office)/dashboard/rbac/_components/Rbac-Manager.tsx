'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Role } from '@repo/types';
import { Link, Shield, UserCog } from 'lucide-react';

import PermissionGroupsTab from './PermissionGroupsTab';
import PermissionsTab from './PermissionsTab';
import RolePermissionsTab from './RolePermissionsTab';
import RolesTab from './RolesTab';

type RbacManagerProps = {
  rolesData: Role[];
};

const RbacManager = ({ rolesData }: RbacManagerProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow relative">
      {/* Add Toaster component to handle toast notifications properly */}
    
      <div className="mb-6">
        <p className="text-slate-600 dark:text-slate-300">
          Manage user roles and permissions across the platform. Create and
          modify roles, assign permissions to roles, and organize permissions
          into groups.
        </p>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Roles</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Permissions</span>
          </TabsTrigger>
          <TabsTrigger
            value="permission-groups"
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            <span>Permission Groups</span>
          </TabsTrigger>
          <TabsTrigger
            value="role-permissions"
            className="flex items-center gap-2"
          >
            <Link className="h-4 w-4" />
            <span>Permission Assign</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <RolesTab initialRoles={rolesData} />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionsTab />
        </TabsContent>

        <TabsContent value="permission-groups">
          <PermissionGroupsTab />
        </TabsContent>

        <TabsContent value="role-permissions">
          <RolePermissionsTab roles={rolesData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RbacManager;
