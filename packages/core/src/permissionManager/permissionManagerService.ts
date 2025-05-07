import { prisma } from '@repo/database';
import { Redis } from '@upstash/redis';

type RolePermissionMap = Record<string, string[]>;

const CACHE_KEY = 'role-permission-map';
const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

// Configuration to toggle sibling inheritance at the same level
const INCLUDE_SIBLING_PERMISSIONS = false;

/**
 * A service class for managing role-based permissions with hierarchical inheritance.
 * Supports inheritance from ancestors, uncles (parent's siblings), and optionally same-level siblings.
 * Uses Redis for caching to improve performance.
 */
export class PermissionManagerService {
  private readonly redis: Redis;

  constructor() {
    this.redis = Redis.fromEnv();
  }

  /**
   * Loads all roles and computes their effective permissions based on the hierarchy.
   * Caches the result in Redis for faster subsequent access.
   * @returns {Promise<RolePermissionMap>} A map of role IDs to their effective permissions.
   */
  async loadAll(): Promise<RolePermissionMap> {
    // Fetch all roles with permissions and hierarchy
    const roles = await prisma.role.findMany({
      include: {
        rolePermissions: { include: { permission: true } },
        parent: true,
        children: true,
      },
    });

    // Build maps for efficient lookup
    const directPermissions = new Map<string, Set<string>>(); // Role ID -> own permissions
    const parentMap = new Map<string, string | null>(); // Role ID -> parent ID
    const childrenMap = new Map<string, string[]>(); // Role ID -> child IDs
    const siblingMap = new Map<string, string[]>(); // Role ID -> sibling IDs

    for (const role of roles) {
      const perms = new Set(
        role.rolePermissions.map(
          (rp) => `${rp.permission.action}:${rp.permission.resource}`
        )
      );
      directPermissions.set(role.id, perms);
      parentMap.set(role.id, role.parentId);
      childrenMap.set(
        role.id,
        role.children.map((child) => child.id)
      );

      // Compute siblings (children of the same parent, excluding self)
      const parentId = role.parentId;
      if (parentId) {
        const siblings = (childrenMap.get(parentId) || []).filter(
          (id) => id !== role.id
        );
        siblingMap.set(role.id, siblings);
      } else {
        siblingMap.set(role.id, []);
      }
    }

    // Compute effective permissions
    const effectivePermissions = new Map<string, Set<string>>();

    const computeEffectivePermissions = (roleId: string): Set<string> => {
      if (effectivePermissions.has(roleId)) {
        return effectivePermissions.get(roleId)!;
      }

      // Start with own permissions
      const perms = new Set(directPermissions.get(roleId) || []);

      // Inherit from parent
      const parentId = parentMap.get(roleId);
      if (parentId) {
        const parentPerms = computeEffectivePermissions(parentId);
        parentPerms.forEach((perm) => perms.add(perm));

        // Inherit from uncles (siblings of parent)
        const grandParentId = parentMap.get(parentId);
        if (grandParentId) {
          const uncleIds = childrenMap.get(grandParentId) || [];
          for (const uncleId of uncleIds) {
            if (uncleId !== parentId) {
              const unclePerms = directPermissions.get(uncleId) || new Set();
              unclePerms.forEach((perm) => perms.add(perm));
            }
          }
        }
      }

      // Optionally inherit from siblings
      if (INCLUDE_SIBLING_PERMISSIONS) {
        const siblingIds = siblingMap.get(roleId) || [];
        for (const siblingId of siblingIds) {
          const siblingPerms = directPermissions.get(siblingId) || new Set();
          siblingPerms.forEach((perm) => perms.add(perm));
        }
      }

      effectivePermissions.set(roleId, perms);
      return perms;
    };

    // Compute permissions for all roles
    for (const role of roles) {
      computeEffectivePermissions(role.id);
    }

    // Convert to plain object for caching
    const finalMap: RolePermissionMap = {};
    for (const [roleId, perms] of effectivePermissions) {
      finalMap[roleId] = Array.from(perms).sort();
    }

    // Cache the result
    await this.redis.set(CACHE_KEY, finalMap);
    await this.redis.expire(CACHE_KEY, CACHE_TTL_SECONDS);

    return finalMap;
  }

  /**
   * Retrieves the effective permissions for a given role.
   * If the permissions are not cached, it triggers a full load.
   * @param {string} roleId - The ID of the role to fetch permissions for.
   * @returns {Promise<string[]>} The list of permissions for the role.
   */
  async getPermissions(roleId: string): Promise<string[]> {
    let map = await this.redis.get<RolePermissionMap>(CACHE_KEY);
    if (!map) map = await this.loadAll();
    return map?.[roleId] ?? [];
  }

  /**
   * Refreshes the permission map by recomputing all roles' permissions.
   * @returns {Promise<RolePermissionMap>} The updated permission map.
   */
  async refresh(): Promise<RolePermissionMap> {
    return this.loadAll();
  }

  /**
   * Clears the cached permission map in Redis.
   * @returns {Promise<void>} A promise that resolves when the cache is cleared.
   */
  async clearCache(): Promise<void> {
    await this.redis.del(CACHE_KEY);
  }
}

// Export a singleton instance of the service
export const permissionManagerService = new PermissionManagerService();
