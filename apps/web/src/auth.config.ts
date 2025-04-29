import { NextAuthConfig } from 'next-auth';

export const nextAuthConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,

  session: {
    strategy: 'jwt',
  },

  jwt: {
    // @ts-expect-error: The AUTH_SECRET environment variable is expected to be a string, but TypeScript cannot infer it.
    secret: process.env.AUTH_SECRET as string,

    encryption: true,
  },
};
