import toast from 'react-hot-toast';

export function useAuthRequest() {
  return async ({
    setLoading,
    endpoint,
    data,
    resourceName,
    reset,
  }: {
    setLoading: (value: boolean) => void;
    endpoint: string;
    data: unknown;
    resourceName: string;
    reset: () => void;
  }) => {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(`${resourceName} Created Successfully`);
      reset();
      return result;
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Failed to process the request');
    }
  };
}
