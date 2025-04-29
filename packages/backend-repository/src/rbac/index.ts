// import { container } from '@repo/core';
// import { PrismaClient } from '@repo/database';
// import {
//   PermissionGroupRepository,
//   PermissionRepository,
//   RoleRepository,
// } from './rbacRepository';

// // Register repositories
// container.register('RoleRepository', {
//   useValue: new RoleRepository(new PrismaClient()),
// });

// container.register('PermissionRepository', {
//   useValue: new PermissionRepository(new PrismaClient()),
// });

// container.register('PermissionGroupRepository', {
//   useValue: new PermissionGroupRepository(new PrismaClient()),
// });

export * from './rbacRepository';
