import { ROUTE_PERMISSIONS } from '@/config/permissions';

export const normalizeRole = (role: string): string =>
  role
    ?.trim()
    ?.toUpperCase()
    .replace(/[^A-Z0-9]/g, '_');

export const hasPageAccess = (userRole: string, path: string): boolean => {
  const normalizedUserRole = normalizeRole(userRole);

  const matchedRoute = ROUTE_PERMISSIONS.find((entry) =>
    entry.pattern.test(path)
  );

  if (!matchedRoute) return false;

  return matchedRoute.roles.some(
    (allowedRole) => normalizeRole(allowedRole) === normalizedUserRole
  );
};
