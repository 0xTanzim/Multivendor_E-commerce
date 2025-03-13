import { getData } from '@/lib/getData';
import { isMarketArray } from '@repo/types';
import MarketsCarousel from './MarketsCarousel';

const MarketList = async () => {
  const marketsData: unknown = await getData('markets');
  let markets = null;

  if (!isMarketArray(marketsData)) {
    markets = null;
  } else {
    markets = marketsData;
  }

  return (
    <div className="text-white py-16">
      <div className="bg-slate-50 dark:bg-lime-900 rounded-lg p-4">
        <h2 className="py-2 text-center text-2xl mb-4 text-slate-900 dark:text-slate-50">
          Shop By Market
        </h2>
        {markets ? (
          <MarketsCarousel markets={markets} />
        ) : (
          <p className="text-center text-slate-900 dark:text-slate-50">
            No markets available
          </p>
        )}
      </div>
    </div>
  );
};

export default MarketList;
