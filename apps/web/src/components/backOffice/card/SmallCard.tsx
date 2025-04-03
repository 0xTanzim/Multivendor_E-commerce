import { CheckCheck, Loader, RefreshCcw, ShoppingCart } from 'lucide-react';

type SmallCardProps = {
  data: {
    title?: string;
    number?: number | string;
    iconColor?: string;
    icon?: string;
  };
};

const SmallCard = ({ data }: SmallCardProps) => {
  return (
    <div className="rounded-lg shadow-lg bg-slate-100 dark:bg-slate-700 p-4 dark:text-slate-50 text-slate-800">
      <div className="flex space-x-4">
        <div
          className={`w-12 h-12 rounded-full items-center flex justify-center ${data.iconColor}`}
        >
          <div className="text-slate-50 dark:text-slate-200">
            {data.icon === 'Cart' && <ShoppingCart />}
            {data.icon === 'Loader' && <Loader />}
            {data.icon === 'RefreshCcw' && <RefreshCcw />}
            {data.icon === 'CheckCheck' && <CheckCheck />}
          </div>
        </div>

        <div className="">
          <p>{data.title}</p>
          <h3 className="text-2xl font-bold">{data.number}</h3>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
