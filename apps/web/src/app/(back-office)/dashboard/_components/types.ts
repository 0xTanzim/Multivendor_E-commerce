// filepath: /mnt/storage/ecommerce/apps/web/src/app/(back-office)/dashboard/_components/types.ts
/**
 * Extended order type with additional properties needed for the dashboard
 * This helps us handle potential type mismatches with the actual IOrder type
 */
export type DashboardOrder = {
  id?: string;
  orderNumber?: string;
  createdAt?: string | Date;
  status?: string;
  total?: number;
  totalAmount?: number;
  items?: Array<{
    product?: {
      id: string;
      name: string;
    };
    quantity?: number;
  }>;
  user?: {
    name?: string;
  };
  customer?: {
    name?: string;
  };
  customerName?: string;
};

/**
 * Extended sale type with additional properties needed for the dashboard
 */
export type DashboardSale = {
  id?: string;
  createdAt?: string | Date;
  total?: number;
  amount?: number;
};

/**
 * Extended product type for the dashboard
 */
export type DashboardProduct = {
  id: string;
  name: string;
  price?: number;
  stock?: number;
  sold?: number;
};
