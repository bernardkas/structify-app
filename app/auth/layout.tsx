import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css'
import { auth } from '@/auth';
const font = Poppins({ subsets: ['latin'], weight: ['400'] });
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={font.className}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
