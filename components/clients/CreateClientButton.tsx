'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import ClientForm from './ClientForm';
import SheetWrapper from '../ui-reusable/sheet-wrapper';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CreateClientButtonProps {
  currentUser?: any;
}

const CreateClientButton = ({ currentUser }: CreateClientButtonProps) => {
  const [open, setOpen] = useState(false);
  const isTrial = currentUser?.user?.subscription === 'TRIAL';
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={isTrial}
              onClick={() => setOpen(true)}
              variant='default'>
              Create new clients
            </Button>
          </TooltipTrigger>
          {isTrial && (
            <TooltipContent>
              <p>Upgrade your plan to add new clients</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <SheetWrapper
        className='w-[60vh]'
        open={open}
        setOpenSheet={setOpen}
        title='Create new client'
        description='Create a new client'>
        <ClientForm />
      </SheetWrapper>
    </div>
  );
};

export default CreateClientButton;
