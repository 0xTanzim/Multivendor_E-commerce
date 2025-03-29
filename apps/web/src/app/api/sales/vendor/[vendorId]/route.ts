import { saleService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ vendorId: string }> }
) {
  const { vendorId } = await params;

  try {
    const sales = await saleService.findAll({
      where: {
        vendorId,
      },
    });
    return NextResponse.json(sales);
  } catch (err) {
    return handleError(err);
  }
}
