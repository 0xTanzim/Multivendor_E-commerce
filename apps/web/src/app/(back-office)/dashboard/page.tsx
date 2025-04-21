import { getRole } from '@/lib';
import { getData } from '@/lib/getData';
import { isOrderArray, isProductArray, isSaleArray } from '@repo/types';
import AdminDashboard from './_components/AdminDashboard';
import FarmerDashboard from './_components/FarmerDashboard';
import UserDashboard from './_components/UserDashboard';

const DashboardPage = async () => {
  const role = await getRole();

  const normalizeRole = (role: string | null): string => {
    if (!role) return '';
    return role
      .toLowerCase()
      .trim()
      .replace(/[-_\s]+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Normalize the role to handle different formats
  const normalizedRole = normalizeRole(role);

  // Handle different user roles
  switch (normalizedRole) {
    case 'User':
      return <UserDashboard />;
    case 'Farmer':
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
