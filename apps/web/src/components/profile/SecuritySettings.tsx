'use client';

import { Button } from '@/components/ui/button';
import { Fingerprint, KeyRound, Loader2, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const SecuritySettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = () => {
    setIsChangingPassword(true);

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      toast.success('Password reset email sent to your email address');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div className="flex items-start gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
            <KeyRound className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Password
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
              Change your password or reset it if you've forgotten it
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleChangePassword}
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Sending email...
                </>
              ) : (
                'Change Password'
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full">
            <Fingerprint className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Login Sessions
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
              Manage your active sessions on different devices
            </p>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium">Current Session</p>
                <p className="text-xs text-gray-500">
                  Started 2 hours ago • Chrome on Windows
                </p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full">
            <LogOut className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Sign Out
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 mb-3">
              Sign out from your current session
            </p>
            <Button variant="destructive" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
