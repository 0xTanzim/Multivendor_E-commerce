import { UserRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { User } from '@repo/database';

@injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }
}
