'use client';

import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import { useAuthRequest } from '@/hooks/useAuthRequest';

import { IAuthUser, UserRole } from '@repo/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type props = {
  role: Exclude<UserRole, 'SUPER_ADMIN'>;
};

export default function RegisterForm({ role }: props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthUser>();
  const [loading, setLoading] = useState(false);

  const makeAuthRequest = useAuthRequest();

  async function onSubmit(data: IAuthUser) {
    setLoading(true);
    // Log the data to be sent
    console.log('Registering user', data);
    setLoading(false);

    if (plan) {
      data.plan = plan;
    }

    const result = await makeAuthRequest({
      endpoint: '/api/register',
      data,
      reset,
      setLoading,
      resourceName: 'Register',
    });

    console.log('Registration result', result);

    let redirectPath = '/login';

    if (role !== 'USER') {
      if (!result?.authUser) {
        console.error('No authUser found in the result');
        return;
      }

      redirectPath = `/verify-email?userId=${result?.authUser?.id}`;
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
      <div className="flex  flex-col items-center  mt-2">
        <p className="text-sm font-light py-2 text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Login
          </Link>
        </p>

        {role === 'USER' ? (
          <p className="text-sm font-light py-2 text-gray-500 dark:text-gray-400">
            Are you a Farmer?{' '}
            <Link
              href="/farmer-pricing"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Register as a Farmer
            </Link>
          </p>
        ) : (
          <p className="text-sm font-light py-2 text-gray-500 dark:text-gray-400">
            Are you a User?{' '}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Register as a User
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
