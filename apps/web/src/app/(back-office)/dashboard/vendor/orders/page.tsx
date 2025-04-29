import { DataTable } from '@/components/data-table/DataTable';
import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { isOrderArray } from '@repo/types';
import PageHeader from '../../_components/PageHeader';
import { columns } from './columns';

const OrderPage = async () => {
  const { userId } = await authDetails();

  const ordersData = await getData(`orders/vendor/${userId}`);

  let orders = null;

  if (!isOrderArray(ordersData)) {
    orders = null;
  } else {
    orders = ordersData;
  }

  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="orders"
        linkTitle="Add order"
        href="/dashboard/orders/new"
      />

      <div className="py-8">
        {orders && <DataTable columns={columns} data={orders} />}
      </div>
    </div>
  );
};

export default OrderPage;
