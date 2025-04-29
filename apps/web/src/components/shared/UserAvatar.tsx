'use client';

import { LayoutDashboard, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { $Enums } from '@repo/database';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserAvatarProps = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: $Enums.UserRole;
    emailVerified: boolean | null;
    profileImage?: string | null;
  };
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <Image
              src={user.profileImage || '/images/avatar.png'}
              width={200}
              height={200}
              className="rounded-full w-8 h-8"
              alt="avatar"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-4 py-2 pr-8  ">
          <DropdownMenuLabel>
            <span>{user.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <LayoutDashboard className=" h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center space-x-2">
              <Settings className=" h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>

          {
            user.role === 'USER' && (
              <DropdownMenuItem>
              <Link href="/dashboard/orders" className="flex items-center space-x-2">
                <Settings className=" h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
            )
            
          }

          <DropdownMenuItem>
            <button
              className="flex items-center space-x-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAvatar;
