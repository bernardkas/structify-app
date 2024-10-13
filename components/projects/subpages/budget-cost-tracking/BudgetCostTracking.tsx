'use client';
import Title from '@/components/ui-reusable/title';
import React, { useState } from 'react';
import BudgetCostTrackingOverview from './BudgetCostTrackingOverview';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RemainderForm from '@/components/clients/subpages/remainder/RemainderForm';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import BudgetCostTrackingForm from './BudgetCostTrackingForm';
import { DataTable } from '@/components/ui-reusable/datatable/datatable';
import { columns } from './datatable/columns';

interface BugetCostTrackingProps {
  budgetAndCosts: any;
  projectId?: string
}

const BudgetCostTracking = ({ budgetAndCosts, projectId }: BugetCostTrackingProps) => {
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
  }
  return (
    <div className='space-y-5 mb-5'>
      <div className='flex flex-row justify-between items-center'>
        <Title>Budget & Cost tracking</Title>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
              onClick={handleOpenCreateDialog}
              className='bg-blue-500 p-2 rounded-md text-sm'>
              Add budget and cost
            </DialogTrigger>
            <DialogContent  className='text-black max-h-[650px] overflow-y-auto'>
              <AlertDialogHeader>
                <DialogTitle>
                  {isEditing ? 'Edit Budget and cost' : 'Add Budget and cost'}
                </DialogTitle>

                <div>
                  <BudgetCostTrackingForm setOpenDialog={setOpenDialog} isEditing={isEditing} projectId={projectId} budgetCostData={selectedRow} />
                </div>
              </AlertDialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=''>
        <DataTable onRowClick={handleRowClick} columns={columns} data={budgetAndCosts} /> 
      </div>
    </div>
  );
};

export default BudgetCostTracking;
