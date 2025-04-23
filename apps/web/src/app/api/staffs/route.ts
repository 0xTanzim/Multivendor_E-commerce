import { staffService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isStaff, Staff } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
class StaffController {
  async POST(req: Request) {
    const data: unknown = await req.json();

    if (!isStaff(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const staffData: Staff = {
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

    // const newStaff = await staffService.create(staffData);

    return NextResponse.json(staffData, { status: 201 });
  }

  async GET(_req: Request) {
    const staffs = await staffService.findAll();
    return NextResponse.json(staffs, { status: 200 });
  }
}

export const { GET, POST } = new StaffController();
