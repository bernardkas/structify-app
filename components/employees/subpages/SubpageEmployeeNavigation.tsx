'use client';

import { Button } from '@/components/ui/button';
import { EmployeeWithDetails } from '@/types/EmployeeType';
import { Client, Employee, Project } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface NavigationProps {
  employee: EmployeeWithDetails | any;
}

const SubpageEmployeeNavigation = ({ employee }: NavigationProps) => {
  const pathname = usePathname();
  const getButtonVariant = (path: string) =>
    pathname.includes(path) ? 'underline text-white' : 'text-white';

  return (
    <div>
      <Link href={`/employees/${employee.uuid}/detail`}>
        <Button variant='link' className={`${getButtonVariant('detail')}`}>
          Detail
        </Button>
      </Link>
      <Link href={`/employees/${employee.uuid}/work-hours-tracking`}>
        <Button variant='link' className={`${getButtonVariant('work-hours-tracking')}`}>
        Work Hours Tracking
        </Button>
      </Link>
    </div>
  );
};

export default SubpageEmployeeNavigation;
