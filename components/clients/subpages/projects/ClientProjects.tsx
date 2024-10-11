'use client'
import { columns } from '@/components/projects/datatable/columns';
import { DataTable } from '@/components/ui-reusable/datatable/datatable'
import Title from '@/components/ui-reusable/title'
import { Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ClientProjectsProps {
  projects?: any;
}

const ClientProjects = ({projects}: ClientProjectsProps) => {
    const router = useRouter()
    const goToDetail = (row: Project) => {
        router.push(`/projects/${row.uuid}/detail`)
      };
  
    return (
    <div>
        <div>
        <Title>Projects</Title>
        </div>
        <div className='border-[2px] my-3'></div>
        <div>
            {/* @ts-ignore */}
            <DataTable data={projects} columns={columns} onRowClick={goToDetail} />
        </div>
    </div>
  )
}

export default ClientProjects