'use client';

import { useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useAuthDetails } from './useAuthDetails';

interface PermissionsResponse {
  permissions: string[];
}

const fetchPermissions = async (url: string): Promise<PermissionsResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch permissions');
  return res.json();
};

/**
 * Hook to get the user's permissions from the API using SWR caching.
 * Automatically caches results, dedupes requests, and supports background revalidation.
 */
export function usePermissions(): {
  permissions: string[];
  isLoading: boolean;
  error: unknown;
} {
  const { roleId } = useAuthDetails();
  const { mutate } = useSWRConfig();

  // Invalidate cache when roleId changes
  useEffect(() => {
    if (roleId) {
      mutate(`/api/permissions/${roleId}/check`);
    }
  }, [roleId, mutate]);

  const { data, error, isLoading } = useSWR<PermissionsResponse>(
    roleId ? `/api/permissions/${roleId}/check` : null,
    fetchPermissions,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 15, // 15 minutes
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
    }
  );

  if (error) {
    console.error('Failed to load permissions:', error);
    return { permissions: [], isLoading: false, error };
  }

  return { permissions: data?.permissions ?? [], isLoading, error };
}
