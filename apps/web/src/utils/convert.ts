type FlattenObject<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<any>
      ? T[K]
      : FlattenObject<T[K]>
    : T[K];
};

export function flattenObject<T extends object>(obj: T): FlattenObject<T> {
  const result = {} as FlattenObject<T>;

  function flatten(current: any) {
    for (const [key, value] of Object.entries(current)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flatten(value);
      } else {
        (result as any)[key] = value;
      }
    }
  }

  flatten(obj);
  return result;
}
