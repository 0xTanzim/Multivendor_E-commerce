import SalesInvoice from '@/components/backOffice/invoice/SalesInvoice';
import { getData } from '@/lib/getData';
import { isOrder } from '@repo/types';
type IParams = {
  params: Promise<{ id: string }>;
};
const InvoicePage = async ({ params }: IParams) => {
  const { id } = await params;

  const orderData = await getData(`orders/${id}`);

  if (!isOrder(orderData)) {
    return <div>Order not found</div>;
  }

  return (
    <>
      <SalesInvoice order={orderData} />
    </>
  );
};

export default InvoicePage;
