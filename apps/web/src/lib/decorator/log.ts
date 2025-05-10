export function Log() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const start = Date.now();

      try {
        const result = await originalMethod.apply(this, args);
        logInfo(`${propertyKey} completed`, {
          method: req.method,
          url: req.url,
          duration: Date.now() - start,
          status: result.status,
          agent: req.headers.get('user-agent'),
          ip:
            req.headers.get('x-forwarded-for') ||
            req.headers.get('remote-addr'),
        });
        return result;
      } catch (error) {
        logError(`${propertyKey} failed`, {
          method: req.method,
          url: req.url,
          duration: Date.now() - start,
          agent: req.headers.get('user-agent'),
          ip:
            req.headers.get('x-forwarded-for') ||
            req.headers.get('remote-addr'),
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        throw error;
      }
    };

    return descriptor;
  };
}

function logInfo(message: string, data: any) {
  console.log(`INFO: ${message}`, data);
}

function logError(message: string, data: any) {
  console.error(`ERROR: ${message}`, data);
}
