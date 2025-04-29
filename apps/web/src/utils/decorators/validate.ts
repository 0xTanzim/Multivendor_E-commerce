import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../errorHandler';

type ValidatorFn<T> = (data: unknown) => data is T;

export function validate<T>(validator: ValidatorFn<T>) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      const data: unknown = await req.json();

      if (!validator(data)) {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
      }

      // Attach parsed data as `req.validatedData`
      // You can also just return `originalMethod.call(this, req, data)` instead
      (req as any).validatedData = data;
      return originalMethod.call(this, req, ...args);
    };

    return descriptor;
  };
}