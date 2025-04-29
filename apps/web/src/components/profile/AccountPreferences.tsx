'use client';

import { Button } from '@/components/ui/button';
import { Bell, Loader2, Shield, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface PreferenceToggleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

const PreferenceToggle = ({
  title,
  description,
  icon,
  defaultChecked = false,
  onToggle,
}: PreferenceToggleProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onToggle) onToggle(newValue);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600 dark:text-emerald-400">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
      </label>
    </div>
  );
};

const AccountPreferences = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePreferences = () => {
    setIsLoading(true);

    // Simulate API call to save preferences
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Preferences updated successfully');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <PreferenceToggle
          title="Email Notifications"
          description="Receive email updates about your orders, account activity, and promotional offers."
          icon={<Bell className="h-5 w-5" />}
          defaultChecked={true}
        />

        <PreferenceToggle
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account with two-factor authentication."
          icon={<ShieldCheck className="h-5 w-5" />}
          defaultChecked={false}
        />

        <PreferenceToggle
          title="Privacy Mode"
          description="Hide your personal information from other users and limit data collection."
          icon={<Shield className="h-5 w-5" />}
          defaultChecked={true}
        />
      </div>

      <Button
        onClick={handleSavePreferences}
        disabled={isLoading}
        className="w-full py-6 h-auto text-base font-medium"
        variant="outline"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating Preferences...
          </>
        ) : (
          'Update Preferences'
        )}
      </Button>
    </div>
  );
};

export default AccountPreferences;
