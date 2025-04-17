import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { Prisma, PrismaClient, User } from '@repo/database';
import { User as IUser } from '@repo/types';

@injectable()
export class UserRepository extends BaseRepository<User, Prisma.UserDelegate> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.user);
  }

  async updateUser(id: string, data: Partial<IUser & { userId: string }>) {
    const { userId, ...formData } = data;

    const updateData = formData as Prisma.UserUpdateInput;

    return await this.prisma.$transaction(async (tsx) => {
      // find the auth User
      const authUser = await tsx.authUser.findUnique({
        where: {
          id: userId,
        },
      });

      if (!authUser) {
        throw new Error('User not found');
      }

      // update the user
      const user = await tsx.user.update({
        where: {
          id,
        },
        data: {
          ...updateData,
        },
      });

      return user;
    });
  }
}
