'use client';

import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextInput from '@/components/FormInputs/TextInput';
import { useAuthRequest } from '@/hooks/useAuthRequest';
import { LoginUser } from '@repo/types';
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
    console.log(data);
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

        <SubmitButton
          isLoading={loading}
          buttonTitle="Login"
          loadingButtonTitle="Logging In Please Wait..."
        />
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
