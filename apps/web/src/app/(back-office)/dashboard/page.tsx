import LargeCards from '@/components/backOffice/card/LargeCards';
import SmallCards from '@/components/backOffice/card/SmallCards';
import Heading from '@/components/backOffice/layout/Heading';
import CustomDataTable from './_components/CustomDataTable';
import DashboardCarts from './_components/DashboardCarts';

const DashboardPage = () => {
  return (
    <div>
      <Heading title="Dashboard Overview" />
      {/* Large Card  */}
      <LargeCards />
      {/* small card  */}
      <SmallCards />
      {/* chats  */}
      <DashboardCarts />
      {/* Recent Orders table  */}
      <CustomDataTable />
    </div>
  );
};

export default DashboardPage;
