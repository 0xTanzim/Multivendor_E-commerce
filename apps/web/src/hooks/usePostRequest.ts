import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function usePostRequest() {
  const router = useRouter();

  return async ({
    setLoading,
    endpoint,
    data,
    resourceName,
    reset,
    redirectPath,
  }: {
    setLoading: (value: boolean) => void;
    endpoint: string;
    data: unknown;
    resourceName: string;
    reset: () => void;
    redirectPath?: string;
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
      if (response.ok) {
        toast.success(`New ${resourceName} Created Successfully`);
        reset();
        if (redirectPath) {
          router.push(redirectPath);
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Failed to process the request');
    }
  };
}
