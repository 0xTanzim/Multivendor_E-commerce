"use client";

import UserAvatar from '@/components/shared/UserAvatar';
import ThemeSwitcherBtn from '@/components/ui/ThemeSwitcherBtn';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/images/logo.png';
import { HelpModal } from '../HelpModal';
import SearchForm from '../SearchForm';
import CartCount from '../cart/CartCount';

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <p>
        <span className="font-bold">Loading...</span>
        <span className="text-gray-500">
          Please wait while we load the data.
        </span>
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-700 shadow-sm">
      <div className=" flex items-center justify-between py-3 max-w-6xl mx-auto px-8 gap-8">
        <Link className="" href="/">
          <Image src={logo} alt="MindFuel logo" className="w-24" />
        </Link>

        <div className="flex-grow">
          <SearchForm />
        </div>

        <div className="flex gap-8">
          {status === 'unauthenticated' ? (
            <Link
              href={'/login'}
              className="flex items-center space-x-1 text-green-950 dark:text-green-50"
            >
              <User />
              <span>Login</span>
            </Link>
          ) : (
            session?.user && <UserAvatar user={session.user} />
          )}

          <HelpModal />
          <CartCount />
        </div>
        <ThemeSwitcherBtn />
      </div>
    </div>
  );
};

export default Navbar;
