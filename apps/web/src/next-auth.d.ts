import { $Enums } from '@repo/database';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // Extend the User type returned by authorize
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: $Enums.UserRole;
    emailVerified: boolean | null;
    profileImage?: string | null;
    accountStatus?: $Enums.AccountStatus;
  }

  // Extend the Session type to include custom properties in session.user
  interface Session {
    user: {
      id: string;
      role: $Enums.UserRole;
      emailVerified: boolean | null;
      profileImage?: string | null;
      accountStatus?: $Enums.AccountStatus;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  // Extend the JWT type to include custom properties in the token
  interface JWT {
    id: string;
    role: $Enums.UserRole;
    emailVerified: boolean | null;
    profileImage?: string | null;
    accountStatus?: $Enums.AccountStatus;
    email?: string | null;
    name?: string | null;
  }
}

// If you still need to fix the adapter type issue, add this:
declare module '@auth/core/adapters' {
  interface AdapterUser {
    id: string;
    email: string;
    emailVerified: Date | null;
    name?: string | null;
    profileImage?: string | null;
    role: $Enums.UserRole;
    accountStatus: $Enums.AccountStatus;
    
  }
}
