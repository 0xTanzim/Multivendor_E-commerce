import { Training } from '@repo/types';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import BlogCard from './BlogCard';

type CommunityTrainingsProps = {
  trainings: Training[];
  title?: string;
};

const CommunityTrainings = async ({
  trainings,
  title,
}: CommunityTrainingsProps) => {
  return (
    <>
      <section className="py-12 bg-white rounded-md shadow-sm dark:bg-slate-800 sm:py-16 lg:py-20 ">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className=" mx-auto md:mx-0">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-slate-100">
                {title}
              </h2>

              <Link
                href={`/blog`}
                className="bg-slate-800 py-3 px-5 rounded flex items-center text-white font-bold text-sm hover:bg-slate-700 transition-all duration-200"
                title="See All Trainings"
              >
                See All
                <MoveRight className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-5 text-base font-normal leading-7 text-gray-500 dark:text-slate-200">
              Stay updated with the latest trainings and workshops to enhance
              your skills and knowledge. Explore our curated list of informative
              sessions designed to empower you in your journey.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
            {trainings &&
              trainings.map((training) => (
                <div key={training.id} className="relative">
                  <BlogCard training={training} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityTrainings;
