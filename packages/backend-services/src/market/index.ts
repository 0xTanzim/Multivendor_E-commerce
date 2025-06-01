import { MarketRepository } from '@repo/backend-repository';
import { BaseService } from '@repo/core';
import { injectable } from '@repo/core/container';
import { Market } from '@repo/database';
import { Market as IMarket } from '@repo/types';

@injectable()
export class MarketService extends BaseService<Market, MarketRepository> {
  constructor(marketRepository: MarketRepository) {
    super(marketRepository);
  }

  async createMarket(data: IMarket) {
    const marketData = {
      description: data.description,
      title: data.title,
      categoryIds: data.categoryIds,
      isActive: data.isActive,
      slug: data.slug,
      logoUrl: data.logoUrl,
      email: data.email,
      phone: data.phone,
      website: data.website,
      address: data.address,
      coverImageUrl: data.coverImageUrl,
      ownerId: data.ownerId,
    };

    return await super.create(marketData);
  }

  async updateMarket(id: string, data: IMarket) {
    const { categoryIds, ...rest } = data;
    return await super.update(id, {
      ...rest,
      categories: {
        set: categoryIds.map((id: string) => ({ id })),
      },
    });
  }
}
