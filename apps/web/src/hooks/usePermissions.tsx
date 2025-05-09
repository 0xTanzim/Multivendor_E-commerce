'use client';

import useSWR from 'swr';
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
export function usePermissions(): string[] {
  const { roleId } = useAuthDetails();

  const { data, error } = useSWR<PermissionsResponse>(
    roleId ? `/api/permissions/${roleId}/check` : null,
    fetchPermissions,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 15, // 15 minutes
    }
  );

  if (error) {
    console.error('Failed to load permissions:', error);
    return [];
  }

  return data?.permissions ?? [];
}
