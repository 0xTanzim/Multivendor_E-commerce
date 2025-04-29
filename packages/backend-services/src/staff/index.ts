import { FarmerProfileRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { FarmerProfile } from '@repo/database';

@injectable()
export class StaffService extends BaseService<
  FarmerProfile,
  FarmerProfileRepository
> {
  constructor(farmerRepository: FarmerProfileRepository) {
    super(farmerRepository);
  }
}
