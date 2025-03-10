import { MarketRepository } from '@repo/backend-repository';
import { BaseService } from '@repo/core';
import { injectable } from '@repo/core/container';
import { Market } from '@repo/database';

@injectable()
export class MarketService extends BaseService<Market, MarketRepository> {
  constructor(marketRepository: MarketRepository) {
    super(marketRepository);
  }
}
