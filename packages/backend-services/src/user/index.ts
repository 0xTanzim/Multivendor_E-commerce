import { UserRepository } from '@repo/backend-repository';
import { BadRequestError, ConflictError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { prisma, User } from '@repo/database';
import { sendVerificationEmail } from '@repo/email-service';

import base64url from 'base64url';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }

  // async fetchUserByEmail(email: string) {
  //   return this.repository.findUnique({ where: { email } });
  // }

  // async createUser(data: User) {
  //   try {
  //     const newUser = {
  //       email: data.email,
  //       name: data.name,
  //       password: data.password,
  //       role: data.role,
  //       bio: data.bio ?? '',
  //     };

  //     const hashedPassword = await this.hashedPassword(data.password, 10);
  //     const token = await this.generateToken();

  //     const user = await prisma.user.create({
  //       data: {
  //         ...newUser,
  //         password: hashedPassword,
  //         verificationToken: token,
  //       },
  //     });

  //     if (user.role === 'FARMER') {
  //       await this.sendVerifyEmail(user);
  //     }

  //     return user;
  //   } catch (err) {
  //     if (err.code === 'P2002') {
  //       throw new ConflictError('User with this email already exists');
  //     }

  //     throw new BadRequestError('Failed to create user');
  //   }
  // }

  // async generateToken() {
  //   const token = uuidv4();
  //   const base64Token = base64url.encode(token);
  //   return base64Token;
  // }

  // async sendVerifyEmail(user: User) {
  //   try {
  //     const userId = user.id;

  //     const res = await sendVerificationEmail({
  //       to: user.email,
  //       name: user.name,
  //       redirectUrl: `onboarding/${userId}?token=${user.verificationToken}`,
  //       linkText: 'Verify your email',
  //       subject: 'Verify Account - MindFuel',
  //     });

  //     console.log('Email sent:', res);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     throw new BadRequestError('Failed to send email');
  //   }
  // }

  // async hashedPassword(password: string, saltRounds = 10) {
  //   const salt = await bcrypt.genSalt(saltRounds);
  //   return bcrypt.hash(password, salt);
  // }

  // async comparePassword(password: string, hashedPassword: string) {
  //   return bcrypt.compare(password, hashedPassword);
  // } 
}
