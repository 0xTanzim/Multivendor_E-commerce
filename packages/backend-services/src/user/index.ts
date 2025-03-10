import { UserRepository } from '@repo/backend-repository';
import { BadRequestError, ConflictError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { prisma } from '@repo/database';
import { User } from '@repo/types';
import bcrypt from 'bcryptjs';

@injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }

  async fetchUserByEmail(email: string) {
    return this.repository.findUnique({ where: { email } });
  }

  async createUser(data: User) {
    try {
      const newUser = {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role,
        bio: data.bio ?? '',
      };

      const hashedPassword = await this.hashedPassword(data.password, 10);

      const user = await prisma.user.create({
        data: {
          ...newUser,
          password: hashedPassword,
        },
      });

      return user;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictError('User with this email already exists');
      }

      throw new BadRequestError('Failed to create user');
    }
  }

  async hashedPassword(password: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
