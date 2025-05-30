import { auth } from '@/auth';
import { loadPermissionsOnStartup } from '@/lib/permission';
import { GlobalProvider } from '@/provider/GlobalProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../style/main.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MindFuel E-commerce',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  await loadPermissionsOnStartup();

  // console.log('permissions:-', permissions);

  return (
    <html lang="en" suppressHydrationWarning>
      {/* <ReactScan /> */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProvider propsData={session}>{children}</GlobalProvider>
      </body>
    </html>
  );
}
