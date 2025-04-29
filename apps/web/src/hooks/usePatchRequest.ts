import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type UsePatchRequestProps = {
  setLoading: (value: boolean) => void;
  endpoint: string;
  data: unknown;
  resourceName: string;
  reset: () => void;
  redirectPath?: string;
};

export function usePatchRequest() {
  const router = useRouter();
  return async ({
    setLoading,
    endpoint,
    data,
    resourceName,
    redirectPath,
    reset,
  }: UsePatchRequestProps) => {
    try {
      setLoading(true);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`${resourceName} Updated Successfully`);
        reset();

        if (redirectPath) {
          router.push(redirectPath);
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to process the request');
    } finally {
      setLoading(false);
    }
  };
}
