import { PrismaClient, prisma } from '@repo/database';
import 'reflect-metadata';
import { InjectionToken, container, inject, injectable, delay ,} from 'tsyringe';

export const PrismaClientToken: InjectionToken<PrismaClient> =
  Symbol('PrismaClient');

container.register(PrismaClientToken, { useValue: prisma });

export { container, inject, injectable ,delay };
