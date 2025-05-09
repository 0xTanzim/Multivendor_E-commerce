import { DataTable } from '@/components/data-table/DataTable';
import { HasPermission } from '@/components/shared/auth/AuthGuard';
import { PERMISSIONS } from '@/constants/Permissions';
import { getData } from '@/lib/getData';
import { isMarketArray } from '@repo/types';
import PageHeader from '../_components/PageHeader';
import { columns } from './_components/columns';

const marketsPage = async () => {
  const marketsData = await getData('markets');

  let markets = null;

  if (!isMarketArray(marketsData)) {
    markets = null;
  } else {
    markets = marketsData;
  }

  return (
    <div>
      {/* header  */}
      <HasPermission requiredPermissions={PERMISSIONS.CREATE_MARKET}>
        <PageHeader
          heading="Markets"
          linkTitle="Add Market"
          href="/dashboard/markets/new"
        />
      </HasPermission>

      <div className="py-8">
        {markets && <DataTable columns={columns} data={markets} />}
      </div>
    </div>
  );
};

export default marketsPage;
