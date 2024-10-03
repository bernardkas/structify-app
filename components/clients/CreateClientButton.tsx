'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import ClientForm from './ClientForm';
import SheetWrapper from '../ui-reusable/sheet-wrapper';

const CreateClientButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} variant='default'>
        Create new clients
      </Button>

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
