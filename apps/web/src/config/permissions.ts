import { ROLES } from '@/constants/roles';

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface RoutePermission {
  pattern: RegExp;
  roles: Role[];
}

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { pattern: /^\/dashboard$/, roles: [ROLES.ADMIN, ROLES.FARMER, ROLES.USER] },
  {
    pattern: /^\/dashboard\/products(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  { pattern: /^\/dashboard\/categories(\/.*)?$/, roles: [ROLES.ADMIN] },
  {
    pattern: /^\/dashboard\/coupons(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  { pattern: /^\/dashboard\/banners(\/.*)?$/, roles: [ROLES.ADMIN] },
  {
    pattern: /^\/dashboard\/customers(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  {
    pattern: /^\/dashboard\/markets(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  { pattern: /^\/dashboard\/farmers(\/.*)?$/, roles: [ROLES.ADMIN] },
  { pattern: /^\/dashboard\/staff(\/.*)?$/, roles: [ROLES.ADMIN] },
  { pattern: /^\/dashboard\/rbac(\/.*)?$/, roles: [ROLES.ADMIN] },
  {
    pattern: /^\/dashboard\/orders(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER, ROLES.USER],
  },
  {
    pattern: /^\/dashboard\/sales(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  {
    pattern: /^\/dashboard\/wallet(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  {
    pattern: /^\/dashboard\/farmer-support(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  {
    pattern: /^\/dashboard\/community(\/.*)?$/,
    roles: [ROLES.ADMIN, ROLES.FARMER],
  },
  {
    pattern: /^\/dashboard\/profile$/,
    roles: [ROLES.ADMIN, ROLES.FARMER, ROLES.USER],
  },
  { pattern: /^\/dashboard\/settings$/, roles: [ROLES.ADMIN, ROLES.FARMER] },
  { pattern: /^\/$/, roles: [ROLES.ADMIN, ROLES.FARMER, ROLES.USER] },
];
