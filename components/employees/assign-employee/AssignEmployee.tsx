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
import AssignEmployeeForm from './AssignEmployeeForm';
import { AssignEmployeeWithDetails } from '@/types/AssignEmployeeType';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AssignEmployeesOverviewProps {
  employees: any;
  projects: any
  assignEmployees: AssignEmployeeWithDetails[]
  currentUser?: any
}

const AssignEmployeesOverview = ({ employees, projects, assignEmployees, currentUser }: AssignEmployeesOverviewProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const isTrial = currentUser?.subscription === 'TRIAL';

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
        <Title>Assign Employee to Project</Title>
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
                    Assign Employee
                  </DialogTrigger>
                </TooltipTrigger>
                {isTrial && (
                  <TooltipContent>
                    Upgrade your plan to assign employee.
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <DialogContent className='text-black'>  
              <AlertDialogHeader>
                <DialogTitle>
                  {isEditing ? 'Edit assign employee' : 'Assign employee'}
                </DialogTitle>

                <div>
                  <AssignEmployeeForm
                    setOpenDialog={setOpenDialog}
                    isEditing={isEditing}
                    employee={employees}
                    projects={projects}
                    assignEmployee={selectedRow}
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
          data={assignEmployees}
          onRowClick={handleOpenEditDialog}
        />
      </div>
    </div>
  );
};

export default AssignEmployeesOverview;
