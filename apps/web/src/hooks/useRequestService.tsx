'use client';

import { appConfig } from '@/config/app.config';
import { useState } from 'react';

type HttpMethod = 'POST' | 'PATCH' | 'GET' | 'PUT' | 'DELETE';

interface FieldError {
  field: string;
  error: string;
}

interface UseRequestServiceParams<T> {
  endpoint: string;
  data?: unknown;
  method: HttpMethod;
  signal?: AbortSignal;
}

interface UseRequestServiceReturn<T> {
  loading: boolean;
  error: string | null;
  fieldErrors: FieldError[];
  request: (params: UseRequestServiceParams<T>) => Promise<{
    response: T | null;
    error: string | null;
    fieldErrors: FieldError[];
  }>;
}

export function useRequestService<T>(): UseRequestServiceReturn<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  const request = async ({
    endpoint,
    data,
    method,
    signal,
  }: UseRequestServiceParams<T>) => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors([]);

      const baseUrl = appConfig.apiBaseUrl ?? 'http://localhost:3000/api';
      const headers = { 'Content-Type': 'application/json' };
      const body =
        method !== 'GET' && method !== 'DELETE'
          ? JSON.stringify(data)
          : undefined;

      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method,
        headers,
        body,
        signal,
      });

      const result = await response.json();

      if (response.ok) {
        return { response: result, error: null, fieldErrors: [] };
      } else {
        const errorMessage =
          result.message || `HTTP ${response.status}: ${response.statusText}`;
        const errors = result.errors || [];
        const parsedFieldErrors: FieldError[] = Array.isArray(errors)
          ? errors.map((err: any) => ({
              field: err.field || 'unknown',
              error: err.message || 'Invalid input',
            }))
          : [];

        setError(errorMessage);
        setFieldErrors(parsedFieldErrors);
        return {
          response: null,
          error: errorMessage,
          fieldErrors: parsedFieldErrors,
        };
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return {
          response: null,
          error: 'Request was cancelled',
          fieldErrors: [],
        };
      }
      const errorMessage =
        'Failed to process the request. Please try again later.';
      setError(errorMessage);
      setFieldErrors([]);
      return { response: null, error: errorMessage, fieldErrors: [] };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fieldErrors, request };
}
