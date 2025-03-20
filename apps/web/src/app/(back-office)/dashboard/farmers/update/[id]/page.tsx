import FarmerForm from '@/components/backOffice/form/FarmerForm';
import FormHeader from '@/components/backOffice/form/FormHeader';
import { getData } from '@/lib/getData';
import { isFarmer, isUser } from '@repo/types';

type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateFarmerPage = async ({ params }: IParams) => {
  const { id } = await params;

  const farmerData = await getData(`/farmers/${id}`);
  let farmer = null;

  if (!isFarmer(farmerData)) {
    return (
      <div>
        <p>Farmer not found. Please check the ID or try again later.</p>
      </div>
    );
  } else {
    farmer = farmerData;
  }

  const user = farmer.user;

  if (!isUser(user)) {
    return (
      <div>
        <p>User not found. Please check the ID or try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <FormHeader title="Update Farmer" />
      {farmer && <FarmerForm updateData={farmer} user={user} />}
    </div>
  );
};

export default UpdateFarmerPage;
