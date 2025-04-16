import { getRole } from '@/lib';
import { getData } from '@/lib/getData';
import { isOrderArray, isProductArray, isSaleArray } from '@repo/types';
import AdminDashboard from './_components/AdminDashboard';
import FarmerDashboard from './_components/FarmerDashboard';
import UserDashboard from './_components/UserDashboard';

const DashboardPage = async () => {
  const role = await getRole();

  // Handle different user roles
  switch (role) {
    case 'USER':
      return <UserDashboard />;
    case 'FARMER':
      return <FarmerDashboard />;
  }

  // Fetch data for admin dashboard
  const sales = await getData('sales');
  const { products, totalPages, totalCount } = await getData('products');
  const orders = await getData('orders');

  // Validate data
  if (
    !isOrderArray(orders) ||
    !isProductArray(products) ||
    !isSaleArray(sales)
  ) {
    return <div className="text-red-500">Error: Invalid data format</div>;
  }

  // Return admin dashboard with data
  return (
    <AdminDashboard
      sales={sales}
      orders={orders}
      products={products}
      totalProducts={totalCount}
    />
  );
};

export default DashboardPage;
