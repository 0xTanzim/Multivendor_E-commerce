import { getData } from '@/lib/getData';
import advert from '@/public/images/ad.gif';
import { isBannerArray } from '@repo/types';
import { CircleDollarSign, FolderSync, HelpCircle } from 'lucide-react';
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
    <div className="grid grid-cols-12 gap-8 mb-6">
      <SidebarCategories />
      

      <div className="col-span-full sm:col-span-7   rounded-md">
        {banners && <HeroCarousel banners={banners} />}
      </div>

      <div className="col-span-2 hidden sm:block rounded-lg  bg-white p-4 dark:bg-slate-800 ">
        <Link className="flex items-center space-x-1 mb-3 " href="#">
          <HelpCircle className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />

          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Help Center</h2>
            <p className="text-[0.6rem]">Guide to Customer Care</p>
          </div>
        </Link>

        <Link className="flex items-center space-x-1 mb-3" href="#">
          <FolderSync className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />

          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Easy Return</h2>
            <p className="text-[0.6rem]">Quick Return</p>
          </div>
        </Link>

        <Link
          className="flex items-center space-x-1 mb-6"
          href="/register-farmer"
        >
          <CircleDollarSign className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />

          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Sell on MindFuel</h2>
            <p className="text-[0.6rem]">Million of Visitors</p>
          </div>
        </Link>

        <Image src={advert} alt="Advert" className="w-full rounded-lg" />
      </div>

    </div>
  );
};

export default Hero;
