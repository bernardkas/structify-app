'use client';
import Title from '@/components/ui-reusable/title';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import BudgetCostTrackingForm from './BudgetCostTrackingForm';
import { DataTable } from '@/components/ui-reusable/datatable/datatable';
import { columns } from './datatable/columns';
import { useTranslations } from 'next-intl';

interface BugetCostTrackingProps {
  budgetAndCosts: any;
  projectId?: string
}

const BudgetCostTracking = ({ budgetAndCosts, projectId }: BugetCostTrackingProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const t = useTranslations('BudgetAndCost')

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
        <Title>{t('title')}</Title>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
              onClick={handleOpenCreateDialog}
              className='bg-blue-500 p-2 rounded-md text-sm'>
              {t('addBudgetCost')}
            </DialogTrigger>
            <DialogContent  className='text-black max-h-[650px] overflow-y-auto'>
              <AlertDialogHeader>
                <DialogTitle>
                  {isEditing ? t('editBudgetCost') : t('addBudgetCost')}
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
