import { DataTable } from '@/components/data-table/DataTable';
import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { flattenObject } from '@/utils';
import { columns } from './columns';

const salePage = async () => {
  const { userId, role } = await authDetails();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const customersData = await getData('customers');

  // Ensure customersData is an array before processing
  const customer = Array.isArray(customersData) ? customersData.map(flattenObject) : [];

  console.log('customer', customer);

  return (
    <div>
      <div className="py-8">
        {customer && (
          <DataTable columns={columns} data={customer} filterKeys={['name']} />
        )}
      </div>
    </div>
  );
};

export default salePage;
