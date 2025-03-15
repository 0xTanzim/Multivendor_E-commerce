import { getData } from '@/lib/getData';
import { isTrainingArray } from '@repo/types';
import Link from 'next/link';
import TrainingCarousel from './TrainingCarousel';

const CommunityTrainings = async () => {
  const trainingData = await getData('trainings');

  let trainings = null;

  if (!isTrainingArray(trainingData)) {
    trainings = null;
  } else {
    trainings = trainingData;
  }

  return (
    <>
      <div className=" bg-white border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 overflow-hidden">
        <div className="bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-slate-100 py-3 px-6 font-semibold border-b  border-gray-300 dark:border-gray-600 flex justify-between items-center ">
          <h2>MindFuel Community</h2>
          <Link
            href={'#'}
            className="bg-lime-700 hover:bg-lime-800 duration-300 transition-all text-slate-50 rounded-md px-4 py-2"
          >
            See All
          </Link>
        </div>
        <div className="bg-white p-4 dark:bg-slate-700 ">
          {trainings && <TrainingCarousel trainings={trainings} />}
        </div>
      </div>
    </>
  );
};

export default CommunityTrainings;
