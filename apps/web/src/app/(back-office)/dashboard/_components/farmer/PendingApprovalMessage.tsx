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
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const PendingApprovalMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b">
          <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900">
            <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
          </div>
          <div>
            <CardTitle className="text-xl">Profile Pending Approval</CardTitle>
            <CardDescription>
              Your farmer profile is awaiting administrator approval
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Thank you for registering as a farmer. Your profile is currently
              being reviewed by our administrators. This process typically takes
              1-2 business days.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                What happens next?
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Our team will review your submitted information</li>
                <li>You'll receive an email notification once approved</li>
                <li>You'll then have full access to all farmer features</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/dashboard/profile">View Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PendingApprovalMessage;
