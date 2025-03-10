import { BaseRepository } from '@repo/core';
import { Prisma, PrismaClient, Training } from '@repo/database';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
@injectable()
export class TrainingRepository extends BaseRepository<Training, Prisma.TrainingDelegate> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.training);
  }
}