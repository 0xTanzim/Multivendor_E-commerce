'use client';

import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import { useAuthRequest } from '@/hooks/useAuthRequest';
import { LoginUser } from '@repo/types';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUser>();
  const [loading, setLoading] = useState(false);

  const makeAuthRequest = useAuthRequest();

  async function onSubmit(data: any) {
    try {
      setLoading(true);

      const loginData = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      console.log('loginData', loginData);

      if (loginData?.error) {
        console.error('Login failed:', loginData.error);
      } else {
        console.log('Login successful:', loginData);
      }
    } catch (err) {
      console.error('An error occurred during login:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex items-center justify-between">
          <SubmitButton
            isLoading={loading}
            buttonTitle="Login"
            loadingButtonTitle="Logging In Please Wait..."
          />

          <Link
            href="/forgot-password"
            className="ml-4 text-sm font-light text-gray-500 dark:text-gray-400 hover:underline"
          >
            Forget Password?
          </Link>
        </div>

        <p className="text-sm font-light py-4 text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
