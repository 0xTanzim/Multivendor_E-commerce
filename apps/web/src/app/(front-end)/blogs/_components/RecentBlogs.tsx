import { Training } from '@repo/types';
import { convertToNormalDate } from '@repo/utils';
import Image from 'next/image';
import Link from 'next/link';

type RecentBlogsProps = {
  recentTraining: Training[];
};

const RecentBlogs = ({ recentTraining }: RecentBlogsProps) => {
  return (
    <div className="lg:col-span-2">
      <p className="text-xl font-bold text-slate-900 dark:text-slate-200">
        Recent Trainings
      </p>

      <div className="mt-6 space-y-5">
        {recentTraining && recentTraining.length > 0 ? (
          recentTraining.map((training) => {
            const normalDate = convertToNormalDate(
              training.createdAt ?? new Date().toISOString()
            );

            return (
              <div
                key={training.id}
                className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
              >
                <div className="p-4">
                  <div className="flex items-start flex-col lg:items-center">
                    <Image
                      className="object-cover w-full h-16 rounded-lg shrink-0"
                      src={training.image ?? ''}
                      width={80}
                      height={80}
                      priority
                      alt={training.title ?? ''}
                    />
                    <div className="ml-5 flex flex-col items-start lg:items-center">
                      <p className="text-lg leading-7 font-bold text-gray-900 dark:text-slate-100 mt-2.5 ">
                        <Link
                          href={`/blogs/${training.slug}`}
                          title={training.title}
                          className="line-clamp-2"
                        >
                          {training.title}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 *:dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
            <div className="p-4">
              <div className="flex items-start lg:items-center">
                <Image
                  className="object-cover w-20 h-20 rounded-lg shrink-0"
                  src={''}
                  width={80}
                  height={80}
                  alt=""
                />
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-900 *:dark:text-slate-100">
                    No Recent Trainings
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;
