import PageHeader from '../../_components/PageHeader';
import TableActions from '../../_components/TableActions';

const bannerPage = () => {
  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Banners"
        linkTitle="Add Banner"
        href="/dashboard/banners/new"
      />

      {/* table action */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
        {/* Placeholder for banner table implementation */}
      </div>
    </div>
  );
};

export default bannerPage;

