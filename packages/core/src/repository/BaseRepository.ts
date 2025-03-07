
import { prisma,PrismaClient } from '@repo/database';

// Utility type to extract model names from PrismaClient
type ModelNames = keyof PrismaClient;

// Generic BaseRepository with model name as a type parameter
export class BaseRepository<M extends ModelNames> {
  constructor(
    private readonly client: PrismaClient,
    private readonly model: M
  ) {}

  /** Fetch all records */
  async findAll(){

    prisma.user.findMany({
      where: {

      }
    })
  }
  
  
}