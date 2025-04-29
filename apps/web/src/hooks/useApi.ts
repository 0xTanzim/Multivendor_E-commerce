import { useState } from 'react';
import { ERROR, PENDING, SUCCESS, useApiStatus } from './useApiStatus';

export const useApi = (fn: Function, config = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);
  const { status, setStatus, ...flags } = useApiStatus();

  const exec = async (...args: any[]) => {
    setStatus(PENDING);
    try {
      const res = await fn(...args);
      setData(res);
      setError(null);
      setStatus(SUCCESS);
      return { data: res, error: null };
    } catch (err) {
      setError(err);
      setStatus(ERROR);
      return { data: null, error: err };
    }
  };

  return {
    data,
    error,
    status,
    exec,
    setData,
    setStatus,
    ...flags,
  };
};
