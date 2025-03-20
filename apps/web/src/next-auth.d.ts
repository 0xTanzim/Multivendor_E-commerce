import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // Extend the User type returned by authorize
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    emailVerified: boolean | null;
  }

  // Extend the Session type to include custom properties in session.user
  interface Session {
    user: {
      id: string;
      role: string;
      emailVerified: boolean | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  // Extend the JWT type to include custom properties in the token
  interface JWT {
    id: string;
    role: string;
    emailVerified: boolean | null;
  }
}

// If you still need to fix the adapter type issue, add this:
declare module '@auth/core/adapters' {
  interface AdapterUser {
    id: string;
    email: string;
    emailVerified: Date | null;
    name?: string | null;
    image?: string | null;
    role: string;
  }
}