import { Training } from '@repo/types';
import { convertToNormalDate } from '@repo/utils';
import Image from 'next/image';

type BlogDetailsProps = {
  training: Training;
};

const BlogDetails = ({ training }: BlogDetailsProps) => {
  const normalDate = convertToNormalDate(
    training.createdAt ?? new Date().toISOString()
  );
  return (
    <div className=" mx-auto">
      <div className="max-w-3xl mx-auto">
        <p className="text-base font-medium text-slate-500 dark:text-slate-400 ">
          {normalDate}
        </p>
        <h1 className="mt-6 text-4xl font-bold text-slate-900 dark:text-slate-200 sm:text-5xl">
          {training.title}
        </h1>
      </div>

      <div className="mt-12 sm:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6">
        <Image
          className="object-cover w-full h-full"
          src={training.image ?? ''}
          alt={training.title ?? ''}
          width={400}
          height={300}
        />
      </div>

      <div className="py-8 text-slate-900 dark:text-slate-200 ">
        <p className="text-lg   ">{training.description}</p>
        <hr className="mt-6" />

        <div className="py-8">
          <article className="">
            {training.content ? (
              <div
                className="prose prose-slate dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: training.content }}
              />
            ) : (
              <p className="text-lg font-bold text-gray-900 lg:text-xl">
                No content available for this training.
              </p>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
