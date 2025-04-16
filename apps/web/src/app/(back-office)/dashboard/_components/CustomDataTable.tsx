'use client';

import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DashboardOrder } from './types';

type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

type CustomDataTableProps = {
  orders?: DashboardOrder[];
};

const CustomDataTable = ({ orders = [] }: CustomDataTableProps) => {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // If no orders are passed, fallback to empty array
  const displayData = orders.length > 0 ? orders : [];

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const totalPage = Math.ceil(displayData.length / PAGE_SIZE);

  const currentlyDisplayData = displayData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Status badge colors
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      PENDING:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      PROCESSING:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      SHIPPED:
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      DELIVERED:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
      statusColors[status] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="mt-4">
      {/* Table  */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* Table header */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Items
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {currentlyDisplayData.length > 0 ? (
              currentlyDisplayData.map((order) => (
                <tr
                  key={order.id || Math.random().toString()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    #
                    {order.orderNumber ||
                      (order.id ? order.id.substring(0, 8) : 'N/A')}
                  </th>
                  <td className="px-6 py-4">
                    {/* Handle different ways the customer name might be stored */}
                    {order.user?.name ||
                      order.customer?.name ||
                      order.customerName ||
                      'Customer'}
                  </td>
                  <td className="px-6 py-4">
                    {order.createdAt
                      ? format(new Date(order.createdAt), 'MMM dd, yyyy')
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(order.totalAmount || order.total || 0)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={getStatusColor(order.status || 'PENDING')}
                    >
                      {order.status || 'PENDING'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{order.items?.length || 0}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/orders/${order.id || ''}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {currentlyDisplayData.length > 0 && (
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {startIndex + 1} -{' '}
                {endIndex > displayData.length ? displayData.length : endIndex}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {displayData.length}
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                (page) => (
                  <li key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === page
                          ? 'bg-orange-600 dark:bg-orange-600 text-white dark:text-white rounded'
                          : ''
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}

              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPage || totalPage === 0}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default CustomDataTable;
