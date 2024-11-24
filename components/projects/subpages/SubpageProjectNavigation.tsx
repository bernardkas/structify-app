'use client';

import { Button } from '@/components/ui/button';
import { Client, Project } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useTranslations } from "next-intl"

interface NavigationProps {
  project: Project;
}

const SubpageProjectNavigation = ({ project }: NavigationProps) => {
  const pathname = usePathname();
  const getButtonVariant = (path: string) =>
    pathname.includes(path) ? 'underline text-white' : 'text-white';


  const t = useTranslations('Project.SubpageNav');

  return (
    <div>
      <Link href={`/projects/${project.uuid}/detail`}>
        <Button variant='link' className={`${getButtonVariant('detail')}`}>
          {t('detail')}
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/employees`}>
        <Button variant='link' className={`${getButtonVariant('employees')}`}>
          {t('employee')}
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/budget-cost-tracking`}>
        <Button variant='link' className={`${getButtonVariant('budget-cost-tracking')}`}>
          {t('budgetAndCost')}
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/materials`}>
        <Button variant='link' className={`${getButtonVariant('materials')}`}>
          {t('materials')}
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/project-hours-tracking`}>
        <Button variant='link' className={`${getButtonVariant('project-hours-tracking')}`}>
          {t('projectHours')}
        </Button>
      </Link>
      <Link href={`/projects/${project.uuid}/plans-blueprints`}>
        <Button variant='link' className={`${getButtonVariant('plans-blueprints')}`}>
          {t('plansBlueprints')}
        </Button>
      </Link>
    </div>
  );
};

export default SubpageProjectNavigation;
