"use client";
import { CommonProvider } from "@/provider/CommonProvider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="dark">
      <CommonProvider>
      {children}
      </CommonProvider>
    </NextThemesProvider>
  );
}

