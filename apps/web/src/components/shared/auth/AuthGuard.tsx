'use client';

import { useAuthDetails } from '@/hooks/useAuthDetails';
import { usePermissions } from '@/hooks/usePermissions';

export type AuthGuardProps = {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[] | string;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
  showLoading?: boolean;
};

const DefaultLoadingFallback = () => <div>Loading...</div>;

export const AuthGuard = ({
  children,
  requiredRole,
  requiredPermissions,
  fallback = null,
  loadingFallback = <DefaultLoadingFallback />,
  showLoading = false,
}: AuthGuardProps) => {
  const { role, userId } = useAuthDetails();
  const { permissions, isLoading } = usePermissions();

  console.log('Permissions', permissions);

  const loading = !role || !userId;

  if (loading && showLoading) {
    return loadingFallback;
  }

  const normalizedRole = role?.toLowerCase();
  const requiredRoleNormalized = requiredRole?.toLowerCase();

  const hasRole = requiredRoleNormalized
    ? normalizedRole === requiredRoleNormalized
    : true;

  const requiredPerms = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : requiredPermissions
      ? [requiredPermissions]
      : [];

  const normalizedPermissions = permissions.map((p) => p.toLowerCase());
  const normalizedRequiredPerms = requiredPerms.map((p) => p.toLowerCase());

  console.log('Normalized Permissions', normalizedPermissions);
  console.log('Normalized Required Permissions', normalizedRequiredPerms);

  const hasPermission =
    normalizedRequiredPerms.length === 0
      ? true
      : normalizedRequiredPerms.some((perm) =>
          normalizedPermissions.includes(perm)
        );

  if (!hasRole || !hasPermission) {
    return fallback;
  }

  return <>{children}</>;
};

export const HasRole = (
  props: Omit<AuthGuardProps, 'requiredPermissions'> & { requiredRole: string }
) => {
  return <AuthGuard {...props} />;
};

export const HasPermission = (
  props: Omit<AuthGuardProps, 'requiredRole'> & {
    requiredPermissions: string | string[];
  }
) => {
  return <AuthGuard {...props} />;
};

export const HasRoleAndPermission = (
  props: AuthGuardProps & {
    requiredRole: string;
    requiredPermissions: string | string[];
  }
) => {
  return <AuthGuard {...props} />;
};
