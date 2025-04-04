import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { isFarmer } from '@repo/types';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import OverviewCards from './OverviewCards';

const FarmerDashboard = async () => {
  const { userId } = await authDetails();

  const user = await getData(`farmers/user/${userId}`);
  console.log('User data', user);

  if (!isFarmer(user)) {
    return <div className="text-red-500">Error: Invalid data format</div>;
  }

  if (user.status !== 'APPROVED') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-red-50 dark:bg-gray-900 p-6 rounded-lg shadow-md border border-red-200 dark:border-red-700">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400">
            Account Not Approved
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-center max-w-md">
          Your account is currently under review. Please contact support for
          more details. It may take up to 24 hours for your account to be
          approved.
          <br />
          <span className="font-semibold">Thank you for your patience!</span>
        </p>
        <Link
          href="/support"
          className="mt-4 px-5 py-2 flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg shadow-lg transition-all"
        >
          <AlertTriangle className="w-5 h-5 text-white" />
          Contact Support
        </Link>
      </div>
    );
  }

  const sales = await getData(`sales/vendor/${userId}`);

  const products = await getData(`products/vendor/${userId}`);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
      <OverviewCards sales={sales} products={products} />
    </div>
  );
};

export default FarmerDashboard;
