
import DashboardCarts from "./_components/DashboardCarts";
import CustomDataTable from "./_components/CustomDataTable";
import Heading from "@/components/backOffice/Heading";
import LargeCards from "@/components/backOffice/LargeCards";
import SmallCards from "@/components/backOffice/SmallCards";

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

