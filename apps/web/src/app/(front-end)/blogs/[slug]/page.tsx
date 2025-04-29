import CategoryList from '@/components/frontend/landing/CategoryList';
import { getData } from '@/lib/getData';
import { isCategory, isTraining, isTrainingArray } from '@repo/types';
import BlogDetails from '../_components/BlogDetails';
import RecentBlogs from '../_components/RecentBlogs';
type IParams = {
  params: Promise<{ slug: string }>;
};
const page = async ({ params }: IParams) => {
  const { slug } = await params;

  const training = await getData(`trainings/training/${slug}`);

  if (!isTraining(training)) {
    return null;
  }

  const allTrainings = await getData('trainings');

  if (!isTrainingArray(allTrainings)) {
    return null;
  }

  const recentTrainings = allTrainings.filter(
    (training) => training.slug !== slug
  );

  const recentTrainingsToShow = recentTrainings.slice(0, 9);

  const categoriesData = await getData(
    `categories/${training.categoryId}?include=products`
  );
  let category = null;

  if (!isCategory(categoriesData)) {
    category = null;
  } else {
    category = categoriesData;
  }

  return (
    <>
      <section className="py-12 bg-white sm:py-16 lg:py-20 rounded-sm dark:bg-slate-700  ">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-7 lg:gap-x-12">
            <div className="bg-gray-100 lg:col-span-5 rounded-xl *:dark:bg-slate-800 ">
              <div className="px-4 py-5 sm:p-6 ">
                <BlogDetails training={training} />
              </div>
            </div>

            <RecentBlogs recentTraining={recentTrainingsToShow} />
          </div>
        </div>
      </section>

      <div className="py-8">
        {category && <CategoryList category={category} />}
      </div>
    </>
  );
};

export default page;
