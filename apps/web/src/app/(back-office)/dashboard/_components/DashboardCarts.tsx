import BestSellingProductChart from "./BestSellingProductChart";
import WeeklySalesChart from "./WeeklySalesChart";

const DashboardCarts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <WeeklySalesChart />
      <BestSellingProductChart />
    </div>
  );
};

export default DashboardCarts;

