import { CouponRepository } from '@repo/backend-repository';
import { BaseService } from '@repo/core';
import { prisma } from '@repo/database';
import { Coupon } from '@repo/types';
import { isoFormate } from '@repo/utils';
import { injectable } from 'tsyringe';



@injectable()
export class CouponService extends BaseService<Coupon, CouponRepository> {
  constructor(couponRepository: CouponRepository) {
    super(couponRepository);
  }

}
