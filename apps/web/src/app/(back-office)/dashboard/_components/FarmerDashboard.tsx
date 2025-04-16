import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { Farmer, isFarmer } from '@repo/types';

import FarmerOverviewCards from '@/app/(back-office)/dashboard/_components/farmer/FarmerOverviewCards';
import FarmerProductsPanel from '@/app/(back-office)/dashboard/_components/farmer/FarmerProductsPanel';
import FarmerSalesChart from '@/app/(back-office)/dashboard/_components/farmer/FarmerSalesChart';
import PendingApprovalMessage from '@/app/(back-office)/dashboard/_components/farmer/PendingApprovalMessage';
import ProfileSummary from '@/app/(back-office)/dashboard/_components/farmer/ProfileSummary';

const FarmerDashboard = async () => {
  const { userId } = await authDetails();

  const user = await getData(`farmers/user/${userId}`);

  if (!isFarmer(user)) {
    return <div className="text-red-500">Error: Invalid data format</div>;
  }

  if (user.status !== 'APPROVED') {
    return <PendingApprovalMessage />;
  }

  const sales = await getData(`sales/vendor/${userId}`);
  const products = await getData(`products/vendor/${userId}`);

  return (
    <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column - Profile Summary */}
        <div className="lg:col-span-1">
          <ProfileSummary farmer={user as Farmer} />
        </div>

        {/* Right column - Dashboard content */}
        <div className="lg:col-span-3 space-y-6">
          <FarmerOverviewCards sales={sales} products={products} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FarmerSalesChart sales={sales} />
            <FarmerProductsPanel products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
