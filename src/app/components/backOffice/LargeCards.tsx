import LargeCard from "./LargeCard";

const orderStats = [
  {
    period: "Todays Orders",
    sales: 1100,
    color: "bg-green-600",
    iconColor: "Layers",
  },
  {
    period: "Yesterdays Orders",
    sales: 1700,
    color: "bg-blue-600",
    iconColor: "Layers",
  },
  {
    period: "This Month",
    sales: 12000,
    color: "bg-orange-600",
    iconColor: "Cart",
  },
  {
    period: "All Time Sales",
    sales: 120000,
    color: "bg-purple-600",
    iconColor: "Calendar",
  },
];

const LargeCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
      {orderStats.map((order, index) => (
        <LargeCard
          key={index}
          data={order}
        />
      ))}
    </div>
  );
};

export default LargeCards;

