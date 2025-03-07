'use client';

import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import { useAuthRequest } from '@/hooks/useAuthRequest';

import { User, UserRole } from '@repo/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type props = {
  role: Exclude<UserRole, 'SUPER_ADMIN'>;
};

export default function RegisterForm({ role }: props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const [loading, setLoading] = useState(false);

  const makeAuthRequest = useAuthRequest();

  async function onSubmit(data: User) {
    const result = await makeAuthRequest({
      endpoint: '/api/users',
      data,
      reset,
      setLoading,
      resourceName: 'Register',
    });

    let redirectPath = '/login';

    if (role === 'FARMER') {
      redirectPath = `/onboarding/${result.id}`;
    }

    router.push(redirectPath);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label=""
        name="role"
        type="hidden"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
        defaultValue={role}
        readOnly={true}
      />

      <TextInput
        label="Your Full Name"
        name="name"
        type="text"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
      />

      <TextInput
        label="Email Address"
        name="email"
        type="email"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
      />

      <SubmitButton
        isLoading={loading}
        buttonTitle="Register"
        loadingButtonTitle="Creating Please Wait..."
      />
      <p className="text-sm font-light py-4 text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
