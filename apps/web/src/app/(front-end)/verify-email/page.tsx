import { getData } from '@/lib/getData';
import { isAuthUser } from '@repo/types';
import { Info, MailWarning } from 'lucide-react';

type IParams = {
  searchParams: Promise<{ [key: string]: string }>;
};

const Page = async ({ searchParams }: IParams) => {
  const searchParamsData = await searchParams;
  const { userId } = searchParamsData;

  const user = await getData(`users/${userId}`);

  if (!isAuthUser(user)) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-red-600">
        User not found
      </div>
    );
  }

  const { email } = user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-3 border-b pb-4 mb-4 border-gray-200 dark:border-gray-700">
          <Info className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold">Verify Your Email Address</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          A verification email has been sent to:
        </p>
        <p className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100 break-all">
          {email}
        </p>
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
          Please check your inbox and follow the instructions to verify your
          account. If you do not see the email, check your spam or junk folder.
        </p>
        <div className="mt-5 flex items-center p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-300 rounded-lg">
          <MailWarning className="w-5 h-5 mr-3" />
          <p className="text-sm">
            If you need to update your email address, please contact our support
            team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
