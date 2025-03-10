import { BannerRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { Banner } from '@repo/types';

@injectable()
export class BannerService extends BaseService<Banner, BannerRepository> {
  constructor(bannerRepository: BannerRepository) {
    super(bannerRepository);
  }
}
