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
import { columns } from './datatable/columns';
import AddProjectHoursForm from './AddProjectHoursForm';

interface AddProjectHoursProps {
  projectHours: any;
  projects: any;
}

const AddProjectHours = ({ projects, projectHours }: AddProjectHoursProps) => {
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
        <Title>Project hours</Title>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
              onClick={handleOpenCreateDialog}
              className='bg-blue-500 p-2 rounded-md text-sm'>
              Add Project hours
            </DialogTrigger>
            <DialogContent className='text-black'>  
              <AlertDialogHeader>
                <DialogTitle>
                  {isEditing ? 'Edit project hours' : 'Add project hours'} 
                </DialogTitle>

                <div>
                  <AddProjectHoursForm
                    setOpenDialog={setOpenDialog}
                    isEditing={isEditing}
                    projectHours={selectedRow}
                    projects={projects}
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
          data={projectHours}
          onRowClick={handleOpenEditDialog}
        />
      </div>
    </div>
  );
};

export default AddProjectHours;
