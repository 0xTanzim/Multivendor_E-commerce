import { DataTable } from '@/components/data-table/DataTable';
import { getData } from '@/lib/getData';
import { isBannerArray } from '@repo/types';
import PageHeader from '../../_components/PageHeader';
import { columns } from './_components/columns';

const bannerPage = async () => {
  const bannersData = await getData('banners');
  let banners = null;

  if (!isBannerArray(bannersData)) {
    banners = null;
  } else {
    banners = bannersData;
  }

  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Banners"
        linkTitle="Add Banner"
        href="/dashboard/banners/new"
      />

      <div className="py-8">
        {banners && <DataTable columns={columns} data={banners} />}
      </div>
    </div>
  );
};

export default bannerPage;
