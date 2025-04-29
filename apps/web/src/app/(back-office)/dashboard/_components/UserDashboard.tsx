'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IOrder, isOrderArray } from '@repo/types';
import { calculateSubTotal } from '@repo/utils';
import { Box, Clock, Package, ShoppingBag, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const { data: session } = useSession();
  const [recentOrders, setRecentOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const ordersData = await fetch(`/api/orders/user/${session.user.id}`);
          const ordersJson = await ordersData.json();

          if (isOrderArray(ordersJson)) {
            console.log('Fetched orders:', ordersJson);

            setRecentOrders(ordersJson.slice(0, 5));
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading your dashboard...
      </div>
    );
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!session?.user?.name) return 'U';
    const nameParts = session.user.name.trim().split(' ');
    const firstInitial = nameParts[0]?.charAt(0) || '';
    const lastInitial = nameParts[1]?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase();
  };

  console.log('recentOrders', recentOrders);

  const dashboardItems = [
    {
      title: 'My Orders',
      description: 'View and manage your orders',
      icon: <ShoppingBag className="h-8 w-8 text-emerald-500" />,
      link: '/dashboard/orders',
      bgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      title: 'My Profile',
      description: 'Update your personal information',
      icon: <User className="h-8 w-8 text-blue-500" />,
      link: '/dashboard/profile',
      bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Order Tracking',
      description: 'Track the status of your orders',
      icon: <Package className="h-8 w-8 text-purple-500" />,
      link: '/dashboard/orders',
      bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Saved Items',
      description: "Products you've saved for later",
      icon: <Box className="h-8 w-8 text-amber-500" />,
      link: '/dashboard/saved-items',
      bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    },
  ];

  return (
    <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome, {session.user.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`rounded-full p-3 w-fit mb-4 ${item.bgClass}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-col items-center pb-2 pt-6 space-y-3">
            <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden border-4 border-emerald-200">
              {session.user.profileImage ? (
                <Image
                  src={session.user.profileImage}
                  alt={session.user.name || 'User'}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-2xl font-bold text-emerald-600">
                  {getInitials()}
                </span>
              )}
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold">{session.user.name}</h2>
              <p className="text-sm text-gray-500">{session.user.email}</p>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                {session.user.role}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-6">
            <div className="space-y-4">
              <Link href="/dashboard/profile" className="w-full">
                <button className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                  Edit Profile
                </button>
              </Link>
              <Link href="/dashboard/orders" className="w-full">
                <button className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  View All Orders
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your most recent purchases</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <p>Loading your orders...</p>
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => {
                  const subtotal = calculateSubTotal(order.OrderItem);

                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          <ShoppingBag className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Order #
                            {order.orderNumber || (order.id ? order.id.substring(0, 8) : 'N/A')}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${subtotal}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.orderStatus === 'DELIVERED'
                              ? 'bg-green-50 text-green-700'
                              : order.orderStatus === 'PROCESSING'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-4">
                  <Link
                    href="/dashboard/orders"
                    className="text-emerald-500 hover:text-emerald-600 text-sm font-medium"
                  >
                    View all orders →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No orders yet
                </h3>
                <p className="text-gray-500 mb-4">
                  You haven't placed any orders yet.
                </p>
                <Link
                  href="/"
                  className="text-emerald-500 hover:text-emerald-600 font-medium"
                >
                  Start shopping →
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
