import Heading from '@/components/backOffice/layout/Heading';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FormHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between my-1 py-6 px-12 bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-700 rounded-lg shadow mb-12">
      <Heading title={title} className="text-xl" />
      <button onClick={() => router.back()} className="">
        <X />
      </button>
    </div>
  );
};

export default FormHeader;
