import { isStaff, Staff } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isStaff(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newStaff: Staff = {
      dob: data.dob,
      email: data.email,
      isActive: data.isActive,
      name: data.name,
      nin: data.nin,
      notes: data.notes,
      password: data.password,
      phoneNumber: data.phoneNumber,
      physicalAddress: data.physicalAddress,
      code: data.code,
    };

    console.log(newStaff);

    return NextResponse.json(newStaff, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
