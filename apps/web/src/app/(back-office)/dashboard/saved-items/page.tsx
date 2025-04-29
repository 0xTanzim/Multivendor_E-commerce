'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bookmark, Package2, ShoppingBag, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type SavedItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  slug: string;
  createdAt: string;
};

export default function SavedItemsPage() {
  const { data: session } = useSession();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real implementation, you would fetch actual saved items from your API
  useEffect(() => {
    // Simulate API call with mock data
    const fetchSavedItems = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, fetch from API
        // const response = await fetch(`/api/users/${session?.user?.id}/saved-items`);
        // const data = await response.json();

        // Mock data for demonstration
        const mockData: SavedItem[] = [
          {
            id: '1',
            title: 'Organic Cabbage',
            imageUrl: '/items/item2.jpg',
            price: 4.99,
            slug: 'organic-cabbage',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Fresh Tomatoes',
            imageUrl: '/items/item2.jpg',
            price: 3.49,
            slug: 'fresh-tomatoes',
            createdAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Corn',
            imageUrl: '/items/item2.jpg',
            price: 2.99,
            slug: 'corn',
            createdAt: new Date().toISOString(),
          },
        ];

        setSavedItems(mockData);
      } catch (error) {
        console.error('Error fetching saved items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchSavedItems();
    }
  }, [session]);

  const removeSavedItem = (itemId: string) => {
    // In a real implementation, you would call your API
    // to remove the item from user's saved items
    setSavedItems(savedItems.filter((item) => item.id !== itemId));
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">
        Please sign in to view your saved items
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Saved Items
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bookmark className="mr-2 h-5 w-5 text-emerald-500" />
            <span>Your Saved Products</span>
          </CardTitle>
          <CardDescription>
            Products you've bookmarked for later. You can add items to your cart
            or remove them from your saved list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your saved items...</p>
            </div>
          ) : savedItems.length > 0 ? (
            <div className="divide-y">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        <Link
                          href={`/products/${item.slug}`}
                          className="hover:text-emerald-500 transition-colors"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-emerald-600 font-medium">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Saved on {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      <span>Add to Cart</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeSavedItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Package2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No saved items
              </h3>
              <p className="text-gray-500 mb-4">
                You haven't saved any products yet.
              </p>
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
