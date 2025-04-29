'use client';

import { AlignJustify, Bell, X } from 'lucide-react';
import Image from 'next/image';

import UserAvatar from '@/components/shared/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import ThemeSwitcherBtn from '../../ui/ThemeSwitcherBtn';

type NavbarProps = {
  setShowSidebar: (showSidebar: boolean) => void;
  showSidebar: boolean;
};

const Navbar = ({ setShowSidebar, showSidebar }: NavbarProps) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800  text-slate-50 h-20 py-8 fixed top-0 w-full  px-8 z-50 pr-[25rem] sm:pr-[20rem] ">
      {/* <Link href="/dashboard" className="sm:hidden">
        <Image
          src="/images/logo.png"
          width={150}
          height={150}
          alt="logo"
          className="w-24"
        />
      </Link> */}

      {/* Icon  */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="text-emerald-500 dark:text-emerald-500"
      >
        <AlignJustify />
      </button>
      {/* 3 Icons  */}

      <div className="flex space-x-3 px-3">
        <ThemeSwitcherBtn />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg  ">
              <Bell className="text-emerald-500" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500   rounded-full -top-0 end-6 dark:border-gray-900">
                20
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-4 py-2 pr-8  ">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/avatar.png"
                  width={200}
                  height={200}
                  className="rounded-full w-8 h-8"
                  alt="avatar"
                />
                <div className="flex flex-col space-y-1">
                  <p>John Doe , place an order</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-green-500 text-white rounded-full ">
                      Order In
                    </p>
                    <p className="text-xs text-gray-500">
                      Jan 12, 2025 - 12:00 PM
                    </p>
                  </div>
                </div>

                <button className="ml-auto">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <DropdownMenuSeparator />
            </DropdownMenuItem>

            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/avatar.png"
                  width={200}
                  height={200}
                  className="rounded-full w-8 h-8"
                  alt="avatar"
                />
                <div className="flex flex-col space-y-1">
                  <p>John Doe , place an order</p>
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-green-500 text-white rounded-full ">
                      Order In
                    </p>
                    <p className="text-xs text-gray-500">
                      Jan 12, 2025 - 12:00 PM
                    </p>
                  </div>
                </div>

                <button className="ml-auto">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <DropdownMenuSeparator />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Image  */}
        {session && <UserAvatar user={session?.user} />}
      </div>
    </div>
  );
};

export default Navbar;
