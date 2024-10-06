'use client';

import { Button } from '@/components/ui/button';
import { Client } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface NavigationProps {
  client: Client;
}

const Navigation = ({ client }: NavigationProps) => {
  const pathname = usePathname();
  const getButtonVariant = (path: string) =>
    pathname.includes(path) ? 'underline text-white' : 'text-white';

  return (
    <div>
      <Link href={`/clients/${client.uuid}/detail`}>
        <Button variant='link' className={`${getButtonVariant('detail')}`}>
          Detail
        </Button>
      </Link>

      <Link href={`/clients/${client.uuid}/projects`}>
        <Button variant='link' className={`${getButtonVariant('projects')}`}>
          Projects
        </Button>
      </Link>

      <Link href={`/clients/${client.uuid}/remainder`}>
        <Button variant='link' className={`${getButtonVariant('remainder')}`}>
          Remainders
        </Button>
      </Link>
    </div>
  );
};

export default Navigation;
