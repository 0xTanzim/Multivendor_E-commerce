import { CouponRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { Coupon } from '@repo/types';

@injectable()
export class CouponService extends BaseService<Coupon, CouponRepository> {
  constructor(couponRepository: CouponRepository) {
    super(couponRepository);
  }
}
