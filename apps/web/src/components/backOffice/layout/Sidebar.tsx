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
import { useMemo, useState } from 'react';

// Define user role constants
export const USER_ROLES = {
  ADMIN: 'Admin',
  FARMER: 'Farmer',
  USER: 'User',
  STAFF: 'Staff',
} as const;

// Type for user roles
export type UserRole = keyof typeof USER_ROLES;

// Normalize role function to handle different format variations
const normalizeRole = (role: string): string => {
  if (!role) return '';
  return role
    .toUpperCase()
    .trim()
    .replace(/[-_\s]/g, '');
};

// Check if user has required role
const hasRequiredRole = (
  userRole: string,
  requiredRoles: string[]
): boolean => {
  const normalizedUserRole = normalizeRole(userRole);
  return requiredRoles.some(
    (role) => normalizeRole(role) === normalizedUserRole
  );
};

// Interfaces for navigation structure
interface NavLink {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles: string[];
}

interface NavGroup {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  isCollapsible?: boolean;
  links?: NavLink[];
  roles?: string[];
}

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}

// Centralized navigation groups
const navigationGroups: NavGroup[] = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    href: '/dashboard',
    roles: [
      USER_ROLES.ADMIN,
      USER_ROLES.FARMER,
      USER_ROLES.USER,
      USER_ROLES.STAFF,
    ],
  },
  {
    title: 'Catalogue',
    icon: Slack,
    isCollapsible: true,
    links: [
      {
        title: 'Products',
        icon: Box,
        href: '/dashboard/products',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
      },
      {
        title: 'Categories',
        icon: LayoutList,
        href: '/dashboard/categories',
        roles: [USER_ROLES.ADMIN],
      },
      {
        title: 'Coupons',
        icon: BadgePercent,
        href: '/dashboard/coupons',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
      },
      {
        title: 'Store Banners',
        icon: MonitorPlay,
        href: '/dashboard/banners',
        roles: [USER_ROLES.ADMIN],
      },
    ],
  },
  {
    title: 'Management',
    icon: Users2,
    isCollapsible: true,
    links: [
      {
        title: 'Customers',
        icon: Users2,
        href: '/dashboard/customers',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
      },
      {
        title: 'Markets',
        icon: Warehouse,
        href: '/dashboard/markets',
        roles: [USER_ROLES.ADMIN],
      },
      {
        title: 'Farmers',
        icon: Tractor,
        href: '/dashboard/farmers',
        roles: [USER_ROLES.ADMIN],
      },
      {
        title: 'Staff',
        icon: User,
        href: '/dashboard/staff',
        roles: [USER_ROLES.ADMIN],
      },
      {
        title: 'Roles & Permissions',
        icon: Settings,
        href: '/dashboard/rbac',
        roles: [USER_ROLES.ADMIN],
      },
    ],
  },
  {
    title: 'Orders',
    icon: Truck,
    isCollapsible: true,
    links: [
      {
        title: 'My Orders',
        icon: Truck,
        href: '/dashboard/orders',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER, USER_ROLES.USER],
      },
      {
        title: 'Sales',
        icon: Truck,
        href: '/dashboard/sales',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
      },
    ],
  },
  {
    title: 'Finance',
    icon: CircleDollarSign,
    isCollapsible: true,
    links: [
      {
        title: 'Wallet',
        icon: CircleDollarSign,
        href: '/dashboard/wallet',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
      },
    ],
  },
  {
    title: 'Support',
    icon: HeartHandshake,
    isCollapsible: true,
    links: [
      {
        title: 'Farmer Support',
        icon: HeartHandshake,
        href: '/dashboard/farmer-support',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
      },
      {
        title: 'Community',
        icon: Building2,
        href: '/dashboard/community',
        roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
      },
    ],
  },
  {
    title: 'Profile',
    icon: User2,
    href: '/dashboard/profile',
    roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER, USER_ROLES.USER],
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER],
  },
  {
    title: 'Online Store',
    icon: ExternalLink,
    href: '/',
    roles: [USER_ROLES.ADMIN, USER_ROLES.FARMER, USER_ROLES.USER],
  },
];

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    catalogue: false,
    management: false,
    orders: false,
    finance: false,
    support: false,
  });

  // Handle loading state
  if (status === 'loading') {
    return <Loading />;
  }

  // Determine user role (default to USER if no session)
  const userRole = session?.user?.role ?? USER_ROLES.USER;

  // Filter navigation groups based on role
  const filteredGroups = useMemo(
    () =>
      navigationGroups
        .map((group) => {
          // Skip groups with direct links if role is not allowed
          if (
            group.href &&
            group.roles &&
            !group.roles.some((role) => hasRequiredRole(userRole, [role]))
          ) {
            return null;
          }
          // Filter collapsible group links
          if (group.links) {
            const filteredLinks = group.links.filter((link) =>
              // link.roles.some((role) => hasRequiredRole(userRole, [role]))
              hasRequiredRole(userRole, link.roles)
            );
            if (filteredLinks.length === 0) return null;
            return { ...group, links: filteredLinks };
          }
          return group;
        })
        .filter((group): group is NavGroup => group !== null),
    [userRole]
  );

  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirectTo: '/' });
  };

  // Toggle collapsible menu
  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Render a single navigation item (link or collapsible menu)
  const renderNavItem = (key: string, item: NavGroup) => {
    if (item.isCollapsible && item.links) {
      return (
        <Collapsible key={key} className="px-2 py-2">
          <CollapsibleTrigger
            onClick={() => toggleMenu(key)}
            className="flex items-center justify-between w-full py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-expanded={openMenus[key]}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </div>
            {openMenus[key] ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 ml-6 space-y-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-2">
            {item.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setShowSidebar(false)}
                className={`flex items-center space-x-3 py-2 px-4 rounded-lg text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-green-600 dark:text-green-400 font-medium'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.title}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link
        key={key}
        href={item.href!}
        onClick={() => setShowSidebar(false)}
        className={`flex items-center space-x-3 py-2 px-4 rounded-lg transition-colors ${
          pathname === item.href
            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 border-l-4 border-green-600'
            : 'hover:bg-slate-100 dark:hover:bg-slate-700'
        }`}
      >
        <item.icon className="w-5 h-5" />
        <span className="font-medium">{item.title}</span>
      </Link>
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-300 shadow-md overflow-y-auto transition-transform duration-300 ${
        showSidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      } sm:block z-40`}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" onClick={() => setShowSidebar(false)}>
          <Image
            src="/images/logo.png"
            width={150}
            height={150}
            alt="Logo"
            className="w-36"
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-2 px-4">
        {filteredGroups.map((item) =>
          renderNavItem(item.title.toLowerCase(), item)
        )}
      </nav>

      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 py-2 px-4 bg-emerald-500 dark:bg-emerald-700 text-white dark:text-slate-200 rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
