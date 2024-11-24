'use client'
import { DataTable } from '@/components/ui-reusable/datatable/datatable'
import Title from '@/components/ui-reusable/title'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Material } from '@prisma/client'
import React, { useState } from 'react'
import { columns } from './datatable/columns'
import MaterialForm from './MaterialForm'
import { useTranslations } from 'next-intl'

interface MaterialsProps {
    materials: Material[]
    projectId: string
}

const Materials = ({ materials, projectId }: MaterialsProps) => {
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

    const t = useTranslations('Material'); 

  return (
    <div className='space-y-5 mb-5'>
      <div className='flex flex-row justify-between items-center'>
        <Title>{t('title')}</Title>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger
              onClick={handleOpenCreateDialog}
              className='bg-blue-500 p-2 rounded-md text-sm'>
              {t('addMaterial')}
            </DialogTrigger>
            <DialogContent  className='text-black max-h-[650px] overflow-y-auto'>
              <AlertDialogHeader>
                <DialogTitle>
                  {isEditing ? t('editMaterial') : t('addMaterial')} 
                </DialogTitle>

                <div>
                  <MaterialForm material={selectedRow} setOpenDialog={setOpenDialog} isEditing={isEditing} projectId={projectId} />
                </div>
              </AlertDialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=''>
        <DataTable onRowClick={handleRowClick} columns={columns} data={materials} /> 
      </div>
    </div>
  )
}

export default Materials