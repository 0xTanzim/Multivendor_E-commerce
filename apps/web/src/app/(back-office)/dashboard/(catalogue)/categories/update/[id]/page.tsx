import CategoryForm from '@/components/backOffice/form/CategoryForm';
import FormHeader from '@/components/backOffice/form/FormHeader';
import { getData } from '@/lib/getData';
import { isCategory } from '@repo/types';

type IParams = {
  params: Promise<{ id: string }>;
};

const UpdateCategoryPage = async ({ params }: IParams) => {
  const { id } = await params;

  const categoryData = await getData(`categories/${id}`);

  let category = null;

  if (!isCategory(categoryData)) {
    return (
      <div>
        <p>Category not found. Please check the ID or try again later.</p>
      </div>
    );
  } else {
    category = categoryData;
  }

  return (
    <div>
      <FormHeader title="Update Category" />
      {category && <CategoryForm updateData={category} />}
    </div>
  );
};

export default UpdateCategoryPage;
