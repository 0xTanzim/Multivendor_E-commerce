import { Calendar, Layers, ShoppingCart } from 'lucide-react';

type LargeCardProps = {
  data: {
    period?: string;
    sales?: number | string;
    color?: string;
    icon?: string;
  };
};

const LargeCard = ({ data }: LargeCardProps) => {
  return (
    <div
      className={`rounded-lg text-white  shadow-md p-8  flex datas-center  flex-col gap-2 ${data.color}`}
    >
      {/* <Layers /> */}

      {data.icon === 'Layers' && <Layers />}
      {data.icon === 'Cart' && <ShoppingCart />}
      {data.icon === 'Calendar' && <Calendar />}

      <h4>{data.period}</h4>
      <h2 className="text-2xl lg:text-3xl">${data.sales}</h2>
    </div>
  );
};

export default LargeCard;
