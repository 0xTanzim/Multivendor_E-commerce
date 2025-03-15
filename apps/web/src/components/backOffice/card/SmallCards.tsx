import React from 'react'
import SmallCard from './SmallCard';


const orderStatus = [
  {
    title: "Total Orders",
    number: 470,
    iconColor: "bg-green-600",
    icon: "Cart",
  },
  {
    title: "Orders Pending",
    number: 130,
    iconColor: "bg-blue-600",
    icon: "Loader",
  },
  {
    title: "Order Processing",
    number: 150,
    iconColor: "bg-orange-600",
    icon: "RefreshCcw",
  },
  {
    title: "Orders Delivered",
    number: 300,
    iconColor: "bg-purple-600",
    icon: "CheckCheck",
  },
];

const SmallCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStatus.map((order, index) => (
        <SmallCard
          key={index}
          data={order}
        />
      ))}
    </div>
  );
}

export default SmallCards