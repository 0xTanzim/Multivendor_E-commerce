import LargeCards from '@/components/backOffice/card/LargeCards';
import SmallCards from '@/components/backOffice/card/SmallCards';
import Heading from '@/components/backOffice/layout/Heading';
import { getRole } from '@/lib';
import { getData } from '@/lib/getData';
import { isOrderArray, isProductArray, isSaleArray } from '@repo/types';
import CustomDataTable from './_components/CustomDataTable';
import DashboardCarts from './_components/DashboardCarts';
import FarmerDashboard from './_components/FarmerDashboard';
import UserDashboard from './_components/UserDashboard';

const DashboardPage = async () => {
  const role = await getRole();

  switch (role) {
    case 'USER':
      return <UserDashboard />;

    case 'FARMER':
      return <FarmerDashboard />;
  }

  const sales = await getData('sales');
  const { products, totalPages, totalCount } = await getData('products');
  const orders = await getData('orders');

  if (
    !isOrderArray(orders) ||
    !isProductArray(products) ||
    !isSaleArray(sales)
  ) {
    return <div className="text-red-500">Error: Invalid data format</div>;
  }

  return (
    <div>
      <Heading title="Dashboard Overview" />
      {/* Large Card  */}
      <LargeCards sales={sales} />
      {/* small card  */}
      <SmallCards orders={orders} />
      {/* chats  */}
      <DashboardCarts  sales={sales} orders={orders} />
      {/* Recent Orders table  */}
      <CustomDataTable />
    </div>
  );
};

export default DashboardPage;
