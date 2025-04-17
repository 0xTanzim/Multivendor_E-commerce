import {
  PermissionGroupRepository,
  PermissionRepository,
  RoleRepository,
} from '@repo/backend-repository';
import { BaseService } from '@repo/core';
import { Permission, PermissionGroup } from '@repo/database';
import { Role, RoleFormData } from '@repo/types';
import { injectable } from 'tsyringe';

@injectable()
export class RoleService extends BaseService<Role, RoleRepository> {
  constructor(private roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async create<T = Role>(data: RoleFormData, select?: undefined): Promise<T> {
    return this.roleRepository.create({
      name: data.name,
      description: data.description,
      parentId: data.parentId || null,
      isDefault: data.isDefault || false,
    }) as Promise<T>;
  }



  // Role hierarchy management methods

  /**
   * Get all child roles for a given parent role
   */
  async getChildRoles(parentId: string): Promise<Role[]> {
    return this.roleRepository.getChildRoles(parentId);
  }

  /**
   * Assign a parent role to a child role
   */
  async assignParentRole(roleId: string, parentId: string): Promise<Role> {
    // Make sure both roles exist
    const [role, parentRole] = await Promise.all([
      this.findById(roleId),
      this.findById(parentId),
    ]);

    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    if (!parentRole) {
      throw new Error(`Parent role with ID ${parentId} not found`);
    }

    return this.roleRepository.assignParentRole(roleId, parentId);
  }

  /**
   * Remove the parent role from a child role
   */
  async removeParentRole(roleId: string): Promise<Role> {
    const role = await this.findById(roleId);

    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    if (!role.parentId) {
      throw new Error(`Role with ID ${roleId} does not have a parent role`);
    }

    return this.roleRepository.removeParentRole(roleId);
  }

  /**
   * Get a flattened hierarchical representation of all roles
   */
  async getRoleHierarchy(): Promise<Role[]> {
    const roles = await this.findAll();

    // Create a map of roles by ID for easy lookup
    const roleMap = new Map<
      string,
      Role & { level: number; children: Role[] }
    >();

    // Initialize with roles and empty children arrays
    roles.forEach((role) => {
      roleMap.set(role.id, { ...role, level: 0, children: [] });
    });

    // Identify top-level roles and build the hierarchy
    const topLevelRoles: (Role & { level: number; children: Role[] })[] = [];

    roleMap.forEach((role) => {
      if (role.parentId) {
        const parent = roleMap.get(role.parentId);
        if (parent) {
          parent.children.push(role);
          role.level = parent.level + 1;
        } else {
          // If parent doesn't exist (should not happen), treat as top level
          topLevelRoles.push(role);
        }
      } else {
        // No parent, so it's a top-level role
        topLevelRoles.push(role);
      }
    });

    // Now flatten the hierarchy for returning
    const flattenHierarchy = (
      roles: (Role & { level: number; children: Role[] })[],
      result: (Role & { level: number })[] = []
    ) => {
      roles.forEach((role) => {
        result.push({ ...role, level: role.level });
        if (role.children && role.children.length > 0) {
          // @ts-expect-error : Type 'Role[]' is not assignable to type 'never[]'
          flattenHierarchy(role.children, result);
        }
      });
      return result;
    };

    return flattenHierarchy(topLevelRoles);
  }
}

@injectable()
export class PermissionGroupService extends BaseService<
  PermissionGroup,
  PermissionGroupRepository
> {
  constructor(private permissionGroupRepository: PermissionGroupRepository) {
    super(permissionGroupRepository);
  }
}

@injectable()
export class PermissionService extends BaseService<
  Permission,
  PermissionRepository
> {
  constructor(private permissionRepository: PermissionRepository) {
    super(permissionRepository);
  }
}
