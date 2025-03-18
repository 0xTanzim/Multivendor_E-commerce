import TrainingForm from '@/components/backOffice/community/TrainingForm';
import FormHeader from '@/components/backOffice/form/FormHeader';
import { getData } from '@/lib/getData';
import { isCategoryArray, isTraining } from '@repo/types';

type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateTrainingPage = async ({ params }: IParams) => {
  const { id } = await params;

  const trainingData = await getData(`trainings/${id}`);

  let training = null;

  if (!isTraining(trainingData)) {
    return (
      <div>
        <p>Training not found. Please check the ID or try again later.</p>
      </div>
    );
  } else {
    training = trainingData;
  }

  const categoriesData: unknown = await getData('categories');

  if (!isCategoryArray(categoriesData)) {
    return <div>Failed to fetch categories</div>;
  }

  const categories = categoriesData.map((category) => ({
    id: category.id!,
    title: category.title,
  }));

  return (
    <div>
      <FormHeader title="Update Training" />
      {training && (
        <TrainingForm categories={categories} updateData={training} />
      )}
    </div>
  );
};

export default UpdateTrainingPage;
