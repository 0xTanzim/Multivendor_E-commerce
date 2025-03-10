import NewTrainingForm from '@/components/backOffice/community/NewTrainingForm';
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
      <NewTrainingForm categories={categories} />
    </div>
  );
};

export default NewTrainingPage;
