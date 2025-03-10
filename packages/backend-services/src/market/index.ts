import { MarketRepository } from '@repo/backend-repository';
import { BaseService } from '@repo/core';
import { Market } from '@repo/database';

export class MarketService extends BaseService<Market, MarketRepository> {
  constructor(marketRepository: MarketRepository) {
    super(marketRepository);
  }
}
