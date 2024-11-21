import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/navbar/Navbar';
import { auth } from '@/auth';
const font = Poppins({ subsets: ['latin'], weight: ['400'] });
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: 'Structify',
  description: 'Structify by waxo',
  };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en'>
      <NextIntlClientProvider  messages={messages}>

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
        <body>{children}</body>
      </NextIntlClientProvider>
      </html>
    </SessionProvider>
  );
}
