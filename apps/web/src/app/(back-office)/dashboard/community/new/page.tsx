import TrainingForm from '@/components/backOffice/community/TrainingForm';
import FormHeader from '@/components/backOffice/form/FormHeader';
import { getData } from '@/lib/getData';
import { isCategoryArray } from '@repo/types';

const NewTrainingPage = async () => {
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
      <FormHeader title="New Training" />
      <TrainingForm categories={categories} />
    </div>
  );
};

export default NewTrainingPage;
