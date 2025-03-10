import { CategoryRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { Category } from '@repo/database';

@injectable()
export class CategoryService extends BaseService<Category, CategoryRepository> {
  constructor(categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }
}
