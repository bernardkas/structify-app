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
      <Link href={`/projects/${project.uuid}/employees`}>
        <Button variant='link' className={`${getButtonVariant('employees')}`}>
          Employees
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/budget-cost-tracking`}>
        <Button variant='link' className={`${getButtonVariant('budget-cost-tracking')}`}>
          Budget & cost tracking
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/materials`}>
        <Button variant='link' className={`${getButtonVariant('materials')}`}>
          Materials
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/plans-blueprints`}>
        <Button variant='link' className={`${getButtonVariant('plans-blueprints')}`}>
        Plans and Blueprints
        </Button>
      </Link>
      {/* <Link href={`/projects/${project.uuid}/notes`}>
        <Button variant='link' className={`${getButtonVariant('notes')}`}>
        Notes
        </Button>
      </Link> */}
    </div>
  );
};

export default SubpageProjectNavigation;
