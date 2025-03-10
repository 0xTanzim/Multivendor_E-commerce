import { TrainingRepository } from '@repo/backend-repository';
import { BaseService } from '@repo/core';
import { Training } from '@repo/database';
import { injectable } from '@repo/core/container';

@injectable()
export class TrainingService extends BaseService<Training, TrainingRepository> {
  constructor(repository: TrainingRepository) {
    super(repository);
  }
}
