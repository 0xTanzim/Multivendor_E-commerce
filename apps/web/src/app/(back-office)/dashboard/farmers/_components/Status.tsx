'use client';
import { FarmerStatus } from '@repo/types';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface StatusProps {
  row: any;
  accessorKey: string;
}

export default function Status({ row, accessorKey }: StatusProps) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const userId = row.original.id;

  const [status, setStatus] = useState<FarmerStatus>(savedStatus);
  const [loading, setLoading] = useState(false);

  interface HandleChangeParams {
    target: { value: string };
  }

  interface UpdateFarmerStatus {
    status: FarmerStatus;
  }

  async function handleChange(e: HandleChangeParams) {
    const newStatus = e.target.value as FarmerStatus;
    setStatus(newStatus);

    const data: UpdateFarmerStatus = {
      status: newStatus,
    };

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/farmers/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        toast.success('Farmer Status Updated Successfully');
      } else {
        setLoading(false);
        toast.error('Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const selectBorderStyle = {
    borderColor:
      status === FarmerStatus.APPROVED
        ? 'green'
        : status === FarmerStatus.REJECTED ||
            status === FarmerStatus.SUSPENDED ||
            status === FarmerStatus.BLOCKED ||
            status === FarmerStatus.DELETED
          ? 'red'
          : 'orange',
  };

  return (
    <>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <select
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={selectBorderStyle}
          value={status}
          onChange={handleChange}
        >
          {Object.values(FarmerStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
