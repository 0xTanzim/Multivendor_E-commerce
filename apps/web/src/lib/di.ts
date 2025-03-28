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
} from '@repo/backend-services';
import { container } from '@repo/core/container';

export const marketService = container.resolve(MarketService);

export const trainingService = container.resolve(TrainingService);

export const couponService = container.resolve(CouponService);

export const bannerService = container.resolve(BannerService);

export const categoryService = container.resolve(CategoryService);

export const farmerService = container.resolve(FarmerService);

export const productService = container.resolve(ProductService);

export const userService = container.resolve(UserService);

export const authService = container.resolve(AuthService);
export const orderService = container.resolve(OrderService);
export const saleService = container.resolve(SaleService);

// export const staffService = container.resolve(StaffService);
