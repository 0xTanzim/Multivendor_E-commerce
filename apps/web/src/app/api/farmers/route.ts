import { Farmer, isFarmer } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isFarmer(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newFarmer: Farmer = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      physicalAddress: data.physicalAddress,
      contactPerson: data.contactPerson,
      contactPersonPhone: data.contactPersonPhone,
      terms: data.terms,
      notes: data.notes,
      isActive: data.isActive,
      profileImageUrl: data.profileImageUrl || '',
    };

    console.log(newFarmer);

    return NextResponse.json(newFarmer, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
