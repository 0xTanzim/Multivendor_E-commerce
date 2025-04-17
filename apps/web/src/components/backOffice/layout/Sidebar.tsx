'use client';
import Loading from '@/app/loading';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import {
  BadgePercent,
  Box,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  HeartHandshake,
  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  Settings,
  Slack,
  Tractor,
  Truck,
  User,
  User2,
  Users2,
  Warehouse,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
};

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  if (status === 'loading') {
    return <Loading />;
  }

  let userLinks;
  const role = session?.user?.role;

  const sidebarLinks = [
    {
      title: 'Customers',
      icon: Users2,
      href: '/dashboard/customers',
    },
    {
      title: 'Markets',
      icon: Warehouse,
      href: '/dashboard/markets',
    },
    {
      title: 'Farmers',
      icon: Tractor,
      href: '/dashboard/farmers',
    },
    {
      title: 'My Orders',
      icon: Truck,
      href: '/dashboard/orders',
    },
    {
      title: 'Sales',
      icon: Truck,
      href: '/dashboard/sales',
    },
    {
      title: 'Staff',
      icon: User,
      href: '/dashboard/staff',
    },
    {
      title: 'Roles & Permissions',
      icon: Settings,
      href: '/dashboard/rbac',
    },
    {
      title: 'Community',
      icon: Building2,
      href: '/dashboard/community',
    },
    {
      title: 'Wallet',
      icon: CircleDollarSign,
      href: '/dashboard/wallet',
    },
    {
      title: 'Farmer Support',
      icon: HeartHandshake,
      href: '/dashboard/farmer-support',
    },

    {
      title: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
    },
    {
      title: 'Online Store',
      icon: ExternalLink,
      href: '/',
    },
  ];

  const catalogLinks = [
    {
      title: 'Products',
      icon: Box,
      href: '/dashboard/products',
    },
    {
      title: 'Categories',
      icon: LayoutList,
      href: '/dashboard/categories',
    },
    {
      title: 'Coupons',
      icon: BadgePercent,
      href: '/dashboard/coupons',
    },
    {
      title: 'store Banners',
      icon: MonitorPlay,
      href: '/dashboard/banners',
    },
  ];

  if (role === 'ADMIN') {
    userLinks = sidebarLinks;
  } else if (role === 'FARMER') {
    userLinks = sidebarLinks.filter(
      (link) =>
        link.title !== 'Staff' &&
        link.title !== 'Categories' &&
        link.title !== 'store Banners'
    );
  } else {
    userLinks = sidebarLinks.filter(
      (link) => link.title === 'My Orders' || link.title === 'Online Store'
    );

    userLinks.push({
      title: 'Profile',
      icon: User2,
      href: '/dashboard/profile',
    });
  }

  const handleLogout = async () => {
    await signOut({ redirectTo: '/' });
  };

  return (
    <div
      className={
        showSidebar
          ? 'sm:block  dark:bg-slate-800 sm:mt-0 mt-20 bg-slate-50 space-y-6 w-64  h-screen text-slate-800 dark:text-slate-300  fixed top-0 left-0 shadow-md overflow-y-scroll'
          : 'hidden mt-20 sm:mt-0 sm:block dark:bg-slate-800 bg-slate-50 space-y-6 w-64  h-screen text-slate-800 dark:text-slate-300  fixed top-0 left-0 shadow-md overflow-y-scroll'
      }
    >
      <Link
        className="mb-6"
        href="/dashboard"
        onClick={() => setShowSidebar(false)}
      >
        <Image
          src="/images/logo.png"
          width={150}
          height={150}
          alt="logo"
          className="w-36"
        />
      </Link>

      <div className="space-y-3 flex flex-col ">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={
            '/dashboard' === pathname
              ? ' flex items-center space-x-2 py-2 px-6 border-l-8 border-green-600 text-green-500'
              : 'flex items-center space-x-2  py-2 px-6'
          }
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>

        {role && role !== 'USER' && (
          <Collapsible className="px-6 py-2">
            <CollapsibleTrigger onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <div className={'flex items-center space-x-2  py-2'}>
                <div className="flex items-center space-x-2">
                  <Slack />
                  <span>Catalogue</span>
                </div>
                {isOpenMenu ? <ChevronDown /> : <ChevronRight />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pl-6 py-3 bg-slate-100 dark:text-slate-300 dark:dark:bg-slate-800 rounded-lg">
              {catalogLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setShowSidebar(false)}
                  className={
                    item.href === pathname
                      ? ' flex items-center space-x-2 py-1 text-sm border-green-600 text-green-500'
                      : 'flex items-center space-x-2  py-1 '
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {userLinks.map((itemLink, index) => (
          <Link
            key={index}
            href={itemLink.href}
            onClick={() => setShowSidebar(false)}
            className={
              itemLink.href === pathname
                ? ' flex items-center space-x-2 py-2 px-6 border-l-8 border-green-600 text-green-500'
                : 'flex items-center space-x-2  py-2 px-6'
            }
          >
            <itemLink.icon />
            <span>{itemLink.title}</span>
          </Link>
        ))}
        <div className="py-2 px-6">
          <button
            className="dark:bg-emerald-700 dark:text-slate-300 text-slate-50 bg-emerald-500   rounded flex items-center space-x-2 py-2 px-4"
            onClick={handleLogout}
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
