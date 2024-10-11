'use client'
import { DataTable } from '@/components/ui-reusable/datatable/datatable';
import Title from '@/components/ui-reusable/title';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { columns } from './datatable/columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import RemainderForm from './RemainderForm';
import { RemainderWithDetials } from '@/types/RemainderType';

interface RemainderProps {
  remainders?: any;
  clientId?: string
}

const Remainder = ({ remainders, clientId }: RemainderProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RemainderWithDetials | undefined>();
  const [isEditing, setIsEditing] = useState(false)

  const handleOpenCreateDialog = () => {
    setSelectedRow(undefined);
    setIsEditing(false);
    setOpenDialog(true); 
  };

  const handleOpenEditDialog = (row: RemainderWithDetials) => {
    setSelectedRow(row);     
    setIsEditing(true); 
    setOpenDialog(true); 
  };

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <Title>Remainders</Title>
        <div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger onClick={handleOpenCreateDialog} className="bg-blue-500 p-2 rounded-md text-sm">
              Add Remainder
            </DialogTrigger>
            <DialogContent className="text-black">
              <AlertDialogHeader>
                <DialogTitle>{isEditing ? 'Edit Remainder' : 'Add Remainder'}</DialogTitle>
                
                  <div>
                  <RemainderForm setOpenDialog={setOpenDialog} isEditing={isEditing} remainder={selectedRow} clientId={clientId} />
                  </div>
              </AlertDialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='border-[2px] my-3'></div>

      <div>
        {/* @ts-ignore */}
        <DataTable columns={columns} data={remainders} onRowClick={handleOpenEditDialog} />
      </div>
    </div>
  );
};

export default Remainder;