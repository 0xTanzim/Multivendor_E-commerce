import { saleService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const sales = await saleService.findAll();
    return NextResponse.json(sales);
  } catch (err) {
    return handleError(err);
  }
}
