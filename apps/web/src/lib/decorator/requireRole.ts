import { NextResponse } from 'next/server';
import { authDetails } from '../auth';

/**
 * Restrict access to users with a specific role (or any of a list).
 * Works best with single-role systems.
 *
 * @param allowedRoles - A string or array of role names (e.g., 'admin', 'vendor')
 */
export function RequireRole(allowedRoles: string | string[]) {
  const normalizedRoles = (
    Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
  ).map((role) => role.trim().toLowerCase());

  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const { role } = await authDetails();

      const normalizedUserRole = role?.trim().toLowerCase();

      if (
        !normalizedUserRole ||
        !normalizedRoles.includes(normalizedUserRole)
      ) {
        return NextResponse.json(
          { error: 'Forbidden: Role not allowed' },
          { status: 403 }
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
