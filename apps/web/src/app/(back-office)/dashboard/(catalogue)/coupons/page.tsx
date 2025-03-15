import { DataTable } from '@/components/data-table/DataTable';
import { getData } from '@/lib/getData';
import { isCouponArray } from '@repo/types';
import PageHeader from '../../_components/PageHeader';
import { columns } from './_components/columns';

const couponsPage = async () => {
  const couponsData = await getData('coupons');
  let coupons = null;

  if (!isCouponArray(couponsData)) {
    coupons = null;
  } else {
    coupons = couponsData;
  }

  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Coupons"
        linkTitle="Add Coupon"
        href="/dashboard/coupons/new"
      />

      <div className="py-8">
        {coupons && <DataTable columns={columns} data={coupons} />}
      </div>
    </div>
  );
};

export default couponsPage;
