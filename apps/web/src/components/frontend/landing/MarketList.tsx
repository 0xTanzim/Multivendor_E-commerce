import { getData } from '@/lib/getData';
import { isMarketArray } from '@repo/types';
import { Store } from 'lucide-react';
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
    <section className="py-10 sm:py-14">
      <div className="bg-gradient-to-r from-lime-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-sm border border-lime-100 dark:border-slate-600 overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-lime-100 dark:bg-slate-900 p-2 rounded-lg">
                <Store className="h-6 w-6 text-lime-600 dark:text-lime-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Featured Markets
              </h2>
            </div>
            <span className="text-xs bg-lime-100 dark:bg-slate-600 text-lime-800 dark:text-lime-200 py-1 px-3 rounded-full font-medium">
              {markets ? markets.length : 0} Markets
            </span>
          </div>

          {markets ? (
            <div className="relative">
              <MarketsCarousel markets={markets} />
              <div className="absolute -bottom-6 left-0 right-0 h-16 bg-gradient-to-t from-emerald-50 to-transparent dark:from-slate-700 dark:to-transparent pointer-events-none"></div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-white dark:bg-slate-700 rounded-lg">
              <p className="text-slate-500 dark:text-slate-400">
                No markets available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketList;
