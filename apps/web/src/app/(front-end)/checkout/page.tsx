import CheckoutBanner from '@/components/frontend/checkout/CheckoutBanner';
import StepForm from '@/components/frontend/checkout/StepForm';
import Steps from '@/components/frontend/checkout/Steps';

const CheckoutPage = () => {
  const steps = [
    {
      id: 0,
      title: 'Personal Information',
    },
    {
      id: 1,
      title: 'Shipping Address',
    },
    {
      id: 2,
      title: 'Payment Method',
    },
    {
      id: 3,
      title: 'Order Summary',
    },
  ];

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto  border-slate-200    border p-6 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Steps steps={steps} />

        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* Banner  */}
          <CheckoutBanner />

          {/* Step Form */}
          <StepForm />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
