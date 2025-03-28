import { SaleRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { Sale } from '@repo/database';

@injectable()
export class SaleService extends BaseService<Sale, SaleRepository> {
  constructor(saleRepository: SaleRepository) {
    super(saleRepository);
  }
}
