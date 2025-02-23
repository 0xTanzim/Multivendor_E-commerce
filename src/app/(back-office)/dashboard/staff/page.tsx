import PageHeader from "../_components/PageHeader";
import TableActions from "../_components/TableActions";

const staffPage = () => {
  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Staff"
        linkTitle="Add Staff"
        href="/dashboard/staff/new"
      />

      {/* table action */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
};

export default staffPage;
