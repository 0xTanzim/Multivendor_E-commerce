import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import OverviewCards from './OverviewCards';

const FarmerDashboard = async () => {
  const { session, userId } = await authDetails();

  console.log('userId', userId);

  const sales = await getData(`sales/vendor/${userId}`);

  const products = await getData(`products/vendor/${userId}`);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
      <OverviewCards sales={sales} products={products}  />
    </div>
  );
};

export default FarmerDashboard;
