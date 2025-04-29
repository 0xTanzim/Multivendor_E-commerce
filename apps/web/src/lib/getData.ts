export const getData = async (endpoint: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : 'An unknown error occurred';
    return { error, data: null, status: 500 };
  }
};
