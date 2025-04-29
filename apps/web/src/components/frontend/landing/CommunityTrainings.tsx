import { Training } from '@repo/types';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import BlogCard from './BlogCard';

type CommunityTrainingsProps = {
  trainings: Training[];
  title?: string;
};

const CommunityTrainings = async ({
  trainings,
  title = 'Community Trainings',
}: CommunityTrainingsProps) => {
  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-100 dark:border-slate-700 my-8">
      <div className="px-6 sm:px-8 mx-auto max-w-7xl">
        <div className="mx-auto md:mx-0 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 dark:bg-slate-700 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {title}
              </h2>
            </div>

            <Link
              href="/blogs"
              className="group flex items-center px-5 py-2.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all duration-200 self-start sm:self-center"
            >
              <span className="font-medium mr-2">View All Trainings</span>
              <ArrowRight className="w-4 h-4 transition-all duration-200 transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300 max-w-3xl">
            Stay updated with the latest trainings and workshops to enhance your
            skills and knowledge. Explore our curated list of informative
            sessions designed to empower you in your journey.
          </p>
        </div>

        {/* Trainings grid with improved spacing and hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {trainings && trainings.length > 0 ? (
            trainings.map((training) => (
              <div
                key={training.id}
                className="relative transition-transform duration-300 hover:-translate-y-2"
              >
                <BlogCard training={training} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-40 bg-white dark:bg-slate-700 rounded-lg">
              <p className="text-slate-500 dark:text-slate-400">
                No training content available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityTrainings;
