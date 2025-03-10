import { BaseRepository } from '@repo/core';
import { Prisma, PrismaClient, Training } from '@repo/database';

export class TrainingRepository extends BaseRepository<Training, Prisma.TrainingDelegate> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.training);
  }
}