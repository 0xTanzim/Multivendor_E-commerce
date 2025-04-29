import OrderCard from '@/components/order/OrderCard';
import { authDetails } from '@/lib';
import { getData } from '@/lib/getData';
import { isOrderArray } from '@repo/types';

const OrdersPage = async () => {
  const { userId } = await authDetails();

  const orderData = await getData(`/orders/user/${userId}`);

  let orders;
  if (!isOrderArray(orderData)) {
    orders = null;
  } else {
    orders = orderData;
  }

  return (
    <div>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Order Details
              </h1>
              <p className="mt-2 text-sm font-normal text-gray-600">
                Check the status of recent and old orders & discover more
                products
              </p>
            </div>

            <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
              {orders && orders.length > 0 ? (
                orders.map((order) => {
                  return <OrderCard key={order.id} order={order} />;
                })
              ) : (
                <div className="flex items-center justify-center w-full h-full py-12">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    No orders found
                  </h1>
                </div>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
