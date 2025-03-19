import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();

    const { nextUrl, method } = req;

    return middleware(req, event, response);
  };
}
