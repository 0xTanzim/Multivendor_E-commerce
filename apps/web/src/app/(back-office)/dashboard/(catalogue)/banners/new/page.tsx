import BannerForm from '@/components/backOffice/form/BannerForm';
import FormHeader from '@/components/backOffice/form/FormHeader';

const NewBannerPage = () => {
  return (
    <div>
      <FormHeader title="New Banner" />
      <BannerForm />
    </div>
  );
};

export default NewBannerPage;
