'use client';
import { DataTable } from '@/components/ui-reusable/datatable/datatable';
import Title from '@/components/ui-reusable/title';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import AddHoursForm from './AddHoursForm';
import { columns } from './datatable/columns';

interface AddHourProps {
  employeeHours: any;
  employees: any;
}

const AddHour = ({ employees, employeeHours }: AddHourProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenCreateDialog = () => {
    setSelectedRow(undefined);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (row: any) => {
    setSelectedRow(row);
    setIsEditing(true);
    setOpenDialog(true);
  };
  return (
    <div className='mx-3 mt-3'>
      <div className='flex flex-row justify-between items-center'>
        <Title>Employee hours</Title>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
              onClick={handleOpenCreateDialog}
              className='bg-blue-500 p-2 rounded-md text-sm'>
              Add Employee hours
            </DialogTrigger>
            <DialogContent className='text-black'>  
              <AlertDialogHeader>
                <DialogTitle>
                  {isEditing ? 'Edit Hours' : 'Add Hours'}
                </DialogTitle>

                <div>
                  <AddHoursForm
                    setOpenDialog={setOpenDialog}
                    isEditing={isEditing}
                    employeeHours={selectedRow}
                    employee={employees}
                  />
                </div>
              </AlertDialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='border-[2px] my-3'></div>

      <div>
        {/* @ts-ignore */}
        <DataTable
          columns={columns}
          data={employeeHours}
          onRowClick={handleOpenEditDialog}
        />
      </div>
    </div>
  );
};

export default AddHour;
