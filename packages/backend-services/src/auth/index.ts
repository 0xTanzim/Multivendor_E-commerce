import { AuthRepository } from '@repo/backend-repository';
import { BadRequestError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { AuthUser, User } from '@repo/database';
import { sendEmail, sendVerificationEmail } from '@repo/email-service';
import { IAuthUser } from '@repo/types';

import base64url from 'base64url';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class AuthService extends BaseService<AuthUser, AuthRepository> {
  constructor(authRepository: AuthRepository) {
    super(authRepository);
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
      };

      const res = await this.repository.registerUser(newUser);
      if (!res) {
        throw new BadRequestError('Failed to register user');
      }

      await this.sendVerifyEmail(res.authUser);

      return res;
    } catch (err) {
      throw new BadRequestError('Failed to register user');
    }
  }

  async sendVerifyEmail(user: AuthUser) {
    let redirectUrl = '';
    if (user.role === 'FARMER') {
      redirectUrl = `onboarding/${user.id}?token=${user.verificationToken}`;
    }

    try {
      const userId = user.id;

      const res = await sendVerificationEmail({
        to: user.email,
        name: user.name,
        redirectUrl,
        linkText: 'Verify your email',
        subject: 'Verify Account - MindFuel',
      });

      console.log('Email sent:', res);
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

  async testDeleteAllUserandAuthUser() {
    return await this.repository.testDeleteAllUserandAuthUser();
  }

  async sendForgetPasswordEmail(existingUser: AuthUser) {
    try {
      const userId = existingUser.id;

      const name = existingUser.name;

      const token = await this.generateToken();

      const redirectUrl = `reset-password?token=${token}&id=${userId}`;

      const description = `Click the link below to reset your password`;

      const res = await sendEmail({
        to: existingUser.email,
        name,
        redirectUrl,
        linkText: 'Reset Password',
        subject: 'Reset Password - MindFuel',
        description,
      });

      console.log('Email sent:', res);
    } catch (err) {
      console.error('Error sending forget password email:', err);
      throw new BadRequestError('Failed to send forget password email');
    }
  }
}
