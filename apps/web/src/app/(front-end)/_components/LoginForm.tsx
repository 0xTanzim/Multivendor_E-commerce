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

        <SubmitButton
          isLoading={loading}
          buttonTitle="Login"
          loadingButtonTitle="Logging In Please Wait..."
        />

        {/* <div className="flex items-center">
          <div className="w-full bg-slate-500 h-[1px]"></div>
          <span className="mx-2">or</span>
          <div className="w-full bg-slate-500 h-[1px]"></div>
          </div>

        <div className="">
          <button
            type="button"
            className="w-full text-slate-950 bg-white hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center flex items-center dark:focus:ring-slate-100 me-2 mb-4 border border-slate-200"
            onClick={() => signIn('google')}
          >
            <FaGoogle className="mr-2 text-red-600 w-4 h-4" />
            Sign in with Google
          </button>
          <button
            onClick={() => signIn('github')}
            type="button"
            className="w-full justify-center text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
      
            <FaGithub className="mr-2 w-4 h-4" />
            Sign in with Github
          </button>
        </div> */}

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
