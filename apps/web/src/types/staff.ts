export type Staff = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
  physicalAddress: string;
  notes?: string;
  isActive?: boolean;
  nin: string;
  dob?: string;
  code: string;
};

export function isStaff(data: unknown): data is Staff {
  const staff = data as Staff;

  return (
    'name' in staff &&
    typeof staff.name === 'string' &&
    'email' in staff &&
    typeof staff.email === 'string' &&
    'code' in staff &&
    typeof staff.code === 'string' &&
    'phoneNumber' in staff &&
    typeof staff.phoneNumber === 'string' &&
    'physicalAddress' in staff &&
    typeof staff.physicalAddress === 'string' &&
    ('notes' in staff ? typeof staff.notes === 'string' : true) &&
    ('isActive' in staff ? typeof staff.isActive === 'boolean' : true) &&
    'nin' in staff &&
    typeof staff.nin === 'string' &&
    ('dob' in staff ? typeof staff.dob === 'string' : true) &&
    ('password' in staff ? typeof staff.password === 'string' : true)
  );
}

export function isStaffs(data: unknown): data is Staff[] {
  return Array.isArray(data) && data.every(isStaff);
}

