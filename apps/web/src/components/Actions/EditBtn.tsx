import { appConfig } from '@/config/app.config';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type EditBtnProps = {
  editEndpoint: string;
  title: string;
};

const EditBtn = ({ editEndpoint, title }: EditBtnProps) => {
  const baseUrl = appConfig.baseUrl;

  return (
    <Link
      className="flex items-center text-lime-600"
      href={`${baseUrl}/dashboard/${editEndpoint}`}
    >
      <Pencil className="h-4 w-4 mr-2" />
      <span>Edit {title} </span>
    </Link>
  );
};

export default EditBtn;
