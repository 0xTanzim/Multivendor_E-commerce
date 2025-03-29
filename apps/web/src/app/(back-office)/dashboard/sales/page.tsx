import { DataTable } from '@/components/data-table/DataTable';
import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { columns } from './columns';

const salePage = async () => {
  const { userId, role } = await authDetails();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  let saleUrl;

  if (role === 'ADMIN') {
    saleUrl = 'sales';
  } else if (role === 'FARMER') {
    saleUrl = `sales/vendor/${userId}`;
  } else {
    return <div>Unauthorized</div>;
  }

  const salesData = await getData(saleUrl);

  let sales = salesData;

  // if (!isOrderArray(salesData)) {
  //   sales = null;
  // } else {
  //   sales = salesData;
  // }

  console.log('==== sales ====', sales);

  // return;

  return (
    <div>
      <div className="py-8">
        {sales && (
          <DataTable
            columns={columns}
            data={sales}
            filterKeys={['productTitle']}
          />
        )}
      </div>
    </div>
  );
};

export default salePage;
