import {
  BaseRepository,
  inject,
  injectable,
  PrismaClientToken,
} from '@repo/core';
import { Permission, Prisma, PrismaClient } from '@repo/database';
import { PermissionGroup, Role } from '@repo/types';

@injectable()
export class RoleRepository extends BaseRepository<Role, Prisma.RoleDelegate> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.role);
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role
      .findMany({
        include: {
          parent: true,
          children: true,
          rolePermissions: {
            include: {
              permission: true,
            },
          },
          _count: {
            select: {
              users: true,
            },
          },
        },
      })
      .then((roles) =>
        roles.map((role) => ({
          ...role,
          permissions: role.rolePermissions.map((rp) => rp.permission),
          userCount: role._count.users,
        }))
      );
  }

  async findById(id: string): Promise<Role | null> {
    return this.prisma.role
      .findUnique({
        where: { id },
        include: {
          parent: true,
          children: true,
          rolePermissions: {
            include: {
              permission: true,
            },
          },
          _count: {
            select: {
              users: true,
            },
          },
        },
      })
      .then((role) =>
        role
          ? {
              ...role,
              permissions: role.rolePermissions.map((rp) => rp.permission),
              userCount: role._count.users,
            }
          : null
      );
  }

  // async create<T = Role>(
  //   data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'> & {
  //     permissionIds?: string[];
  //   }
  // ): Promise<T> {
  //   const { permissionIds, ...roleData } = data;

  //   return this.prisma.role
  //     .create({
  //       data: {
  //         ...roleData,
  //         rolePermissions: permissionIds
  //           ? {
  //               create: permissionIds.map((permissionId) => ({
  //                 permission: {
  //                   connect: { id: permissionId },
  //                 },
  //               })),
  //             }
  //           : undefined,
  //       },
  //       include: {
  //         parent: true,
  //         children: true,
  //         rolePermissions: {
  //           include: {
  //             permission: true,
  //           },
  //         },
  //         _count: {
  //           select: {
  //             users: true,
  //           },
  //         },
  //       },
  //     })
  //     .then(
  //       (role) =>
  //         ({
  //           ...role,
  //           permissions: role.rolePermissions.map((rp) => rp.permission),
  //           userCount: role._count.users,
  //         }) as unknown as T
  //     );
  // }

  // async update(
  //   id: string,
  //   data: Partial<Role> & { permissionIds?: string[] }
  // ): Promise<Role> {
  //   const { permissionIds, ...roleData } = data;

  //   // If permissionIds is provided, update role permissions
  //   if (permissionIds !== undefined) {
  //     // Delete existing role permissions
  //     await this.prisma.rolePermission.deleteMany({
  //       where: { roleId: id },
  //     });

  //     // Create new role permissions
  //     if (permissionIds.length > 0) {
  //       await Promise.all(
  //         permissionIds.map((permissionId) =>
  //           this.prisma.rolePermission.create({
  //             data: {
  //               role: { connect: { id } },
  //               permission: { connect: { id: permissionId } },
  //             },
  //           })
  //         )
  //       );
  //     }
  //   }

  //   // Check for circular reference if parentId is being updated
  //   if (roleData.parentId) {
  //     const wouldCreateCircular = await this.wouldCreateCircularReference(
  //       id,
  //       roleData.parentId
  //     );
  //     if (wouldCreateCircular) {
  //       throw new Error('Cannot create circular reference in role hierarchy');
  //     }
  //   }

  //   // Update role data
  //   return this.prisma.role
  //     .update({
  //       where: { id },
  //       data: roleData,
  //       include: {
  //         parent: true,
  //         children: true,
  //         rolePermissions: {
  //           include: {
  //             permission: true,
  //           },
  //         },
  //         _count: {
  //           select: {
  //             users: true,
  //           },
  //         },
  //       },
  //     })
  //     .then((role) => ({
  //       ...role,
  //       permissions: role.rolePermissions.map((rp) => rp.permission),
  //       userCount: role._count.users,
  //     }));
  // }

  async delete(id: string): Promise<Role> {
    // Check if role has children before deleting
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        children: true,
      },
    });

    if (role && role.children.length > 0) {
      throw new Error('Cannot delete role with child roles');
    }

    return this.prisma.role
      .delete({
        where: { id },
        include: {
          parent: true,
          rolePermissions: {
            include: {
              permission: true,
            },
          },
          _count: {
            select: {
              users: true,
            },
          },
        },
      })
      .then((role) => ({
        ...role,
        permissions: role.rolePermissions.map((rp) => rp.permission),
        userCount: role._count.users,
      }));
  }

  // Methods for role hierarchy management

  async getChildRoles(parentId: string): Promise<Role[]> {
    return this.prisma.role
      .findMany({
        where: {
          parentId,
        },
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
          _count: {
            select: {
              users: true,
            },
          },
        },
      })
      .then((roles) =>
        roles.map((role) => ({
          ...role,
          permissions: role.rolePermissions.map((rp) => rp.permission),
          userCount: role._count.users,
        }))
      );
  }

  async assignParentRole(roleId: string, parentId: string): Promise<Role> {
    // Make sure parent role exists
    const parentExists = await this.prisma.role.findUnique({
      where: { id: parentId },
    });

    if (!parentExists) {
      throw new Error('Parent role not found');
    }

    // Check for circular reference
    if (await this.wouldCreateCircularReference(roleId, parentId)) {
      throw new Error(
        'Cannot assign parent role as it would create a circular reference'
      );
    }

    return this.update(roleId, { parentId });
  }

  async removeParentRole(roleId: string): Promise<Role> {
    return this.update(roleId, { parentId: null });
  }

  // Helper method to detect circular references in role hierarchy
  private async wouldCreateCircularReference(
    roleId: string,
    potentialParentId: string
  ): Promise<boolean> {
    // If the role would be its own parent
    if (roleId === potentialParentId) {
      return true;
    }

    // Check if the role is already in the ancestry chain of the potential parent
    const checkAncestry = async (
      currentParentId: string,
      targetRoleId: string
    ): Promise<boolean> => {
      const currentParent = await this.prisma.role.findUnique({
        where: { id: currentParentId },
        select: { parentId: true },
      });

      if (!currentParent || !currentParent.parentId) {
        return false;
      }

      if (currentParent.parentId === targetRoleId) {
        return true;
      }

      // Check the next parent in the chain
      return checkAncestry(currentParent.parentId, targetRoleId);
    };

    return checkAncestry(potentialParentId, roleId);
  }
}

