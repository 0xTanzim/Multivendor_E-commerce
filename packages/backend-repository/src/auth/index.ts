import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { AuthUser, Prisma, PrismaClient } from '@repo/database';
import { IAuthUser } from '@repo/types';

@injectable()
export class AuthRepository extends BaseRepository<
  AuthUser,
  Prisma.AuthUserDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.authUser);
  }

  async registerUser({
    name,
    email,
    password,
    role,
    verificationToken,
  }: IAuthUser) {
    return await this.prisma.$transaction(async (tx) => {
      const authUser = await tx.authUser.create({
        data: {
          email,
          password,
          name,
          role,
          verificationToken,
        },
      });

      const user = await tx.user.create({
        data: {
          id: authUser.id,
          username: await this.generateUserName(email),
        },
      });

      delete authUser.password;

      return { authUser, user };
    });
  }

  async generateUserName(email: string): Promise<string> {
    const emailParts = email.split('@');
    const namePart = emailParts[0];
    const randomString = Math.random().toString(36).substring(2, 8);
    const userName = `${namePart}${randomString}`;
    return userName;
  }

  async testDeleteAllUserandAuthUser() {
    return await this.prisma.$transaction(async (tx) => {
      const authUser = await tx.authUser.deleteMany();
      const user = await tx.user.deleteMany();

      return { authUser, user };
    });
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const existingUser = await this.prisma.authUser.findUnique({
      where: { email },
    });
    return !!existingUser;
  }

  async getUserByEmail(email: string): Promise<AuthUser | null> {
    const user = await this.prisma.authUser.findUnique({
      where: { email },
    });

    return user;
  }

  async getUserById(id: string): Promise<AuthUser | null> {
    const user = await this.prisma.authUser.findUnique({
      where: { id },
    });

    return user;
  }

  async getAllVerifiedUsers(): Promise<AuthUser[]> {
    const users = await this.prisma.authUser.findMany({
      where: {
        emailVerified: {
          not: null,
        },
      },
    });

    return users;
  }

  async getAllUnverifiedUsers(): Promise<AuthUser[]> {
    const users = await this.prisma.authUser.findMany({
      where: {
        emailVerified: null,
      },
    });

    return users;
  }
}
