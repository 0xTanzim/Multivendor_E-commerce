import CommunityTrainings from '@/components/frontend/landing/CommunityTrainings';
import { getData } from '@/lib/getData';
import { isTrainingArray } from '@repo/types';

const BlogPage = async () => {
  const trainingData = await getData('trainings');

  let trainings = null;

  if (!isTrainingArray(trainingData)) {
    trainings = null;
  } else {
    trainings = trainingData;
  }

  return (
    <div>
      {trainings && (
        <CommunityTrainings trainings={trainings} title="Latest Blogs" />
      )}
    </div>
  );
};

export default BlogPage;
