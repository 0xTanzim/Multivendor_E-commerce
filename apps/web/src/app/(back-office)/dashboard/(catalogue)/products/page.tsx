import { DataTable } from '@/components/data-table/DataTable';
import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { isProductArray } from '@repo/types';
import PageHeader from '../../_components/PageHeader';
import { columns } from './_components/columns';

const ProductPage = async () => {
  const { userId, role } = await authDetails();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  let productUrl = null;
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
    productUrl = 'products';
  } else if (role === 'FARMER') {
    productUrl = `farmers/products/${userId}`;
  } else {
    productUrl = `farmers/products/${userId}`;
  }

  if (!productUrl) {
    return <div>No products available</div>;
  }

  const productsData = await getData(productUrl);
  console.log('Raw productsData:', productsData);
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
