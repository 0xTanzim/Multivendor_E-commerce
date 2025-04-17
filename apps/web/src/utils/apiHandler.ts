import { handleError } from '@/utils';
import { NextResponse } from 'next/server';

type ApiHandler<T> = (...args: any[]) => Promise<T>;

/**
 * Wraps API route handlers with standardized error handling
 * @param handler The async handler function to execute
 * @returns A wrapped function that handles errors consistently
 */
export function withErrorHandling<T>(handler: ApiHandler<T>) {
  return async (...args: any[]): Promise<NextResponse> => {
    try {
      const result = await handler(...args);
      return NextResponse.json(result);
    } catch (error) {
      return handleError(error);
    }
  };
}
