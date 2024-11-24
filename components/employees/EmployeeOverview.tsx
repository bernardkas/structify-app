'use client'
import React, { useState } from 'react'
import Title from '../ui-reusable/title';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';
import EmployeeForm from './EmployeeForm';
import { DataTable } from '../ui-reusable/datatable/datatable';
import { columns } from './datatable/columns';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTranslations } from "next-intl"

interface EmployeeOverviewProps {
    employees: any;
    currentUser?: any
}

const EmployeeOverview = ({ employees, currentUser }: EmployeeOverviewProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const isTrial = currentUser?.user?.subscription === 'TRIAL';
  
    const handleOpenCreateDialog = () => {
      setSelectedRow(undefined);
      setIsEditing(false);
      setOpenDialog(true);
    };
    const router = useRouter()
    const handleRowClick = (row: any) => {
      router.push(`/employees/${row.uuid}/detail`)
    }

    const t = useTranslations('Employee');
  
  return (
    <div className='space-y-5 my-5'>
      <div className='flex flex-row justify-between items-center'>
        <Title>{t('title')}</Title>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger
                    onClick={handleOpenCreateDialog}
                    className={`p-2 rounded-md text-sm ${
                      isTrial 
                        ? 'bg-blue-700 cursor-not-allowed'  
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={isTrial} 
                  >
                    {t('addEmployee')}
                  </DialogTrigger>
                </TooltipTrigger>
                {isTrial && (
                  <TooltipContent>
                   {t('upgradePlan')}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            <DialogContent  className='text-black max-h-[650px] overflow-y-auto'>
              <AlertDialogHeader>
                <DialogTitle>
                    {t('addEmployee')}
                </DialogTitle>

                <div>
                  <EmployeeForm setOpenDialog={setOpenDialog} isEditing={isEditing}  employee={selectedRow} />
                </div>
              </AlertDialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=''>
        <DataTable onRowClick={handleRowClick} columns={columns} data={employees} /> 
      </div>
    </div>
  )
}

export default EmployeeOverview