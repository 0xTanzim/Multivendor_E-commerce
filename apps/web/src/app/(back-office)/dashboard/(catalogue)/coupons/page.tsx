import { DataTable } from '@/components/data-table/DataTable';
import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { isCouponArray } from '@repo/types';
import PageHeader from '../../_components/PageHeader';
import { columns } from './_components/columns';

const couponsPage = async () => {
  const { userId, role } = await authDetails();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  let couponsUrl = null;
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
    couponsUrl = '/coupons';
  } else if (role === 'FARMER') {
    couponsUrl = `/coupons/vendors/${userId}`;
  }

  if (!couponsUrl) {
    return <div>No coupons available</div>;
  }

  const couponsData = await getData(couponsUrl);
  let coupons = null;

  if (!isCouponArray(couponsData)) {
    coupons = null;
  } else {
    coupons = couponsData;
  }

  console.log('coupons:', coupons);

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
