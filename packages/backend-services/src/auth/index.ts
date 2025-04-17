import { AuthRepository } from '@repo/backend-repository';
import { BadRequestError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { AuthUser, User } from '@repo/database';
import { MailService } from '@repo/smtp-email-service';
import { IAuthUser } from '@repo/types';

import base64url from 'base64url';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class AuthService extends BaseService<AuthUser, AuthRepository> {
  private mailService!: MailService;
  constructor(authRepository: AuthRepository) {
    super(authRepository);
  }

  setMailService(mailService: MailService) {
    this.mailService = mailService;
  }

  async register(
    data: IAuthUser
  ): Promise<{ authUser: AuthUser; user: User } | null> {
    try {
      const hashedPassword = await this.hashedPassword(data.password, 10);
      const token = await this.generateToken();

      const newUser = {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role,
        verificationToken: token,
        plan: data.plan ?? 'free',
      };

      const res = await this.repository.registerUser(newUser);
      if (!res) {
        throw new BadRequestError('Failed to register user');
      }

      await this.sendVerifyEmail({
        ...res.authUser,
        role: res.authUser.roleId,
      });

      return res as { authUser: AuthUser; user: User };
    } catch (err) {
      console.error('Error registering user:', err);
      throw new BadRequestError('Failed to register user');
    }
  }

  async sendVerifyEmail(user: IAuthUser) {
    if (!user) {
      throw new BadRequestError('User not found');
    }
    let redirectUrl = '';

    if (user.role === 'FARMER') {
      redirectUrl = `onboarding/${user.id}?token=${user.verificationToken}`;
    }

    try {
      const res = await this.mailService.sendVerificationEmail({
        to: user.email,
        name: user.name,
        redirectUrl,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new BadRequestError('Failed to send email');
    }
  }

  async hashedPassword(password: string, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken() {
    const token = uuidv4();
    const base64Token = base64url.encode(token);
    return base64Token;
  }

  async fetchUserByEmail(email: string) {
    return this.repository.findUnique({ where: { email } });
  }

  async updatePassword(data: { password: string; id: string }) {
    try {
      const hashedPassword = await this.hashedPassword(data.password, 10);

      const res = await this.repository.update(data.id, {
        password: hashedPassword,
      });

      if (!res) {
        throw new BadRequestError('Failed to reset password');
      }

      return res;
    } catch (err) {
      throw new BadRequestError('Failed to reset password');
    }
  }

  async sendForgetPasswordEmail(existingUser: AuthUser) {
    try {
      const userId = existingUser.id;

      const name = existingUser.name;

      const token = await this.generateToken();

      const redirectUrl = `reset-password?token=${token}&id=${userId}`;

      const res = await this.mailService.sendForgotPasswordEmail({
        to: existingUser.email,
        name,
        redirectUrl,
      });
      console.log('Email sent:', res);
    } catch (err) {
      console.error('Error sending forget password email:', err);
      throw new BadRequestError('Failed to send forget password email');
    }
  }
}
