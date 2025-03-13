import Heading from '@/components/backOffice/layout/Heading';
import { Plus } from 'lucide-react';
import Link from 'next/link';

type PageHeaderProps = {
  heading: string;
  linkTitle: string;
  href: string;
};

const PageHeader = ({ heading, linkTitle, href }: PageHeaderProps) => {
  return (
    <div className="flex justify-between py-8">
      <Heading title={heading} />

      <Link
        className="text-white bg-emerald-500 hover:bg-emerald-500/90 focus:ring-4 focus:outline-none focus:ring-emerald-500/50 font-medium rounded-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-emerald-500/55 me-2  text-base space-x-3"
        href={href}
      >
        <Plus className=" " />
        <span>{linkTitle}</span>
      </Link>
    </div>
  );
};

export default PageHeader;
