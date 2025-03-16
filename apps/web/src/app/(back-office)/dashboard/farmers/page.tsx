import { DataTable } from '@/components/data-table/DataTable';
import { getData } from '@/lib/getData';
import { isFarmers } from '@repo/types';
import PageHeader from '../_components/PageHeader';
import { columns } from './_components/columns';

const farmersPage = async () => {
  const farmersData = await getData('farmers');

  let farmers = null;

  if (!isFarmers(farmersData)) {
    farmers = null;
  } else {
    farmers = farmersData;
  }

  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Farmers"
        linkTitle="Add Farmer"
        href="/dashboard/farmers/new"
      />

      <div className="py-8">
        {farmers && (
          <DataTable
            columns={columns}
            data={farmers}
            filterKeys={['name', 'email']}
          />
        )}
      </div>
    </div>
  );
};

export default farmersPage;
