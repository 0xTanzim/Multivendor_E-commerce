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

  async registerUser(newUser: IAuthUser) {
    const { name, email, password, role, verificationToken, plan } = newUser;

    return await this.prisma.$transaction(async (tx) => {
      // Find the role by name
      const roleRecord = await this.prisma.role.findFirst({
        where: { name: role },
      });

      if (!roleRecord) {
        throw new Error(`Role ${role} not found`);
      }

      const emailExists = await this.checkEmailExists(email);

      if (emailExists) {
        throw new Error('Email already exists');
      }

      const authUser = await tx.authUser.create({
        data: {
          email,
          password,
          name,
          roleId: roleRecord.id,
          verificationToken,
          plan,
        },

        select: {
          id: true,
          email: true,
          name: true,
          role: { select: { name: true } },
          plan: true,
          verificationToken: true,
          accountStatus: true,
          emailVerified: true,
        },
      });

      await tx.user.create({
        data: {
          id: authUser.id,
          username: await this.generateUserName(email),
          firstName: name?.split(' ')[0],
          lastName: name?.split(' ').slice(1).join(' ') || undefined,
        },
      });

      return {
        ...authUser,
        role: roleRecord.name,
      };
    });
  }

  async generateUserName(email: string): Promise<string> {
    const emailParts = email.split('@');
    const namePart = emailParts[0];
    const randomString = Math.random().toString(36).substring(2, 8);
    const userName = `${namePart}${randomString}`;
    return userName;
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
