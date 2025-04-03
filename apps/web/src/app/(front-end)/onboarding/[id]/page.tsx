import StepForm from '../_components/StepForm';
import Steps from '../_components/Steps';

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const {id} = await params;

  const steps = [
    {
      id: 0,
      title: 'Basic Information',
    },
    {
      id: 1,
      title: 'Farmer Details',
    },
    {
      id: 2,
      title: 'Additional Information',
    },
    {
      id: 3,
      title: ' Summary',
    },
  ];

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl my-6 mx-auto  border-slate-200    border p-6 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Steps steps={steps} />

        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* Step Form */}
          <StepForm farmerId={id} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
