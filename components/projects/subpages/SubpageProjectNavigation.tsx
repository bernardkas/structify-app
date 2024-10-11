'use client';

import { Button } from '@/components/ui/button';
import { Client, Project } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface NavigationProps {
  project: Project;
}

const SubpageProjectNavigation = ({ project }: NavigationProps) => {
  const pathname = usePathname();
  const getButtonVariant = (path: string) =>
    pathname.includes(path) ? 'underline text-white' : 'text-white';

  return (
    <div>
      <Link href={`/projects/${project.uuid}/detail`}>
        <Button variant='link' className={`${getButtonVariant('detail')}`}>
          Detail
        </Button>
      </Link>
    </div>
  );
};

export default SubpageProjectNavigation;
