import { DataTable } from '@/components/data-table/DataTable';
import { getData } from '@/lib/getData';
import { isCategoryArray } from '@repo/types';
import PageHeader from '../../_components/PageHeader';
import { columns } from './_components/columns';

const categoriesPage = async () => {
  const categoriesData = await getData('categories');

  let categories = null;

  if (!isCategoryArray(categoriesData)) {
    categories = null;
  } else {
    categories = categoriesData;
  }

  return (
    <div>
      {/* header  */}
      <PageHeader
        heading="Categories"
        linkTitle="Add Category"
        href="/dashboard/categories/new"
      />

      <div className="py-8">
        {categories && <DataTable columns={columns} data={categories} />}
      </div>
    </div>
  );
};

export default categoriesPage;
