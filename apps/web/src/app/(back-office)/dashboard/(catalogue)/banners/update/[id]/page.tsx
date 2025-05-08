import FormHeader from '@/components/backOffice/form/FormHeader';
import { withPagePermission } from '@/lib';
import { getData } from '@/lib/getData';
import { isBanner } from '@repo/types';
import BannerForm from '../../_components/BannerForm';

const BannerUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await withPagePermission(['update:banner']);
  const { id } = await params;

  const bannerData = await getData(`banners/${id}`);
  let banner = null;

  if (!isBanner(bannerData)) {
    return (
      <div>
        <p>Banner not found. Please check the ID or try again later.</p>
      </div>
    );
  } else {
    banner = bannerData;
  }

  return (
    <div>
      <FormHeader title="Update Banner" />
      {banner && <BannerForm updateData={banner} />}
    </div>
  );
};

export default BannerUpdatePage;
