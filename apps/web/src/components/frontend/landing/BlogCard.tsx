import { getData } from '@/lib/getData';
import { isCategory, Training } from '@repo/types';
import { convertToNormalDate } from '@repo/utils';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type BlogCardProps = {
  training: Training;
};

const BlogCard = async ({ training }: BlogCardProps) => {
  const normalDate = convertToNormalDate(
    training.createdAt ?? new Date().toISOString()
  );

  const categoryId = training.categoryId;

  const category = await getData(`categories/${categoryId}`);

  if (!isCategory(category)) {
    return null;
  }

  return (
    <div className="group shadow-md rounded-lg p-6 bg-white dark:bg-slate-800 transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
          <Image
            className="object-cover w-full h-48 transition-all duration-200 transform group-hover:scale-110"
            src={training.image ?? ''}
            alt={training.title ?? ''}
            width={400}
            height={300}
          />
        </div>
        <span className="absolute px-3 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white rounded left-3 top-3">
          {category.title}
        </span>
      </div>
      <p className="mt-6 text-sm font-medium text-slate-600 dark:text-slate-200">
        {normalDate}
      </p>
      <h2 className="mt-4 text-xl font-bold leading-tight dark:text-slate-300  text-gray-900 xl:pr-8">
        <Link
          href={`/blogs/${training.slug}`}
          title={training.title}
          className="line-clamp-2"
        >
          {training.title}
        </Link>
      </h2>
      <div className="mt-6">
        <Link
          href={`/blogs/${training.slug}`}
          title={training.title}
          className="inline-flex items-center pb-2 text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-900 dark:border-lime-500 group dark:*:text-slate-200 dark:text-lime-500 hover:text-gray-900 dark:hover:text-lime-500"
        >
          Continue Reading
          <MoveRight className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
