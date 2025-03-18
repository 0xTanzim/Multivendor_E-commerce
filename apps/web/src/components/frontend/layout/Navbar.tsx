import ThemeSwitcherBtn from '@/components/ui/ThemeSwitcherBtn';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/images/logo.png';
import { HelpModal } from '../HelpModal';
import SearchForm from '../SearchForm';
import CartCount from '../cart/CartCount';

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
          <CartCount />
        </div>
        <ThemeSwitcherBtn />
      </div>
    </div>
  );
};

export default Navbar;
