import PageHeader from '../_components/PageHeader';
import TableActions from '../_components/TableActions';

const CommunityPage = () => {
  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Mindful Community Training"
        linkTitle="Add Training"
        href="/dashboard/community/new"
      />

      {/* table action */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
};

export default CommunityPage;
