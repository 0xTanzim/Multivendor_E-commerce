import CategoryForm from '@/components/backOffice/form/CategoryForm';
import FormHeader from '@/components/backOffice/form/FormHeader';

const NewCategoryPage = () => {
  return (
    <div>
      <FormHeader title="New Category" />
      <CategoryForm />
    </div>
  );
};

export default NewCategoryPage;
