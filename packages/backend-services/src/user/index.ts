import { UserRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { User } from '@repo/database';
import { User as IUser } from '@repo/types';
import { isoFormate } from '@repo/utils';

@injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    try {
      const updateData = {
        ...data,
        dateOfBirth:
          data.dateOfBirth instanceof Date
            ? data.dateOfBirth
            : isoFormate(data.dateOfBirth),
      };

      const res = await this.userRepository.updateUser(id, updateData);

      // Ensure gender is cast to the correct enum/type
      return {
        ...res,
        gender: res.gender as IUser['gender'],
      };
    } catch (err) {
      return this.handlePrismaError(err, 'Error updating user');
    }
  }
}
