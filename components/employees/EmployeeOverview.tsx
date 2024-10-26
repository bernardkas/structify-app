'use client'
import React, { useState } from 'react'
import Title from '../ui-reusable/title';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';
import EmployeeForm from './EmployeeForm';
import { DataTable } from '../ui-reusable/datatable/datatable';
import { columns } from './datatable/columns';
import { useRouter } from 'next/navigation';

interface EmployeeOverviewProps {
    employees: any;
}

const EmployeeOverview = ({ employees }: EmployeeOverviewProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any | undefined>();
    const [isEditing, setIsEditing] = useState(false);
  
    const handleOpenCreateDialog = () => {
      setSelectedRow(undefined);
      setIsEditing(false);
      setOpenDialog(true);
    };
    const router = useRouter()
    const handleRowClick = (row: any) => {
      router.push(`/employees/${row.uuid}/detail`)
    }
  
  return (
    <div className='space-y-5 my-5'>
      <div className='flex flex-row justify-between items-center'>
        <Title>Employees</Title>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
              onClick={handleOpenCreateDialog}
              className='bg-blue-500 p-2 rounded-md text-sm'>
              Add Employee
            </DialogTrigger>
            <DialogContent  className='text-black max-h-[650px] overflow-y-auto'>
              <AlertDialogHeader>
                <DialogTitle>
                    Add Employee
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