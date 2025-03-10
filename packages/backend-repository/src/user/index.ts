import { BaseRepository } from '@repo/core';
import { Prisma, PrismaClient, User } from '@repo/database';

import { inject, injectable, PrismaClientToken } from '@repo/core/container';

@injectable()
export class UserRepository extends BaseRepository<User, Prisma.UserDelegate> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.user);
  }
}
