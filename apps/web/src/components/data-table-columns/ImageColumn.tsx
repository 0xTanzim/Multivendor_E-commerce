import { Row } from '@tanstack/react-table';
import Image from 'next/image';

const ImageColumn = ({
  row,
  accessorKey,
}: {
  row: Row<any>;
  accessorKey: string;
}) => {
  const imageUrl = row.getValue(`${accessorKey}`);

  return (
    <div className="shrink-0">
      {imageUrl && typeof imageUrl === 'string' ? (
        <Image
          className="w-10 h-10 object-cover rounded-full"
          src={imageUrl}
          alt={accessorKey}
          width={500}
          height={500}
        />
      ) : null}
    </div>
  );
};

export default ImageColumn;
