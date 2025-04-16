import { getData } from '@/lib/getData';
import advert from '@/public/images/ad.gif';
import { isBannerArray } from '@repo/types';
import {
  ArrowRight,
  CircleDollarSign,
  FolderSync,
  HelpCircle,
  Leaf,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HeroCarousel from './HeroCarousel';
import SidebarCategories from './SidebarCategories';

const Hero = async () => {
  const bannerData = await getData('banners');

  let banners;

  if (!isBannerArray(bannerData)) {
    banners = null;
  } else {
    banners = bannerData;
  }
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-8 mb-8">
      {/* Categories sidebar */}
      <SidebarCategories />

      {/* Main hero carousel */}
      <div className="col-span-full sm:col-span-7 rounded-lg overflow-hidden shadow-lg">
        {banners && <HeroCarousel banners={banners} />}

        {/* Quick navigation pills below carousel */}
        <div className="hidden md:flex items-center justify-between bg-white dark:bg-slate-800 p-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Link
              href="/category/fruits"
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-lime-600 dark:hover:text-lime-400"
            >
              <span className="bg-lime-100 dark:bg-lime-900 p-1 rounded-full">
                <Leaf className="h-4 w-4 text-lime-600 dark:text-lime-400" />
              </span>
              <span>Fresh Produce</span>
            </Link>
            <Link
              href="/category/organic"
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-lime-600 dark:hover:text-lime-400"
            >
              <span className="bg-lime-100 dark:bg-lime-900 p-1 rounded-full">
                <Leaf className="h-4 w-4 text-lime-600 dark:text-lime-400" />
              </span>
              <span>Organic</span>
            </Link>
          </div>
          <Link
            href="/categories"
            className="text-xs font-medium text-lime-600 dark:text-lime-400 flex items-center"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </div>

      {/* Right sidebar with info cards */}
      <div className="col-span-2 hidden sm:block space-y-4">
        {/* Info cards with gradient backgrounds */}
        <div className="rounded-lg bg-gradient-to-r from-green-50 to-lime-50 dark:from-slate-800 dark:to-slate-700 p-4 shadow-sm border border-green-100 dark:border-slate-600 transition-transform hover:scale-[1.02]">
          <Link className="flex items-center space-x-3" href="#">
            <div className="bg-white dark:bg-slate-900 rounded-full p-2 shadow-sm">
              <HelpCircle className="w-5 h-5 text-lime-600 dark:text-lime-400" />
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Help Center
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Guide to Customer Care
              </p>
            </div>
          </Link>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 shadow-sm border border-blue-100 dark:border-slate-600 transition-transform hover:scale-[1.02]">
          <Link className="flex items-center space-x-3" href="#">
            <div className="bg-white dark:bg-slate-900 rounded-full p-2 shadow-sm">
              <FolderSync className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Easy Return
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Quick Return Process
              </p>
            </div>
          </Link>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 p-4 shadow-sm border border-amber-100 dark:border-slate-600 transition-transform hover:scale-[1.02]">
          <Link className="flex items-center space-x-3" href="/register-farmer">
            <div className="bg-white dark:bg-slate-900 rounded-full p-2 shadow-sm">
              <CircleDollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Sell on MindFuel
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Reach Millions of Buyers
              </p>
            </div>
          </Link>
        </div>

        {/* Ad banner */}
        <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:shadow-md">
          <Image src={advert} alt="Special Offer" className="w-full" priority />
        </div>
      </div>
    </div>
  );
};

export default Hero;
