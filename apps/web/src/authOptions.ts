import { PrismaAdapter } from '@auth/prisma-adapter';
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '@repo/common/error';
import { prisma } from '@repo/database';
import { compare } from 'bcryptjs';
import { AuthError, NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
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
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true,
              emailVerified: true,
              user: {
                select: {
                  profileImage: true,
                },
              },
            },
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
            profileImage: existingUser.user?.profileImage,
          };

          console.log('User Compiled data');
          return user;
        } catch (error) {
          if (error instanceof NotFoundError) {
            console.log('NotFoundError:', error);
            throw new AuthError('User not found');
          }
          if (error instanceof ForbiddenError) {
            console.log('ForbiddenError:', error);
            throw new AuthError('Incorrect credentials');
          }

          console.log('Unhandled Error:', error);
          throw new InternalServerError('Something went wrong');
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        console.log(`token: ${JSON.stringify(token)} in session`);
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role;
        session.user.emailVerified = token.emailVerified;
        session.user.profileImage = token.profileImage;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name as string;
        token.email = user.email as string;
        token.role = user.role;
        token.emailVerified = user.emailVerified as boolean;
        token.profileImage = user.profileImage ?? null;
      }
      return token;
    },
  },
};
