'use client';

import toast from 'react-hot-toast';

type apiProps = {
  setLoading: (value: boolean) => void;
  endpoint: string;
  data: unknown;
  resourceName: string;
  reset: () => void;
  redirect: () => void;
};

export async function makePostRequest({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect,
}: apiProps) {
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

    if (response.ok) {
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      if (redirect) {
        redirect();
      }
      
    } else {
      setLoading(false);
      if (response.status === 409) {
        toast.error('The Giving Warehouse Stock is NOT Enough');
      } else {
        toast.error('Something Went wrong');
      }
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}
