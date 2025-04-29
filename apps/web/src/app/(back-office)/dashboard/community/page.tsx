import { getData } from '@/lib/getData';
import PageHeader from '../_components/PageHeader';
import TableActions from '../_components/TableActions';
import { isTrainingArray } from '@repo/types';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from './_components/columns';

const CommunityPage = async() => {
    const trainingsData = await getData('trainings');

    let trainings = null;

    if (!isTrainingArray(trainingsData)) {
      trainings = null;
    } else {
      trainings = trainingsData;
    }
  

  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Mindful Community Training"
        linkTitle="Add Training"
        href="/dashboard/community/new"
      />

      <div className="py-8">
        {trainings && <DataTable columns={columns} data={trainings} />}

    </div>
    </div>
  );
};

export default CommunityPage;
