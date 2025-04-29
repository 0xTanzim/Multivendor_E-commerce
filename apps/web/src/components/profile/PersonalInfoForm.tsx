'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ProfileFormValues {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

interface PersonalInfoFormProps {
  initialData: ProfileFormValues;
}

const PersonalInfoForm = ({ initialData }: PersonalInfoFormProps) => {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormValues>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Basic validation using type checking
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Call your API to update user profile here
      // Example:
      // const response = await fetch('/api/user/profile', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // For now, just use the session update
      await update({
        user: {
          name: formData.name,
        },
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="h-11"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            type="email"
            disabled
            className="h-11 bg-gray-50 dark:bg-gray-800"
          />
          <p className="text-xs text-gray-500">
            Email addresses cannot be changed.
          </p>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Your phone number"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your address"
            className="h-11"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-6 h-auto text-base font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Changes...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
