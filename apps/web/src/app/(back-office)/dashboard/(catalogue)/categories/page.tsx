import PageHeader from "../../_components/PageHeader";
import TableActions from "../../_components/TableActions";

const categoriesPage = () => {
  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Categories"
        linkTitle="Add Category"
        href="/dashboard/categories/new"
      />

      {/* table action */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
};

export default categoriesPage;

