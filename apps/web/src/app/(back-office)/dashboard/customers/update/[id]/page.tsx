import CustomerForm from '@/components/backOffice/form/CustomerForm';
import FormHeader from '@/components/backOffice/form/FormHeader';

type IParams = {
  params: Promise<{ id: string }>;
};
const UpdateCustomerPage = async ({ params }: IParams) => {
  const { id } = await params;

  // const userData = await getData(`/farmers/${id}`);
  // let user = null;

  // if (!isFarmer(farmerData)) {
  //   return (
  //     <div>
  //       <p>Farmer not found. Please check the ID or try again later.</p>
  //     </div>
  //   );
  // } else {
  //   farmer = farmerData;
  // }

  // const user = farmer.user;

  // if (!isUser(user)) {
  //   return (
  //     <div>
  //       <p>User not found. Please check the ID or try again later.</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <FormHeader title="Update Farmer" />
      {/* <CustomerForm  /> */}
      {/* {farmer && <CustomerForm updateData={farmer} user={user} />} */}
    </div>
  );
};

export default UpdateCustomerPage;
