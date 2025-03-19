import { Info } from 'lucide-react';

const page = () => {
  return (
    <div className="max-w-3xl mx-auto mt-6 min-h-screen">
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4 text-lime-800 border border-lime-300 rounded-lg bg-lime-50 dark:bg-gray-800 dark:text-lime-400 dark:border-lime-800"
        role="alert"
      >
        <div className="flex items-center">
          <Info className="w-5 h-5 flex-shrink-0 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Email Sent - Verify Your Email
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Thank you for signing up! We have sent a verification email to your
          inbox. Please check your email and click on the link to verify your
          account. If you don't see the email, please check your spam or junk
          folder.
        </div>
      </div>
    </div>
  );
};

export default page;
