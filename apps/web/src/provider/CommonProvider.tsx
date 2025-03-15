'use client';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { extractRouterConfig } from 'uploadthing/server';

export function CommonProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
