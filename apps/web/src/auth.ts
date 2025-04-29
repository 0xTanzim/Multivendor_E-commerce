import NextAuth, { type NextAuthResult } from 'next-auth';
import { authOptions } from './authOptions';

export const {
  handlers,
  signIn,
  signOut,
  auth,
}: NextAuthResult & { auth: any; signIn: any } = NextAuth(authOptions);
