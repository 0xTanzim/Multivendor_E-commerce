import { BaseRepository } from '@repo/core';
import { Prisma, PrismaClient, User } from '@repo/database';

export class UserRepository extends BaseRepository<User, Prisma.UserDelegate> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }
}
