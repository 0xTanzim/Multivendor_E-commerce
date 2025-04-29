import { useMemo, useState } from 'react';

export const IDLE = 'IDLE';
export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

const defaultStatuses = [IDLE, PENDING, SUCCESS, ERROR];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const prepareStatuses = (status: string) => {
  const obj: Record<string, boolean> = {};
  for (const stat of defaultStatuses) {
    obj[`is${capitalize(stat.toLowerCase())}`] = stat === status;
  }
  return obj;
};

export const useApiStatus = (initialStatus = IDLE) => {
  const [status, setStatus] = useState(initialStatus);
  const statusFlags = useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statusFlags,
  };
};
