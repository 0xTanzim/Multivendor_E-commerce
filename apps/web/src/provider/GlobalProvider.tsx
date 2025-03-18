'use client';
import { CommonProvider } from '@/provider/CommonProvider';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { AppStore, makeStore } from '@repo/redux';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
import { Provider } from 'react-redux';

export function GlobalProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const storeRef = React.useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <ThemeProvider>
      <Provider store={storeRef.current}>
        <CommonProvider>{children}</CommonProvider>
      </Provider>
    </ThemeProvider>
  );
}
