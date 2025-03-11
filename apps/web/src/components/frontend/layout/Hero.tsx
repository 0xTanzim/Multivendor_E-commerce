import { CircleDollarSign, FolderSync, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HeroCarosual from './HeroCarosual';
import advert from '@/public/images/ad.gif'

const Hero = () => {
  const categories = [{}, {}, {}, {}, {}, {}];
  return (
    <div className="grid grid-cols-12 gap-8 mb-6">
      <div className="sm:col-span-3 hidden sm:block bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 overflow-hidden  ">
        <h2 className="bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-slate-100 py-3 px-6 font-semibold border-b  border-gray-300 dark:border-gray-600 ">
          Shop By Category
        </h2>

        <div className="py-3 px-6 h-[300px] overflow-y-auto flex flex-col gap-2 ">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <Link
                href="#"
                className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-md duration-500 transition-all dark:text-slate-300 dark:hover:bg-slate-600"
                key={index}
              >
                <Image
                  src="/items/item2.jpg"
                  width={200}
                  height={200}
                  alt="Category 1"
                  className="w-12 h-12 rounded-full object-cover border-lime-200"
                />

                <span className="text-sm">Vegitable</span>
              </Link>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </div>
      </div>

      <div className="col-span-4 sm:col-span-7   rounded-md">
        <HeroCarosual />
      </div>

      <div className="col-span-2 hidden sm:block rounded-lg  bg-white p-4 dark:bg-slate-800 ">
        <Link  className="flex items-center space-x-1 mb-3 " href="#">
          <HelpCircle className='shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900' />

          <div className="flex flex-col">
            <h2 className='uppercase text-sm'>Help Center</h2>
            <p className='text-[0.6rem]'>Guide to Customer Care</p>
          </div>
        </Link>

        
        <Link  className="flex items-center space-x-1 mb-3" href="#">
          <FolderSync className='shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900' />

          <div className="flex flex-col">
            <h2 className='uppercase text-sm'>Easy Return</h2>
            <p className='text-[0.6rem]'>Quick Return</p>
          </div>
        </Link>

        
        <Link  className="flex items-center space-x-1 mb-6" href="/register-farmer">
          <CircleDollarSign className='shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900' />

          <div className="flex flex-col">
            <h2 className='uppercase text-sm'>Sell on MindFuel</h2>
            <p className='text-[0.6rem]'>Million of Visitors</p>
          </div>
        </Link>

        <Image src={advert} alt="Advert" className='w-full rounded-lg' />

        
      </div>
    </div>
  );
};

export default Hero;
