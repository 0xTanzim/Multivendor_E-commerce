import { handleError } from '../errorHandler';

type Class<T = any> = new (...args: any[]) => T;

export function catchErrors() {
  return function (
    target: Object | Function,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ): any {
    if (descriptor) {
      // ✅ Method-level decorator
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          console.log(
            `\n[catchErrors] Method-level error on "${String(propertyKey)}":`
          );
          return handleError(error);
        }
      };

      return descriptor;
    }

    // ✅ Class-level decorator
    const classConstructor = target as Class;
    const methodNames = Object.getOwnPropertyNames(classConstructor.prototype)
      .filter((name) => name !== 'constructor')
      .filter((name) => typeof classConstructor.prototype[name] === 'function');

    for (const methodName of methodNames) {
      const originalMethod = classConstructor.prototype[methodName];

      classConstructor.prototype[methodName] = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          console.log(`\n[catchErrors] Class-level error on "${methodName}":`);
          return handleError(error);
        }
      };
    }

    return classConstructor;
  };
}
