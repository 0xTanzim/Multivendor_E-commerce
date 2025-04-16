'use client';

import AccountPreferences from '@/components/profile/AccountPreferences';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import ProfileHeader from '@/components/profile/ProfileHeader';
import SecuritySettings from '@/components/profile/SecuritySettings';
import TabsContainer from '@/components/profile/TabsContainer';
import { Card } from '@/components/ui/card';
import { Settings, Shield, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface ProfileFormValues {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<ProfileFormValues>({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Update form values when session loads
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phoneNumber: '',
        address: '',
      });
    }
  }, [session]);

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-24 w-24 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'personal',
      label: (
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <span>Personal Info</span>
        </div>
      ),
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Update your personal details and contact information
          </p>
          <PersonalInfoForm initialData={formData} />
        </div>
      ),
    },
    {
      id: 'preferences',
      label: (
        <div className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          <span>Preferences</span>
        </div>
      ),
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-2">Account Preferences</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Manage your account settings and communications preferences
          </p>
          <AccountPreferences />
        </div>
      ),
    },
    {
      id: 'security',
      label: (
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          <span>Security</span>
        </div>
      ),
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-2">Security Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Manage your password, active sessions, and account security options
          </p>
          <SecuritySettings />
        </div>
      ),
    },
  ];

  return (
    <div className="container max-w-6xl py-8">
      <Card className="overflow-hidden border-none shadow-md">
        {/* Profile header with avatar and banner */}
        <ProfileHeader />

        {/* Custom tabs navigation */}
        <div className="px-8 pt-4">
          <TabsContainer tabs={tabs} defaultTab="personal" />
        </div>
      </Card>
    </div>
  );
}
