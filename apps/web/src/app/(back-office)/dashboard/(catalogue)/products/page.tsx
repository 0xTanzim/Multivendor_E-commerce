import PageHeader from "../../_components/PageHeader";
import TableActions from "../../_components/TableActions";

const ProductPage = () => {
  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Products"
        linkTitle="Add Product"
        href="/dashboard/products/new"
      />

      {/* table action */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
};

export default ProductPage;
