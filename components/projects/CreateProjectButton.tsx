'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import SheetWrapper from '../ui-reusable/sheet-wrapper';
import ProjectForm from './ProjectForm';
import { Client } from '@prisma/client';
import { ClientWithDetails } from '@/types/ClientType';

interface CreateProjectButtonProps {
  clients?: ClientWithDetails[]
}

const CreateProjectButton = ({ clients }: CreateProjectButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} variant='default'>
        Create new projects
      </Button>

      <SheetWrapper
      className='w-[60vh]'
        open={open}
        setOpenSheet={setOpen}
        title='Create new project'
        description='Create a new project'>
        <ProjectForm clients={clients} />
      </SheetWrapper>
    </div>
  );
};

export default CreateProjectButton;
