'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

interface ModalWrapperProps {
  buttonText: string;
  dialogName: string;
  children: React.ReactNode;
  dialogDescription?: string;
  onClick?: () => void;
  onSubmit: (e: any) => void;
  form: any;
}

const ModalWrapper = ({
  buttonText,
  dialogName,
  children,
  dialogDescription,
  onClick,
  onSubmit,
  form,
}: ModalWrapperProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>{dialogName}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {children}
          <DialogFooter>
            <Button className='mt-5' type='submit'>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
