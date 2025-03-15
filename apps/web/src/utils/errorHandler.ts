import { BaseError } from '@repo/common/error';
import { NextResponse } from 'next/server';

export function handleError(error: unknown) {
  console.error('❎ This is an error', error);

  if (error instanceof BaseError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
