import { DataTable } from '@/components/data-table/DataTable';
import { getData } from '@/lib/getData';
import { isUserArray } from '@repo/types';
import PageHeader from '../_components/PageHeader';
import { columns } from './_components/columns';

const farmersPage = async () => {
  const farmersData = await getData('farmers');
  let farmers = null;
  if (!isUserArray(farmersData)) {
    return null;
  }

  farmers = farmersData.filter((farmer) => farmer.farmerProfile !== null);

  return (
    <div>
      <PageHeader
        heading="Farmers"
        linkTitle="Add Farmer"
        href="/dashboard/farmers/new"
      />
      {
        <div className="py-8">
          {farmers && (
            <DataTable
              columns={columns}
              data={farmers}
              filterKeys={['name', 'email']}
            />
          )}
        </div>
      }
    </div>
  );
};

export default farmersPage;
