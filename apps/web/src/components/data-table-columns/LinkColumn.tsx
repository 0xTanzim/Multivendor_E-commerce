import { Row } from '@tanstack/react-table';

const LinkColumn = ({
  row,
  accessorKey,
}: {
  row: Row<any>;
  accessorKey: string;
}) => {
  const link = row.getValue(accessorKey);
  return (
    <div className="truncate ">
      {link && typeof link === 'string' ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          {link.length > 55 ? `${link.slice(0, 50)}...` : link}
        </a>
      ) : null}
    </div>
  );
};

export default LinkColumn;
