import {
  AuthService,
  BannerService,
  CategoryService,
  CouponService,
  FarmerService,
  MarketService,
  OrderService,
  ProductService,
  SaleService,
  TrainingService,
  UserService,
  RoleService,
  PermissionGroupService,
  PermissionService,
  StaffService
} from '@repo/backend-services';

import { container } from '@repo/core/container';
import { MailService } from '@repo/smtp-email-service';

export const marketService = container.resolve(MarketService);

export const trainingService = container.resolve(TrainingService);

export const couponService = container.resolve(CouponService);

export const bannerService = container.resolve(BannerService);

export const categoryService = container.resolve(CategoryService);

export const farmerService = container.resolve(FarmerService);

export const productService = container.resolve(ProductService);

export const userService = container.resolve(UserService);
export const staffService = container.resolve(StaffService);

export const mailService = container.resolve(MailService);
export const authService = container.resolve(AuthService);
authService.setMailService(mailService);

export const orderService = container.resolve(OrderService);
export const saleService = container.resolve(SaleService);

export const roleService = container.resolve(RoleService);
export const permissionGroupService = container.resolve(
  PermissionGroupService
);
export const permissionService = container.resolve(PermissionService);

// export const staffService = container.resolve(StaffService);
