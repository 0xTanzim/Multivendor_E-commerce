import { formatDate } from '@repo/utils';
import { Row } from '@tanstack/react-table';

type DateColumnProps = {
  row: Row<any>;
  accessorKey: 'createdAt' | 'expiryDate' | 'updatedAt';
};

const DateColumn = ({ row, accessorKey }: DateColumnProps) => {
  const dateAt = row.getValue(accessorKey);
  const date = formatDate(dateAt);

  return <div className="text-right">{date}</div>;
};

export default DateColumn;
