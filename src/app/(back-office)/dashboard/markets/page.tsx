import PageHeader from "../_components/PageHeader";
import TableActions from "../_components/TableActions";

const marketsPage = () => {
  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Markets"
        linkTitle="Add Market"
        href="/dashboard/markets/new"
      />

      {/* table action */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
};

export default marketsPage;
