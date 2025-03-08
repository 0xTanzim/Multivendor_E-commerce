import { UserRepository } from '@repo/backend-repository';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '@repo/common/error';
import { BaseService } from '@repo/core';
import { prisma } from '@repo/database';
import { User } from '@repo/types';
import bcrypt from 'bcryptjs';

export class UserService {
  public static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async existUser(email: string) {
    if (!email) {
      throw new BadRequestError('Email is required');
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return Boolean(user);
  }

  async createUser(data: User) {
    const existingUser = await this.existUser(data.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

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
  }

  async fetchUserByEmail(email: string) {
    if (!email) {
      throw new BadRequestError('Email is required');
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async fetchUserById(id: string) {
    if (!id) {
      throw new BadRequestError('Id is required');
    }
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        bio: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async fetchAllUsers() {
    return prisma.user.findMany({});
  }

  async hashedPassword(password: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export class UserServiceExtend extends BaseService<User, UserRepository> {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }

  async fetchUserByEmail(email: string) {
    return this.repository.findUnique({ where: { email } });
  }
}
