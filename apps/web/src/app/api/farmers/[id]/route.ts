import { farmerService } from '@/lib/di';
import { handleError } from '@/utils';
import { isFarmer } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmer = await farmerService.findUnique({
      where: { userId: id },
      include: {
        user: true,
      }
    });

    return NextResponse.json(farmer);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmer = await farmerService.deleteById(id);
    return NextResponse.json(farmer);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isFarmer(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const farmerProfileData = {
      products: Array.isArray(data.products)
        ? data.products.map(String)
        : [],
      farmSize:
        typeof data.farmSize === 'string'
          ? parseFloat(data.farmSize) || 0
          : (data.farmSize ?? 0),

      isActive: data.isActive ?? false,
      profileImageUrl: data.profileImageUrl ?? '',
      mainCrop: data.mainCrop ?? '',
      notes: data.notes ?? '',
      contactPerson: data.contactPerson,
      contactPersonPhone: data.contactPersonPhone,
      physicalAddress: data.physicalAddress,
      terms: data.terms,
      phone: data.phone,
      code: data.code,
      userId: data.userId,
    };

    console.log(data);

    // const farmer = await farmerService.update(id, farmerProfileData);

    return NextResponse.json(farmerProfileData);
  } catch (err) {
    return handleError(err);
  }
}
