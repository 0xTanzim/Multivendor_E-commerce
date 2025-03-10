import { BaseRepository, BaseService } from '@repo/core';
import { Prisma, PrismaClient, User } from '@repo/database';

export class TestService extends BaseService<User, TestRepo> {
  constructor(userRepository: TestRepo) {
    super(userRepository);
  }
}

export class TestRepo extends BaseRepository<User, Prisma.UserDelegate> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }
}
