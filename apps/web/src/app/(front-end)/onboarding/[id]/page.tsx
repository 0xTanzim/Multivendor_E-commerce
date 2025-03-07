import NewFarmerForm from '@/components/backOffice/form/NewFarmerForm';
import { getData } from '@/lib/getData';
import { isUser } from '@repo/types';

const Onboarding = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const user: unknown = await getData(`users/${id}`);

  if (!isUser(user)) {
    return <div>Invalid User</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="max-w-4xl p-4 mx-auto">
        <h2 className="text-lg md:text-2xl font-bold text-center">
          Hello {user?.name},
          Tell us More about your Self
        </h2>
      </div>

      <NewFarmerForm user={user} />
    </div>
  );
};

export default Onboarding;
