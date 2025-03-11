import MarketsCarousel from './MarketsCarousel';

const MarketList = () => {
  return (
    <div className="text-white py-16">
     <div className="bg-slate-50 dark:bg-lime-900 rounded-lg p-4">
      <h2 className='py-2 text-center text-2xl mb-4 text-slate-900 dark:text-slate-50'>Shop By Market</h2>
     <MarketsCarousel />
     </div>
    </div>
  );
};

export default MarketList;
