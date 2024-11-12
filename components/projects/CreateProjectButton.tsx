'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import SheetWrapper from '../ui-reusable/sheet-wrapper';
import ProjectForm from './ProjectForm';
import { Client } from '@prisma/client';
import { ClientWithDetails } from '@/types/ClientType';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CreateProjectButtonProps {
  clients?: ClientWithDetails[]
  currentUser?: any

}

const CreateProjectButton = ({ clients, currentUser }: CreateProjectButtonProps) => {
  const [open, setOpen] = useState(false);
  const isTrial = currentUser?.user?.subscription === 'TRIAL';
  return (
    <div>

<TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                disabled={isTrial}
                onClick={() => setOpen(true)}
                variant='default'
              >
                Create new projects
              </Button>
            </div>
          </TooltipTrigger>
          {isTrial && (
            <TooltipContent>
              <p>Upgrade your plan to add new projects</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>


      <SheetWrapper
        className='w-[60vh]'
        open={open}
        setOpenSheet={setOpen}
        title='Create new project'
        description='Create a new project'>
          <div className='max-h-[650px] overflow-y-auto p-2'>

        <ProjectForm clients={clients} />
          </div>
      </SheetWrapper>
    </div>
  );
};

export default CreateProjectButton;