// @injectable()
// export class PermissionRepository extends BaseRepository<
//   Permission,
//   Prisma.PermissionDelegate
// > {
//   constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
//     super(prisma, prisma.permission);
//   }

//   async findAll(): Promise<Permission[]> {
//     return this.prisma.permission.findMany({
//       include: {
//         permissionGroup: true,
//       },
//     });
//   }

//   async findById(id: string): Promise<Permission | null> {
//     return this.prisma.permission.findUnique({
//       where: { id },
//       include: {
//         permissionGroup: true,
//       },
//     });
//   }

//   async create(
//     data: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>
//   ): Promise<Permission> {
//     return this.prisma.permission.create({
//       data,
//       include: {
//         permissionGroup: true,
//       },
//     });
//   }

//   async update(id: string, data: Partial<Permission>): Promise<Permission> {
//     return this.prisma.permission.update({
//       where: { id },
//       data,
//       include: {
//         permissionGroup: true,
//       },
//     });
//   }

//   async delete(id: string): Promise<Permission> {
//     return this.prisma.permission.delete({
//       where: { id },
//       include: {
//         permissionGroup: true,
//       },
//     });
//   }
// }

@injectable()
export class PermissionRepository extends BaseRepository<
  Permission,
  Prisma.PermissionDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.permission);
  }
}

@injectable()
export class PermissionGroupRepository extends BaseRepository<
  PermissionGroup,
  Prisma.PermissionGroupDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.permissionGroup);
  }

  async findAll(): Promise<PermissionGroup[]> {
    return this.prisma.permissionGroup.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findById(id: string): Promise<PermissionGroup | null> {
    return this.prisma.permissionGroup.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });
  }
}
