import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/navbar/Navbar';
import { auth } from '@/auth';
const font = Poppins({ subsets: ['latin'], weight: ['400'] });
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAnalytics } from '@next/third-parties/google';


export const metadata: Metadata = {
  title: 'Structify',
  description: 'Structify by waxo',
  icons: '../assets/favicon.ico',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
        <body >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
