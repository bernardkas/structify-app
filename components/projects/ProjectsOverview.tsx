'use client';

import React from 'react'
import { DataTable } from '../ui-reusable/datatable/datatable';
import { columns } from './datatable/columns';
import { useRouter } from 'next/navigation';

interface ClientOverviewProps {
  projects: any
}
const ProjectsOverview = ({projects}: ClientOverviewProps) => {
  const router = useRouter()
  const handleRowClick = (project: any) => {
    router.push(`/projects/${project.uuid}/detail`)
  }
  return (
    <div>
       <DataTable onRowClick={handleRowClick} columns={columns} data={projects} />
    </div>
  )
}

export default ProjectsOverview;