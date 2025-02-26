import { createBanner } from '@/backend/services/banner';
import { isBanner } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();
    
    if (!isBanner(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const banner = await createBanner(data);


    return NextResponse.json(banner, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
