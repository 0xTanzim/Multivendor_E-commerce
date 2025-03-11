import { HelpCircle, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/images/logo.png';
import SearchForm from '../SearchForm';
import ThemeSwitcherBtn from '@/components/ui/ThemeSwitcherBtn';
import { HelpModal } from '../HelpModal';

const Navbar = () => {
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
          <Link
            href={'/login'}
            className="flex items-center space-x-1 text-green-950 dark:text-green-50"
          >
            <User />
            <span>Login</span>
          </Link>

        

          <HelpModal />

          <Link
            href="/cart"
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg "
          >
            <ShoppingCart className="text-lime-700 dark:text-lime-500" />
            <span className="sr-only">Cart</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  rounded-full -top-0 end-6 dark:border-gray-900">
              20
            </div>
          </Link>


        </div>
        <ThemeSwitcherBtn />
      </div>
    </div>
  );
};

export default Navbar;
