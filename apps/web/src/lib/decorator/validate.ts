import { NextResponse } from 'next/server';
import { ZodSchema } from 'zod';

export function Validate(schema: ZodSchema) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const data: unknown = await req.json();

      const result = schema.safeParse(data);
      if (!result.success) {
        return NextResponse.json(
          { error: 'Invalid input', details: result.error.flatten() },
          { status: 400 }
        );
      }

      // Replace request body with validated data
      args[0] = { ...req, json: async () => result.data };
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
