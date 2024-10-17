'use client';
import Title from '@/components/ui-reusable/title';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import AddFiles from './AddFiles';
import { Download } from 'lucide-react';
import { DataTable } from '@/components/ui-reusable/datatable/datatable';
import { columns } from './datatable/columns';

interface PlansBlueprintsProps {
    projectId: string
}

const PlansBlueprints = ({projectId}: PlansBlueprintsProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenCreateDialog = () => {
    setSelectedRow(undefined);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setIsEditing(true);
    setOpenDialog(true);
  };
  return (
    <div className='space-y-5'>
      <div className='flex flex-row justify-between items-center'>
        <Title>Plans & Blueprints</Title>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger
            onClick={handleOpenCreateDialog}
            className='bg-blue-500 p-2 rounded-md text-sm'>
            Add plans and blueprints
          </DialogTrigger>
          <DialogContent className='text-black max-h-[650px] overflow-y-auto'>
            <AlertDialogHeader>
              <DialogTitle>
                {'Add plans and blueprints'}
              </DialogTitle>

              <div>
                <AddFiles projectId={projectId} />
              </div>
            </AlertDialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className='border-[2px]'></div>
      <div className=''>
        <DataTable onRowClick={handleRowClick} columns={columns} data={[]} />
      </div>
    </div>
  );
};

export default PlansBlueprints;
