'use client';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { AppStore, makeStore } from '@repo/redux';
import * as React from 'react';
import { Provider } from 'react-redux';

import { SessionProvider } from 'next-auth/react';
export function GlobalProvider({
  children,
  propsData,
  ...props
}: React.PropsWithChildren<{
  propsData?: any;
}>) {
  const storeRef = React.useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <ThemeProvider>
      <SessionProvider session={propsData}>
        <Provider store={storeRef.current}>{children} </Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}
