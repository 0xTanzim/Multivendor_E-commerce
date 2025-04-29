'use client';
import { useAppSelector } from '@/hooks/storeHook';
import { selectCartTotalLength } from '@repo/redux';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CartCount = () => {
  const cartItems = useAppSelector(selectCartTotalLength);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    setMounted(true);
    console.log('Session:', session);
    console.log('Status:', status);
  }, []);

  return (
    <Link
      href="/cart"
      type="button"
      className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg "
    >
      <ShoppingCart className="text-lime-700 dark:text-lime-500" />
      <span className="sr-only">Cart</span>
      {mounted && (
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 end-6 dark:border-gray-900">
          {cartItems > 0 ? cartItems : 0}
        </div>
      )}
    </Link>
  );
};

export default CartCount;
