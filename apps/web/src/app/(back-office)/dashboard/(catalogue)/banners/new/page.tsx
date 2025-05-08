import FormHeader from '@/components/backOffice/form/FormHeader';
import { withPagePermission } from '@/lib';
import BannerForm from '../_components/BannerForm';

const NewBannerPage = async () => {
  await withPagePermission(['create:banner']);
  return (
    <div>
      <FormHeader title="New Banner" />
      <BannerForm />
    </div>
  );
};

export default NewBannerPage;
