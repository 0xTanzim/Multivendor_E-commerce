import Heading from "@/app/components/backOffice/Heading";
import LargeCards from "@/app/components/backOffice/LargeCards";
import SmallCards from "@/app/components/backOffice/SmallCards";
import DashboardCarts from "./_components/DashboardCarts";

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
    </div>
  );
};

export default DashboardPage;

