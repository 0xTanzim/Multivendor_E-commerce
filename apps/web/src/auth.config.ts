import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '@repo/common/error';
import { prisma } from '@repo/database';
import { compare } from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const AppProviders = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'jb@gmail.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials, req) {
      try {
        console.log('Authorize function received credentials:', credentials);
        // Type-safe credential access
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new NotFoundError('No Inputs Found');
        }

        console.log('✅ Passed Check 1');
        const existingUser = await prisma.authUser.findUnique({
          where: { email },
        });

        if (!existingUser) {
          console.log('No user found');
          throw new NotFoundError('No user found');
        }
        console.log('✅ Passed Check 2');

        const passwordMatch = await compare(password, existingUser.password);
        if (!passwordMatch) {
          console.log('Password incorrect');
          throw new ForbiddenError('Password Incorrect');
        }
        console.log('✅ Pass 3 Checked');

        const user = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          emailVerified: existingUser.emailVerified,
        };

        console.log('User Compiled data');
        return user;
      } catch (error) {
        console.log('All steps failed', error);
        throw new InternalServerError('Something went wrong');
      }
    },
  }),
  // Add more providers here if needed
];

export const nextAuthConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: AppProviders,

  session: {
    strategy: 'jwt',
  },

  jwt: {
    // @ts-ignore
    secret: process.env.AUTH_SECRET as string,
    encryption: true,
  },
};


