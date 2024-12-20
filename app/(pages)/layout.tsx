import '@/styles/globals.css';
import Navbar from '@/components/navbar/Navbar';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';

const font = Poppins({ subsets: ['latin'], weight: ['400'] });


export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className={cn(' ', font.className)}>
     

          <Navbar currentUser={session?.user} />
          {children}
          <ToastContainer autoClose={5000} pauseOnHover={false} theme='dark' />
       
        </div>
    </SessionProvider>
  );
}
