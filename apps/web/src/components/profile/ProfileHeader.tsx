'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Edit, Mail, MapPin } from 'lucide-react';
import { useSession } from 'next-auth/react';

const ProfileHeader = () => {
  const { data: session } = useSession();

  // Get user initials for avatar fallback
  const getInitials = (): string => {
    if (!session?.user?.name) return 'U';
    const nameParts = session.user.name.trim().split(' ');
    const firstInitial = nameParts[0]?.charAt(0) || '';
    const lastInitial = nameParts[1]?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase();
  };

  // Calculate a timestamp for when the account was created (mock data)
  const memberSince = 'January 2023';

  return (
    <div className="relative">
      {/* Banner background with gradient */}
      <div className="h-40 w-full bg-gradient-to-r from-emerald-500 to-teal-600"></div>

      {/* Profile info container */}
      <div className="px-8 pb-4 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-end">
          {/* Avatar */}
          <div className="absolute left-8 -top-16">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-md">
                {session?.user?.profileImage ? (
                  <AvatarImage
                    src={session.user.profileImage}
                    alt={session.user.name || 'User'}
                  />
                ) : (
                  <AvatarFallback className="text-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-200">
                    {getInitials()}
                  </AvatarFallback>
                )}
              </Avatar>

              <button className="absolute bottom-0 right-0 rounded-full h-8 w-8 flex items-center justify-center bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Change profile picture</span>
              </button>
            </div>
          </div>

          {/* User details */}
          <div className="ml-[160px] mt-4 pb-2 w-full">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {session?.user?.name || 'User'}
            </h1>

            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
              {session?.user?.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1.5" />
                  <span>{session.user.email}</span>
                </div>
              )}

              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5" />
                <span>United States</span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>Member since {memberSince}</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {session?.user?.role || 'USER'}
              </span>
              {session?.user?.emailVerified && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
