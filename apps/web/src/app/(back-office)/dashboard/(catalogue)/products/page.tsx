import { DataTable } from '@/components/data-table/DataTable';
import { getData } from '@/lib/getData';
import { isProductArray } from '@repo/types';
import PageHeader from '../../_components/PageHeader';
import { columns } from './_components/columns';

const ProductPage = async () => {
  const productsData = await getData('products');

  let products = null;
  if (!isProductArray(productsData)) {
    console.log('error');

    products = null;
  } else {
    products = productsData;
  }

  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Products"
        linkTitle="Add Product"
        href="/dashboard/products/new"
      />

      <div className="py-8">
        {products && <DataTable columns={columns} data={products} />}
      </div>
    </div>
  );
};

export default ProductPage;
