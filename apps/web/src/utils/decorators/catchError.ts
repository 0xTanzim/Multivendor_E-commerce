import { handleError } from '../errorHandler';

export function catchErrors() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        console.log('\ndecorator Calling ============');

        return handleError(error);
      }
    };
  };
}
