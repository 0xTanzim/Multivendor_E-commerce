import FormHeader from '@/components/backOffice/form/FormHeader';
import NewFarmerForm from '@/components/backOffice/form/NewFarmerForm';
import { getData } from '@/lib/getData';
import { isUser } from '@repo/types';

type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateFarmerPage = async ({ params }: IParams) => {
  const { id } = await params;

  const farmerData = await getData(`/farmers/${id}`);
  let farmer = null;

  if (!isUser(farmerData.user)) {
    return (
      <div>
        <p>Farmer not found. Please check the ID or try again later.</p>
      </div>
    );
  } else {
    farmer = farmerData;
  }

  // console.log(farmer);

  return (
    <div>
      <FormHeader title="Update Farmer" />
      {farmer && <NewFarmerForm updateData={farmer} user={farmerData.user} />}
    </div>
  );
};

export default UpdateFarmerPage;
