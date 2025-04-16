'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Product } from '@repo/types';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  Package,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type FarmerProductsPanelProps = {
  products: Product[];
};

const FarmerProductsPanel = ({ products }: FarmerProductsPanelProps) => {
  // Count active and inactive products
  const activeProducts = products.filter((product) => product.isActive).length;
  const inactiveProducts = products.length - activeProducts;

  // Get latest 5 products
  // Note: Assuming the products array is already sorted
  const latestProducts = products.slice(0, 5);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>Product Overview</CardTitle>
        <CardDescription>Summary of your product catalog</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Product statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Active Products
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {activeProducts}
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Inactive Products
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
              {inactiveProducts}
            </p>
          </div>
        </div>

        {/* Latest products */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">
            Recently Added Products
          </h3>
          <ul className="space-y-3">
            {latestProducts.length > 0 ? (
              latestProducts.map((product) => (
                <li key={product.id} className="group">
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="relative w-10 h-10 bg-muted rounded-md flex items-center justify-center overflow-hidden border">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${product.sellPrice || product.productPrice}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.isActive
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <Eye className="h-4 w-4 text-muted-foreground ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-center py-4 text-muted-foreground">
                No products found. Add your first product now!
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t flex justify-between">
        <Button variant="default" size="sm">
          <Link href="/dashboard/products/new">Add New Product</Link>
        </Button>
        <Button variant="outline" size="sm">
          <Link href="/dashboard/products" className="flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FarmerProductsPanel;
